export class SSEManager {
  constructor(callbacks = {}) {
    this.eventSource = null;
    this.callbacks = {
      onOpen: callbacks.onOpen || (() => {}),
      onMessage: callbacks.onMessage || (() => {}),
      onNotification: callbacks.onNotification || (() => {}),
      onMilestone: callbacks.onMilestone || (() => {}),
      onError: callbacks.onError || (() => {}),
      onClose: callbacks.onClose || (() => {}),
    };
  }

  connect() {
    if (this.eventSource) {
      this.disconnect();
    }

    // 获取事件URL（支持开发和生产环境）
    const eventUrl = '/events';
    this.eventSource = new EventSource(eventUrl);

    this.eventSource.onopen = () => {
      this.callbacks.onOpen();
    };

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.callbacks.onMessage(data);
      } catch (e) {
        console.error('解析消息失败:', e);
      }
    };

    // 监听自定义事件类型
    this.eventSource.addEventListener('notification', (event) => {
      try {
        const data = JSON.parse(event.data);
        this.callbacks.onNotification(data);
      } catch (e) {
        console.error('解析通知失败:', e);
      }
    });

    this.eventSource.addEventListener('milestone', (event) => {
      try {
        const data = JSON.parse(event.data);
        this.callbacks.onMilestone(data);
      } catch (e) {
        console.error('解析里程碑失败:', e);
      }
    });

    this.eventSource.onerror = (error) => {
      this.callbacks.onError(error);
      if (this.eventSource && this.eventSource.readyState === EventSource.CLOSED) {
        this.callbacks.onClose();
      }
    };
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.callbacks.onClose();
    }
  }

  isConnected() {
    return this.eventSource && this.eventSource.readyState === EventSource.OPEN;
  }
}

