/* ========================================================================
 * Loogeking's Blog - 自定义脚本
 * 功能：背景图同步 + 视频背景 + Banner 滚动过渡 + 卡片懒加载入场
 * ======================================================================== */

(function () {
  'use strict';

  /* ============ 配置区 ============ */
  const CONFIG = {
    bodyBackground: 'https://i.postimg.cc/8CwCW0DC/background.jpg',
    mobileBackground: 'https://i.postimg.cc/y89bxDc0/zhe-feng-bi-zhi-shan-qiu-yan-shi-qing-tian.jpg',
    homeVideo: './img/index.mp4', 
    homePoster: 'https://i.postimg.cc/8CwCW0DC/background.jpg',
    mobileHomeVideo: 'https://www.douyin.com/aweme/v1/play/?file_id=ce4b4c976ea94041b46cf3645866b5d6&is_play_url=1&line=0&ply_type=3&sign=50b6e76aa41d483cfef049c33e652944&source=PackSourceEnum_PRIVATE_PUBLISH&video_id=v0d00fg10000d8t7scfog65gim6bcemg',

    enableVideo: true,
    mobileBreakpoint: 768,

    // 懒加载入场目标选择器
    // 注意：文章正文不参与，避免 opacity:0 导致看不见
    revealSelectors: [
      '#recent-posts .recent-post-item',
      '#aside-content .card-widget',
      '#archive .article-sort-item:not(.year)',
      '.relatedPosts',
      '#pagination',
      '.tag-cloud-list',
      '.category-lists',
      '.flink-list-item'
      // '#page #article-container'  ← 已移除，文章正文不参与懒加载
    ]
  };

  /* ============ 1. 全局背景图（区分移动端/桌面端）============ */
  function setBodyBackground() {
    const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;
    const bg = isMobile && CONFIG.mobileBackground
      ? CONFIG.mobileBackground
      : CONFIG.bodyBackground;

    if (bg) {
      document.documentElement.style.setProperty(
        '--lk-body-bg',
        `url(${bg})`
      );
    }
  }

  // 窗口大小变化时切换背景图
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

    // 清理旧的
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

    // 移动端处理
    if (isMobile) {
      if (CONFIG.mobileHomeVideo) {
        // 有移动端专用视频
        console.log('[Custom] 移动端注入竖版视频');
        cfg.video = CONFIG.mobileHomeVideo;
        createVideoBanner(header, cfg);
      } else {
        // 没有移动端视频，只注入海报
        console.log('[Custom] 移动端注入静态海报');
        createPosterBanner(header, cfg);
      }
      return;
    }

    // 桌面端正常注入视频
    if (!cfg.video) {
      console.log('[Custom] 无视频源');
      return;
    }
    console.log('[Custom] 注入视频:', cfg.video);
    createVideoBanner(header, cfg);
  }

  /* 移动端只注入海报图 */
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

  /* ============ 6. 卡片滚动懒加载入场（已修复移动端问题）============ */
  let revealObserver = null;

  function setupRevealAnimation() {
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }

    const isPostPage = !!document.getElementById('post');
    const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;

    // 移动端文章页：直接显示所有内容，不做任何动画
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
              // 移动端：立即显示，不加延迟
              el.classList.add('lk-visible');
            } else {
              // 桌面端：保留错峰效果
              const allRevealing = document.querySelectorAll('.lk-reveal:not(.lk-visible)');
              let idx = 0;
              allRevealing.forEach((item, i) => {
                if (item === el) idx = i;
              });
              const delay = Math.min(idx * 60, 300);
              setTimeout(() => {
                el.classList.add('lk-visible');
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

      // 已经在视口内的元素：立即显示
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
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
    setupMobileTocButton();

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
    setupMobileTocButton()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('pjax:complete', reinit);
})();

/* ============ 11. 移动端浮动目录按钮 ============ */
function setupMobileTocButton() {
  // 只在移动端 + 文章页显示
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

  // 检查页面是否有目录内容
  const tocContent = document.querySelector('#card-toc .toc-content, .toc-content');
  if (!tocContent || !tocContent.innerHTML.trim()) {
    console.log('[Custom] 文章无目录');
    return;
  }

  // 创建悬浮按钮
  const btn = document.createElement('button');
  btn.id = 'lk-mobile-toc-btn';
  btn.innerHTML = '<i class="fas fa-list-ul"></i>';
  btn.setAttribute('aria-label', '目录');
  document.body.appendChild(btn);

  // 创建遮罩
  const mask = document.createElement('div');
  mask.id = 'lk-mobile-toc-mask';
  document.body.appendChild(mask);

  // 创建目录面板
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

  // 把目录内容克隆进去
  const tocBody = panel.querySelector('.lk-toc-body');
  tocBody.innerHTML = tocContent.innerHTML;

  // 打开
  btn.addEventListener('click', () => {
    panel.classList.add('is-open');
    mask.classList.add('is-open');
  });

  // 关闭
  const close = () => {
    panel.classList.remove('is-open');
    mask.classList.remove('is-open');
  };
  mask.addEventListener('click', close);
  panel.querySelector('.lk-toc-close').addEventListener('click', close);

  // 点目录项后自动关闭面板
  tocBody.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) {
      setTimeout(close, 200);
    }
  });
}