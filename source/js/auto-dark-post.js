/* ============================================================
 * 进入文章详情页自动切换暗模式，离开恢复用户偏好
 * 修复：
 *  - 移除无效的 beforeunload（PJAX 不触发）
 *  - 简化状态管理，用 sessionStorage 单一 key
 *  - 使用 Butterfly 的主题 API，避免破坏主题存储格式
 * ============================================================ */
(function () {
  'use strict';

  const POST_PATH_REGEX = /^\/posts\//i;
  const STORE_KEY = 'lk-user-theme-before-post';

  function isPostPage() {
    if (document.getElementById('post')) return true;
    return POST_PATH_REGEX.test(location.pathname);
  }

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function isTheme(value) {
    return value === 'dark' || value === 'light';
  }

  function readStoredTheme() {
    const storage = window.btf && window.btf.saveToLocal;
    const rawValue = localStorage.getItem('theme');

    // 兼容旧版本直接写入的裸主题值。
    if (isTheme(rawValue)) return rawValue;

    if (storage && typeof storage.get === 'function') {
      try {
        const value = storage.get('theme');
        if (isTheme(value)) return value;
      } catch (error) {
        // 清理旧版本写入的裸字符串，避免 Butterfly 后续 JSON.parse 失败。
        localStorage.removeItem('theme');
      }
    }

    return null;
  }

  function applyTheme(theme) {
    if (!isTheme(theme) || getCurrentTheme() === theme) return;

    if (theme === 'dark' && typeof window.btf?.activateDarkMode === 'function') {
      window.btf.activateDarkMode();
    } else if (theme === 'light' && typeof window.btf?.activateLightMode === 'function') {
      window.btf.activateLightMode();
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  function persistTheme(theme) {
    const storage = window.btf && window.btf.saveToLocal;
    if (storage && typeof storage.set === 'function') {
      storage.set('theme', theme, 2);
    }
  }

  function migrateStoredTheme() {
    const rawValue = localStorage.getItem('theme');
    if (isTheme(rawValue)) {
      persistTheme(rawValue);
      return;
    }

    const storage = window.btf && window.btf.saveToLocal;
    if (rawValue && storage && typeof storage.get === 'function') {
      try {
        storage.get('theme');
      } catch (error) {
        localStorage.removeItem('theme');
      }
    }
  }

  function enterPostPage() {
    // 只在第一次进入文章页时保存用户偏好
    if (!sessionStorage.getItem(STORE_KEY)) {
      const storedTheme = readStoredTheme();
      const userTheme = storedTheme || getCurrentTheme();
      sessionStorage.setItem(STORE_KEY, JSON.stringify({
        theme: isTheme(userTheme) ? userTheme : 'light',
        hadStoredTheme: Boolean(storedTheme)
      }));
    }
    applyTheme('dark');
  }

  function leavePostPage() {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (!raw) return;

    let saved = { theme: raw, hadStoredTheme: false };
    try {
      saved = JSON.parse(raw);
    } catch (error) {
      // 兼容旧版本存入的纯主题字符串。
    }

    if (isTheme(saved.theme)) applyTheme(saved.theme);
    if (saved.hadStoredTheme && isTheme(saved.theme)) persistTheme(saved.theme);
    sessionStorage.removeItem(STORE_KEY);
  }

  function handle() {
    if (isPostPage()) {
      enterPostPage();
    } else {
      leavePostPage();
    }
  }

  migrateStoredTheme();

  // 首次加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handle);
  } else {
    handle();
  }

  // PJAX 兼容
  document.addEventListener('pjax:complete', handle);
})();
