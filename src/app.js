import { SSEManager } from './sse';
import { UIManager } from './ui';

let sseManager = null;
let uiManager = null;

export function initApp() {
  // 确保 DOM 已加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeApp();
    });
  } else {
    initializeApp();
  }
}

function initializeApp() {
  // 初始化UI管理器
  uiManager = new UIManager();

  // 初始化SSE管理器
  sseManager = new SSEManager({
    onOpen: () => {
      uiManager.updateStatus(true);
      console.log('SSE连接已打开');
    },
    onMessage: (data) => {
      uiManager.addMessage(data, 'message');
    },
    onNotification: (data) => {
      uiManager.addMessage(data, 'notification');
    },
    onMilestone: (data) => {
      uiManager.addMessage(data, 'milestone');
    },
    onError: (error) => {
      console.error('SSE连接错误:', error);
      uiManager.updateStatus(false);
    },
    onClose: () => {
      uiManager.updateStatus(false);
    },
  });

  // 绑定按钮事件
  const connectBtn = document.getElementById('connectBtn');
  const disconnectBtn = document.getElementById('disconnectBtn');
  const clearBtn = document.getElementById('clearBtn');

  if (!connectBtn || !disconnectBtn || !clearBtn) {
    console.error('按钮元素未找到，请检查 HTML 结构');
    return;
  }

  connectBtn.addEventListener('click', () => {
    console.log('连接按钮被点击');
    sseManager.connect();
  });

  disconnectBtn.addEventListener('click', () => {
    console.log('断开按钮被点击');
    sseManager.disconnect();
  });

  clearBtn.addEventListener('click', () => {
    console.log('清空按钮被点击');
    uiManager.clearMessages();
  });

  // 页面卸载时关闭连接
  window.addEventListener('beforeunload', () => {
    if (sseManager) {
      sseManager.disconnect();
    }
  });

  console.log('应用初始化完成，按钮事件已绑定');
}

