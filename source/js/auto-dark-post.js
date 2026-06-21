/* 进入文章详情页自动切换暗模式，离开恢复用户偏好 */
(function () {
    'use strict';
  
    const POST_PATH_REGEX = /\/posts?\//i; // 根据你的永久链接调整
  
    function isPostPage() {
      // 方式 1：通过 body 上的 #post 容器判断
      if (document.getElementById('post')) return true;
      // 方式 2：通过 URL
      return POST_PATH_REGEX.test(location.pathname);
    }
  
    function applyDarkForPost() {
      if (!isPostPage()) return;
  
      // 保存用户原始偏好（只保存一次）
      if (!sessionStorage.getItem('lk-user-theme-saved')) {
        const userTheme = localStorage.getItem('theme') || 'light';
        sessionStorage.setItem('lk-user-theme', userTheme);
        sessionStorage.setItem('lk-user-theme-saved', '1');
      }
  
      // 强制暗模式
      const current = document.documentElement.getAttribute('data-theme');
      if (current !== 'dark') {
        if (typeof window.switchNightMode === 'function') {
          window.switchNightMode();
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
        }
      }
    }
  
    function restoreUserTheme() {
      if (isPostPage()) return; // 仍在文章页则不恢复
      const saved = sessionStorage.getItem('lk-user-theme');
      if (saved) {
        const current = document.documentElement.getAttribute('data-theme');
        if (current !== saved) {
          if (typeof window.switchNightMode === 'function' && current !== saved) {
            window.switchNightMode();
          } else {
            document.documentElement.setAttribute('data-theme', saved);
            localStorage.setItem('theme', saved);
          }
        }
        sessionStorage.removeItem('lk-user-theme');
        sessionStorage.removeItem('lk-user-theme-saved');
      }
    }
  
    // 首次进入
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyDarkForPost);
    } else {
      applyDarkForPost();
    }
  
    // PJAX 兼容
    document.addEventListener('pjax:complete', function () {
      if (isPostPage()) {
        applyDarkForPost();
      } else {
        restoreUserTheme();
      }
    });
  
    // 离开文章页前恢复
    window.addEventListener('beforeunload', function () {
      if (!isPostPage()) restoreUserTheme();
    });
  })();