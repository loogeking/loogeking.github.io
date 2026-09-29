/* ========================================================================
 * Loogeking's Blog - 自定义脚本
 * 功能：背景图同步 + 视频背景 + Banner 滚动过渡 + 卡片懒加载入场 + 移动端TOC
 * ======================================================================== */

(function () {
  'use strict';

  /* ============ 配置区 ============ */
  const CONFIG = {
    /* 改：4套背景图，按明暗+设备 */
    backgrounds: {
      light: {
        desktop: 'https://img.loogeking.top/images/index/bg-light.png',
        mobile: 'https://img.loogeking.top/images/index/bg-light-mobile.png'
      },
      dark: {
        desktop: 'https://img.loogeking.top/images/index/bg-dark.png',
        mobile: 'https://img.loogeking.top/images/index/bg-dark-mobile.png'
      }
    },

    homeVideo: '/img/index.mp4',
    homePoster: 'https://img.loogeking.top/images/index/index-poster.png',
    mobileHomeVideo: '/img/index_phone.mp4',

    enableVideo: true,
    mobileBreakpoint: 768,

    /* 新增：视频加载策略 */
    bannerVideoPreload: 'none',
    bannerLoadDelay: 300,
    disableVideoOnSaveData: true,
    disableVideoOnReducedMotion: true,

    revealSelectors: [
      '#recent-posts .recent-post-item',
      '#aside-content .card-widget',
      '#archive .article-sort-item:not(.year)',
      '#tag .article-sort-item:not(.year)',
      '#category .article-sort-item:not(.year)',
      '.relatedPosts',
      '#pagination',
      '.tag-cloud-list',
      '.category-lists',
      '.flink-list-item'
    ]
  };

  /* ============ 1. 全局背景图（明暗 × 移动/桌面 四套）============ */
  let _lkThemeObserverInited = false;
  let _lkResizeInited = false;

  function _getCurrentTheme() {
    const t = document.documentElement.getAttribute('data-theme') ||
      document.body.getAttribute('data-theme') || 'light';
    return t === 'dark' ? 'dark' : 'light';
  }

  function _isMobileView() {
    return window.innerWidth < CONFIG.mobileBreakpoint;
  }

  function setBodyBackground() {
    const theme = _getCurrentTheme();
    const device = _isMobileView() ? 'mobile' : 'desktop';
    const bg = CONFIG.backgrounds?.[theme]?.[device] ||
      CONFIG.backgrounds?.light?.[device] || '';

    document.documentElement.style.setProperty(
      '--lk-body-bg',
      bg ? `url("${bg}")` : 'none'
    );
  }

  /* 监听 Butterfly 改 data-theme */
  function _watchThemeChange() {
    if (_lkThemeObserverInited) return;
    _lkThemeObserverInited = true;

    new MutationObserver(mutations => {
      for (const m of mutations) {
        if (m.attributeName === 'data-theme') {
          setBodyBackground();
          break;
        }
      }
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  /* 窗口尺寸变化时切换移动/桌面背景 */
  function _bindResizeForBg() {
    if (_lkResizeInited) return;
    _lkResizeInited = true;

    let t = null;
    window.addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(setBodyBackground, 120);
    }, { passive: true });
  }

  /* ============ 2. 判断首页 ============ */
  function isHomePage() {
    const p = location.pathname;
    return p === '/' || p === '/index.html' || /^\/page\/\d+\/?$/.test(p);
  }

  function setPosterBackground(element, url) {
    if (!url) return;
    const escapedUrl = String(url).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    element.style.backgroundImage = `url("${escapedUrl}")`;
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

    const header = document.getElementById('page-header');
    if (!header) return;

    const old = header.querySelector('.lk-video-banner');
    if (old) {
      if (old._lkObserver) old._lkObserver.disconnect();
      old.remove();
    }

    const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;

    let cfg = getPageVideoConfig();
    if (!cfg && isHomePage()) {
      cfg = {
        video: CONFIG.homeVideo,
        poster: CONFIG.homePoster
      };
    }
    if (!cfg) {
      return;
    }

    if (_shouldPosterOnly()) {
      createPosterBanner(header, cfg);
      return;
    }

    if (isMobile) {
      if (CONFIG.mobileHomeVideo) {
        cfg.video = CONFIG.mobileHomeVideo;
        createVideoBanner(header, cfg);
      } else {
        createPosterBanner(header, cfg);
      }
      return;
    }

    if (!cfg.video) {
      return;
    }
    createVideoBanner(header, cfg);
  }

  function createPosterBanner(header, cfg) {
    const banner = document.createElement('div');
    banner.className = 'lk-video-banner';

    const poster = document.createElement('div');
    poster.className = 'lk-video-poster';
    setPosterBackground(poster, cfg.poster);
    poster.style.opacity = '1';

    banner.appendChild(poster);
    header.insertBefore(banner, header.firstChild);
  }

  function _shouldPosterOnly() {
    if (CONFIG.disableVideoOnReducedMotion &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;

    const conn = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
    if (conn) {
      if (CONFIG.disableVideoOnSaveData && conn.saveData) return true;
      const t = conn.effectiveType || '';
      if (t === 'slow-2g' || t === '2g') return true;
    }
    return false;
  }

  function createVideoBanner(header, cfg) {
    const banner = document.createElement('div');
    banner.className = 'lk-video-banner';

    const poster = document.createElement('div');
    poster.className = 'lk-video-poster';
    setPosterBackground(poster, cfg.poster);
    poster.style.opacity = '1';

    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = CONFIG.bannerVideoPreload || 'none';
    if (cfg.poster) video.poster = cfg.poster;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.style.opacity = '0';

    video.addEventListener('loadeddata', () => {
      video.style.transition = 'opacity 0.8s ease';
      poster.style.transition = 'opacity 0.8s ease';
      video.style.opacity = '1';
      poster.style.opacity = '0';
      video.play().catch(() => {
        banner.dataset.videoPlayBlocked = '1';
      });
    }, { once: true });

    video.addEventListener('error', () => {
      banner.dataset.videoError = '1';
      video.style.display = 'none';
      poster.style.opacity = '1';
    }, { once: true });

    banner.appendChild(poster);
    banner.appendChild(video);
    header.insertBefore(banner, header.firstChild);

    const startLoad = () => {
      if (banner.dataset.videoLoaded === '1') return;
      banner.dataset.videoLoaded = '1';
      video.src = cfg.video;
      video.load();
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(startLoad, { timeout: 1500 });
    } else {
      setTimeout(startLoad, CONFIG.bannerLoadDelay || 300);
    }

    observeBannerVisibility(banner, video);
  }

  function observeBannerVisibility(banner, video) {
    if (!('IntersectionObserver' in window)) return;
    const ob = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && e.intersectionRatio > 0.2) {
            banner.classList.remove('is-paused');
            if (video.src && video.readyState >= 2) {
              video.play().catch(() => {
                banner.dataset.videoPlayBlocked = '1';
              });
            }
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

  let scrollRafId = null;
  function handleBannerScroll() {
    const header = document.getElementById('page-header');
    if (!header) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const headerHeight = header.offsetHeight;

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

  let revealObserver = null;

  function setupRevealAnimation() {
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }

    const isPostPage = !!document.getElementById('post');
    const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;

    if (isMobile && isPostPage) {
      document.querySelectorAll('.lk-reveal').forEach(el => {
        el.classList.add('lk-visible');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.lk-reveal').forEach(el => {
        el.classList.add('lk-visible');
      });
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;

            if (isMobile) {
              el.classList.add('lk-visible');
              setTimeout(() => { el.style.willChange = 'auto'; }, 500);
            } else {
              const idx = Number(el.dataset.lkRevealIndex || 0);
              const delay = Math.min(idx * 60, 300);
              setTimeout(() => {
                el.classList.add('lk-visible');
                setTimeout(() => { el.style.willChange = 'auto'; }, 900);
              }, delay);
            }
            revealObserver.unobserve(el);
          }
        });
      },
      {
        root: null,
        rootMargin: isMobile ? '0px 0px 0px 0px' : '0px 0px -5% 0px',
        threshold: isMobile ? 0.01 : 0.05
      }
    );

    const selector = CONFIG.revealSelectors.join(', ');
    let revealIndex = 0;
    document.querySelectorAll(selector).forEach(el => {
      if (el.classList.contains('lk-visible')) return;

      el.classList.add('lk-reveal');
      el.dataset.lkRevealIndex = String(revealIndex++);

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('lk-visible');
        return;
      }

      revealObserver.observe(el);
    });
  }

  function enableCoverVideos() {
    document.querySelectorAll('[data-cover-video]').forEach(el => {
      if (el.dataset.lkProcessed) return;

      const v = el.dataset.coverVideo;
      if (!v) return;
      el.dataset.lkProcessed = '1';

      const p = el.dataset.coverPoster || (typeof el.src === 'string' ? el.src : '');
      if (_shouldPosterOnly()) return;

      const wrap = document.createElement('div');
      wrap.className = 'lk-video-banner';
      wrap.style.cssText = 'position:relative;width:100%;height:100%;';

      const poster = document.createElement('div');
      poster.className = 'lk-video-poster';
      setPosterBackground(poster, p);

      const video = document.createElement('video');
      video.src = v;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      if (p) video.poster = p;

      video.addEventListener('error', () => {
        wrap.dataset.videoError = '1';
        video.style.display = 'none';
        poster.style.opacity = '1';
      }, { once: true });

      wrap.appendChild(poster);
      wrap.appendChild(video);
      el.parentNode.replaceChild(wrap, el);
      observeBannerVisibility(wrap, video);
    });
  }

  function setupMobileTocButton() {
    const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;
    const isPostPage = !!document.getElementById('post');

    const oldBtn = document.getElementById('lk-mobile-toc-btn');
    if (oldBtn) oldBtn.remove();
    const oldPanel = document.getElementById('lk-mobile-toc-panel');
    if (oldPanel) {
      if (typeof oldPanel._lkCleanup === 'function') oldPanel._lkCleanup();
      oldPanel.remove();
    }
    const oldMask = document.getElementById('lk-mobile-toc-mask');
    if (oldMask) oldMask.remove();

    if (!isMobile || !isPostPage) return;

    const tocContent = document.querySelector('#card-toc .toc-content, .toc-content');
    if (!tocContent || !tocContent.innerHTML.trim()) {
      return;
    }

    const btn = document.createElement('button');
    btn.id = 'lk-mobile-toc-btn';
    btn.innerHTML = '<i class="fas fa-list-ul"></i>';
    btn.setAttribute('aria-label', '目录');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'lk-mobile-toc-panel');
    document.body.appendChild(btn);

    const mask = document.createElement('div');
    mask.id = 'lk-mobile-toc-mask';
    document.body.appendChild(mask);

    const panel = document.createElement('div');
    panel.id = 'lk-mobile-toc-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'lk-mobile-toc-title');
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('tabindex', '-1');
    panel.inert = true;
    panel.innerHTML = `
      <div class="lk-toc-header">
        <span id="lk-mobile-toc-title">目录</span>
        <button class="lk-toc-close" aria-label="关闭">&times;</button>
      </div>
      <div class="lk-toc-body"></div>
    `;
    document.body.appendChild(panel);

    const tocBody = panel.querySelector('.lk-toc-body');
    tocBody.innerHTML = tocContent.innerHTML;

    const closeButton = panel.querySelector('.lk-toc-close');
    let lastFocusedElement = null;

    const open = () => {
      lastFocusedElement = document.activeElement;
      panel.classList.add('is-open');
      mask.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      panel.inert = false;
      btn.setAttribute('aria-expanded', 'true');
      closeButton.focus();
    };

    const close = (restoreFocus = true) => {
      panel.classList.remove('is-open');
      mask.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      panel.inert = true;
      btn.setAttribute('aria-expanded', 'false');
      if (restoreFocus && lastFocusedElement && lastFocusedElement.isConnected) {
        lastFocusedElement.focus();
      }
    };
    btn.addEventListener('click', open);
    mask.addEventListener('click', close);
    closeButton.addEventListener('click', close);

    const onKeyDown = event => {
      if (event.key === 'Escape' && panel.classList.contains('is-open')) close();
    };
    document.addEventListener('keydown', onKeyDown);
    panel._lkCleanup = () => document.removeEventListener('keydown', onKeyDown);

    tocBody.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        setTimeout(() => close(false), 200);
      }
    });
  }

  function setupImageLazyLoad() {
    const imgs = document.querySelectorAll('#article-container img:not([data-lk-lazy])');
    if (imgs.length === 0) return;

    imgs.forEach(img => {
      img.setAttribute('data-lk-lazy', '1');

      if (!img.hasAttribute('loading')) {
        img.loading = 'lazy';
      }

      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('lk-img-loaded');
        return;
      }

      img.classList.add('lk-img-loading');

      img.addEventListener('load', () => {
        img.classList.remove('lk-img-loading');
        img.classList.add('lk-img-loaded');
      }, { once: true });

      img.addEventListener('error', () => {
        img.classList.remove('lk-img-loading');
        img.classList.add('lk-img-error');
      }, { once: true });
    });
  }

  function setup404BackButton() {
    const button = document.getElementById('lk-404-back');
    if (!button || button.dataset.lkBound) return;

    button.dataset.lkBound = '1';
    button.addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.assign('/');
      }
    });
  }

  function init() {
    setBodyBackground();
    _watchThemeChange();
    _bindResizeForBg();
    injectVideoBanner();
    enableCoverVideos();
    setupRevealAnimation();
    handleBannerScroll();
    setupMobileTocButton();
    setupImageLazyLoad();
    setup404BackButton();

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function reinit() {
    setBodyBackground();
    injectVideoBanner();
    enableCoverVideos();
    setupRevealAnimation();
    handleBannerScroll();
    setupMobileTocButton();
    setupImageLazyLoad();
    setup404BackButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('pjax:complete', reinit);
})();
