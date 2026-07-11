/* ============================================================
 * 进入文章详情页自动切换暗模式，离开恢复用户偏好
 * 修复：
 *  - 移除无效的 beforeunload（PJAX 不触发）
 *  - 简化状态管理，用 sessionStorage 单一 key
 *  - 避免因 switchNightMode 循环触发导致主题错乱
 * ============================================================ */
(function () {
  'use strict';

  const POST_PATH_REGEX = /\/posts?\//i;
  const STORE_KEY = 'lk-user-theme-before-post';

  function isPostPage() {
    if (document.getElementById('post')) return true;
    return POST_PATH_REGEX.test(location.pathname);
  }

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function setTheme(theme) {
    const current = getCurrentTheme();
    if (current === theme) return;

    // 优先用主题自带的切换函数（可以保证 Butterfly 其它组件同步）
    if (typeof window.switchNightMode === 'function') {
      window.switchNightMode();
      // switchNightMode 是 toggle，如果切完还不对，兜底强制设置
      if (getCurrentTheme() !== theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }

  function enterPostPage() {
    // 只在第一次进入文章页时保存用户偏好
    if (!sessionStorage.getItem(STORE_KEY)) {
      const userTheme = localStorage.getItem('theme') || getCurrentTheme() || 'light';
      sessionStorage.setItem(STORE_KEY, userTheme);
    }
    setTheme('dark');
  }

  function leavePostPage() {
    const saved = sessionStorage.getItem(STORE_KEY);
    if (!saved) return;

    setTheme(saved);
    sessionStorage.removeItem(STORE_KEY);
  }

  function handle() {
    if (isPostPage()) {
      enterPostPage();
    } else {
      leavePostPage();
    }
  }

  // 首次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handle);
  } else {
    handle();
  }

  // PJAX 兼容
  document.addEventListener('pjax:complete', handle);
})();