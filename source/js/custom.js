/* ========================================================================
 * Loogeking's Blog - 自定义脚本
 * 功能：背景图同步 + 视频背景 + Banner 滚动过渡 + 卡片懒加载入场 + 移动端TOC
 * ======================================================================== */

(function () {
  'use strict';

  /* ============ 配置区 ============ */
  const CONFIG = {
    bodyBackground: 'https://i.postimg.cc/8CwCW0DC/background.jpg',
    mobileBackground: 'https://i.postimg.cc/y89bxDc0/zhe-feng-bi-zhi-shan-qiu-yan-shi-qing-tian.jpg',
    homeVideo: '/img/index.mp4',
    homePoster: 'https://i.postimg.cc/8CwCW0DC/background.jpg',

    
    mobileHomeVideo: '/img/index_phone.mp4',

    enableVideo: true,
    mobileBreakpoint: 768,

    revealSelectors: [
      '#recent-posts .recent-post-item',
      '#aside-content .card-widget',
      '#archive .article-sort-item:not(.year)',
      '#tag .article-sort-item:not(.year)',   // ✨ 改动 2：标签页也参与懒加载
      '.relatedPosts',
      '#pagination',
      '.tag-cloud-list',
      '.category-lists',
      '.flink-list-item'
    ]
  };

  /* ============ 1. 全局背景图（区分移动端/桌面端）============ */
  function setBodyBackground() {
    const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;
    const bg = isMobile && CONFIG.mobileBackground
      ? CONFIG.mobileBackground
      : CONFIG.bodyBackground;

    if (bg) {
      document.documentElement.style.setProperty('--lk-body-bg', `url(${bg})`);
    }
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setBodyBackground, 300);
  });

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
      console.log('[Custom] 当前页面无视频配置');
      return;
    }

    if (isMobile) {
      if (CONFIG.mobileHomeVideo) {
        console.log('[Custom] 移动端注入本地视频:', CONFIG.mobileHomeVideo);
        cfg.video = CONFIG.mobileHomeVideo;
        createVideoBanner(header, cfg);
      } else {
        console.log('[Custom] 移动端注入静态海报');
        createPosterBanner(header, cfg);
      }
      return;
    }

    if (!cfg.video) {
      console.log('[Custom] 无视频源');
      return;
    }
    console.log('[Custom] 桌面端注入视频:', cfg.video);
    createVideoBanner(header, cfg);
  }

  function createPosterBanner(header, cfg) {
    const banner = document.createElement('div');
    banner.className = 'lk-video-banner';

    const poster = document.createElement('div');
    poster.className = 'lk-video-poster';
    if (cfg.poster) {
      poster.style.backgroundImage = `url(${cfg.poster})`;
    }
    poster.style.opacity = '1';

    banner.appendChild(poster);
    header.insertBefore(banner, header.firstChild);
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

    // ✨ 改动 3：给 video 原生加 poster 属性，视频加载前先显示，减少白屏
    if (cfg.poster) {
      video.poster = cfg.poster;
    }

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
              // ✨ 改动 4：动画完成后清理 will-change，释放 GPU
              setTimeout(() => { el.style.willChange = 'auto'; }, 500);
            } else {
              const allRevealing = document.querySelectorAll('.lk-reveal:not(.lk-visible)');
              let idx = 0;
              allRevealing.forEach((item, i) => {
                if (item === el) idx = i;
              });
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
    document.querySelectorAll(selector).forEach(el => {
      if (el.classList.contains('lk-visible')) return;

      el.classList.add('lk-reveal');

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('lk-visible');
        return;
      }

      revealObserver.observe(el);
    });
  }

  /* ============ 7. 文章封面视频支持 ============ */
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
      if (p) video.poster = p;

      wrap.appendChild(poster);
      wrap.appendChild(video);
      el.parentNode.replaceChild(wrap, el);
      observeBannerVisibility(wrap, video);
    });
  }

  /* ============ 8. 移动端浮动目录按钮 ✨ 改动 5：从外部搬进 IIFE，修复 CONFIG 未定义 ============ */
  function setupMobileTocButton() {
    const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;
    const isPostPage = !!document.getElementById('post');

    // 清理旧按钮
    const oldBtn = document.getElementById('lk-mobile-toc-btn');
    if (oldBtn) oldBtn.remove();
    const oldPanel = document.getElementById('lk-mobile-toc-panel');
    if (oldPanel) oldPanel.remove();
    const oldMask = document.getElementById('lk-mobile-toc-mask');
    if (oldMask) oldMask.remove();

    if (!isMobile || !isPostPage) return;

    const tocContent = document.querySelector('#card-toc .toc-content, .toc-content');
    if (!tocContent || !tocContent.innerHTML.trim()) {
      console.log('[Custom] 文章无目录');
      return;
    }

    const btn = document.createElement('button');
    btn.id = 'lk-mobile-toc-btn';
    btn.innerHTML = '<i class="fas fa-list-ul"></i>';
    btn.setAttribute('aria-label', '目录');
    document.body.appendChild(btn);

    const mask = document.createElement('div');
    mask.id = 'lk-mobile-toc-mask';
    document.body.appendChild(mask);

    const panel = document.createElement('div');
    panel.id = 'lk-mobile-toc-panel';
    panel.innerHTML = `
      <div class="lk-toc-header">
        <span>目录</span>
        <button class="lk-toc-close" aria-label="关闭">&times;</button>
      </div>
      <div class="lk-toc-body"></div>
    `;
    document.body.appendChild(panel);

    const tocBody = panel.querySelector('.lk-toc-body');
    tocBody.innerHTML = tocContent.innerHTML;

    btn.addEventListener('click', () => {
      panel.classList.add('is-open');
      mask.classList.add('is-open');
    });

    const close = () => {
      panel.classList.remove('is-open');
      mask.classList.remove('is-open');
    };
    mask.addEventListener('click', close);
    panel.querySelector('.lk-toc-close').addEventListener('click', close);

    tocBody.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        setTimeout(close, 200);
      }
    });

    console.log('[Custom] ✓ 移动端 TOC 按钮已注入');
  }

    /* ============ 8.5 图片懒加载 + 淡入 ============ */
    function setupImageLazyLoad() {
      const imgs = document.querySelectorAll('#article-container img:not([data-lk-lazy])');
      if (imgs.length === 0) return;
  
      imgs.forEach(img => {
        img.setAttribute('data-lk-lazy', '1');
  
        // 用浏览器原生懒加载（现代浏览器都支持）
        if (!img.hasAttribute('loading')) {
          img.loading = 'lazy';
        }
  
        // 已经加载完的（缓存命中）直接标记
        if (img.complete && img.naturalHeight !== 0) {
          img.classList.add('lk-img-loaded');
          return;
        }
  
        // 加载中 → 加淡入前的样式
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

  /* ============ 9. 初始化 ============ */
  function init() {
    console.log('[Custom] custom.js loaded ✓');
    setBodyBackground();
    injectVideoBanner();
    enableCoverVideos();
    setupRevealAnimation();
    handleBannerScroll();
    setupMobileTocButton();
    setupImageLazyLoad(); 

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
    setupMobileTocButton();
    setupImageLazyLoad();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('pjax:complete', reinit);
})();