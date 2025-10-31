export class UIManager {
  constructor() {
    this.messageCount = 0;
    this.notificationCount = 0;
    this.milestoneCount = 0;

    this.statusIndicator = document.getElementById('statusIndicator');
    this.statusText = document.getElementById('statusText');
    this.messagesContainer = document.getElementById('messagesContainer');
    this.messageCountEl = document.getElementById('messageCount');
    this.notificationCountEl = document.getElementById('notificationCount');
    this.milestoneCountEl = document.getElementById('milestoneCount');
    this.connectBtn = document.getElementById('connectBtn');
    this.disconnectBtn = document.getElementById('disconnectBtn');
  }

  updateStatus(connected) {
    if (connected) {
      this.statusIndicator.classList.add('connected');
      this.statusText.textContent = '已连接';
      this.connectBtn.disabled = true;
      this.disconnectBtn.disabled = false;
    } else {
      this.statusIndicator.classList.remove('connected');
      this.statusText.textContent = '未连接';
      this.connectBtn.disabled = false;
      this.disconnectBtn.disabled = false;
    }
  }

  addMessage(data, eventType = 'message') {
    // 移除空状态
    const emptyState = this.messagesContainer.querySelector('.empty-state');
    if (emptyState) {
      emptyState.remove();
    }

    this.messageCount++;
    if (eventType === 'notification') {
      this.notificationCount++;
    } else if (eventType === 'milestone') {
      this.milestoneCount++;
    }

    this.updateStats();

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${eventType}`;

    const messageTypeLabel =
      eventType === 'message'
        ? '消息'
        : eventType === 'notification'
        ? '通知'
        : eventType === 'milestone'
        ? '里程碑'
        : eventType;

    messageDiv.innerHTML = `
      <div class="message-header">
        <span class="message-type">${messageTypeLabel}</span>
        <span class="message-time">${new Date(data.timestamp).toLocaleTimeString()}</span>
      </div>
      <div class="message-content">${data.message || '收到消息'}</div>
      <div class="message-data">${JSON.stringify(data, null, 2)}</div>
    `;

    this.messagesContainer.insertBefore(messageDiv, this.messagesContainer.firstChild);
  }

  updateStats() {
    this.messageCountEl.textContent = this.messageCount;
    this.notificationCountEl.textContent = this.notificationCount;
    this.milestoneCountEl.textContent = this.milestoneCount;
  }

  clearMessages() {
    this.messagesContainer.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <p>点击"连接"按钮开始接收服务器推送的消息</p>
      </div>
    `;
    this.messageCount = 0;
    this.notificationCount = 0;
    this.milestoneCount = 0;
    this.updateStats();
  }
}

