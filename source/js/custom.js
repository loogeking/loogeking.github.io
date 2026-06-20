/* ========================================================================
 * Loogeking's Blog - 自定义脚本
 * 功能：背景图同步 + 视频背景 + Banner 滚动过渡 + 卡片懒加载入场
 * ======================================================================== */

(function () {
    'use strict';
  
    /* ============ 配置区 ============ */
    const CONFIG = {
      bodyBackground: '/img/background.jpg',
      homeVideo: '/videos/banner.mp4',
      homePoster: '/img/background.jpg',
      enableVideo: true,
      mobileBreakpoint: 768,
  
      // 懒加载入场目标选择器（文章正文不参与，避免 opacity:0 导致看不见）
      revealSelectors: [
        '#recent-posts .recent-post-item',
        '#aside-content .card-widget',
        '#archive .article-sort-item:not(.year)',
        '.relatedPosts',
        '#pagination',
        '.tag-cloud-list',
        '.category-lists',
        '.flink-list-item',
        '#page #article-container'
      ]
    };
  
    /* ============ 1. 全局背景图 ============ */
    function setBodyBackground() {
      if (CONFIG.bodyBackground) {
        document.documentElement.style.setProperty(
          '--lk-body-bg',
          `url(${CONFIG.bodyBackground})`
        );
      }
    }
  
    /* ============ 2. 判断首页 ============ */
    function isHomePage() {
      const p = location.pathname;
      return p === '/' || p === '/index.html' || /^\/page\/\d+\/?$/.test(p);
    }
  
    /* ============ 3. 读取页面级视频配置 ============ */
    function getPageVideoConfig() {
      const v = document.querySelector('meta[name="lk-top-video"]');
      const p = document.querySelector('meta[name="lk-top-poster"]');
      if (v && v.content) {
        return { video: v.content, poster: p ? p.content : '' };
      }
      return null;
    }
  
    /* ============ 4. 注入视频 Banner ============ */
    function injectVideoBanner() {
      if (!CONFIG.enableVideo) return;
      if (window.innerWidth < CONFIG.mobileBreakpoint) {
        console.log('[Custom] 移动端跳过视频');
        return;
      }
  
      const header = document.getElementById('page-header');
      if (!header) return;
  
      // 清理旧的
      const old = header.querySelector('.lk-video-banner');
      if (old) {
        if (old._lkObserver) old._lkObserver.disconnect();
        old.remove();
      }
  
      let cfg = getPageVideoConfig();
      if (!cfg && isHomePage()) {
        cfg = { video: CONFIG.homeVideo, poster: CONFIG.homePoster };
      }
      if (!cfg || !cfg.video) {
        console.log('[Custom] 当前页面无视频配置');
        return;
      }
  
      console.log('[Custom] 注入视频:', cfg.video);
      createVideoBanner(header, cfg);
    }
  
    function createVideoBanner(header, cfg) {
      const banner = document.createElement('div');
      banner.className = 'lk-video-banner';
  
      const poster = document.createElement('div');
      poster.className = 'lk-video-poster';
      if (cfg.poster) poster.style.backgroundImage = `url(${cfg.poster})`;
  
      const video = document.createElement('video');
      video.src = cfg.video;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
  
      video.addEventListener('loadeddata', () => {
        console.log('[Custom] ✓ 视频加载成功');
        video.play().catch(err => console.warn('[Custom] 自动播放失败:', err));
      });
  
      video.addEventListener('error', () => {
        console.error('[Custom] ✗ 视频加载失败:', cfg.video);
        banner.classList.add('is-paused');
      });
  
      banner.appendChild(poster);
      banner.appendChild(video);
      header.insertBefore(banner, header.firstChild);
  
      observeBannerVisibility(banner, video);
    }
  
    function observeBannerVisibility(banner, video) {
      if (!('IntersectionObserver' in window)) return;
      const ob = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting && e.intersectionRatio > 0.2) {
              banner.classList.remove('is-paused');
              video.play().catch(() => {});
            } else {
              banner.classList.add('is-paused');
              video.pause();
            }
          });
        },
        { threshold: [0, 0.2, 0.5, 1] }
      );
      ob.observe(banner);
      banner._lkObserver = ob;
    }
  
    /* ============ 5. Banner 滚动过渡效果 ============ */
    let scrollRafId = null;
    function handleBannerScroll() {
      const header = document.getElementById('page-header');
      if (!header) return;
  
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const headerHeight = header.offsetHeight;
  
      // 滚过 30% 时给 Banner 加效果
      if (scrollTop > headerHeight * 0.3) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
  
    function onScroll() {
      if (scrollRafId) return;
      scrollRafId = requestAnimationFrame(() => {
        handleBannerScroll();
        scrollRafId = null;
      });
    }
  
    /* ============ 6. 卡片滚动懒加载入场 ============ */
    let revealObserver = null;
  
    function setupRevealAnimation() {
      // 断开旧的 observer（PJAX 切换时）
      if (revealObserver) {
        revealObserver.disconnect();
      }
  
      if (!('IntersectionObserver' in window)) {
        // 不支持 IO 的浏览器：直接全部显示
        document.querySelectorAll('.lk-reveal').forEach(el => {
          el.classList.add('lk-visible');
        });
        return;
      }
  
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
              // 加一点错峰延迟，让多个同时进入的元素依次出现
              const el = entry.target;
              const delay = Math.min(idx * 80, 400);
              setTimeout(() => {
                el.classList.add('lk-visible');
              }, delay);
              revealObserver.unobserve(el); // 触发后就不再观察，避免重复
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -10% 0px', // 进入视口 10% 时触发
          threshold: 0.1
        }
      );
  
      // 给目标元素加上初始类并开始观察
      const selector = CONFIG.revealSelectors.join(', ');
      document.querySelectorAll(selector).forEach(el => {
        if (el.dataset.lkRevealReady) return;
        el.dataset.lkRevealReady = '1';
        el.classList.add('lk-reveal');

        // 已在视口内的元素立即显示，避免内容空白
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          el.classList.add('lk-visible');
          return;
        }

        revealObserver.observe(el);
      });
    }

    /* ============ 9. 文章封面视频支持 ============ */
    function enableCoverVideos() {
      document.querySelectorAll('[data-cover-video]').forEach(el => {
        if (el.dataset.lkProcessed) return;
        el.dataset.lkProcessed = '1';
  
        const v = el.dataset.coverVideo;
        const p = el.dataset.coverPoster || el.src;
        if (!v) return;
  
        const wrap = document.createElement('div');
        wrap.className = 'lk-video-banner';
        wrap.style.cssText = 'position:relative;width:100%;height:100%;';
  
        const poster = document.createElement('div');
        poster.className = 'lk-video-poster';
        poster.style.backgroundImage = `url(${p})`;
  
        const video = document.createElement('video');
        video.src = v;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
  
        wrap.appendChild(poster);
        wrap.appendChild(video);
        el.parentNode.replaceChild(wrap, el);
        observeBannerVisibility(wrap, video);
      });
    }
  
    /* ============ 10. 初始化 ============ */
    function init() {
      console.log('[Custom] custom.js loaded ✓');
      setBodyBackground();
      injectVideoBanner();
      enableCoverVideos();
      setupRevealAnimation();
      handleBannerScroll();
  
      // 绑定滚动事件（用 passive 提升性能）
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  
    function reinit() {
      console.log('[Custom] PJAX reloaded');
      setBodyBackground();
      injectVideoBanner();
      enableCoverVideos();
      setupRevealAnimation();
      handleBannerScroll();
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  
    document.addEventListener('pjax:complete', reinit);
  })();