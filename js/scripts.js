/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
// Scroll reveal using IntersectionObserver
(function() {
  if (typeof window === 'undefined') return;

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; // respect reduced motion

  var revealEls = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || revealEls.length === 0) {
    // Fallback: just show
    revealEls.forEach(function(el) { el.classList.add('revealed'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries, obs) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '20% 0px -5% 0px', threshold: 0.05 });

  revealEls.forEach(function(el) { observer.observe(el); });

  // Safety: ensure near-fold items don't look like the page ends
  // After a short delay, pre-reveal items that are within 1 viewport height below
  window.setTimeout(function() {
    revealEls.forEach(function(el) {
      if (!el.classList.contains('revealed')) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.2) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      }
    });
  }, 400);
})();

// Enable Bootstrap carousel autoplay with pause on hover and reduced-motion support
(function() {
  if (typeof window === 'undefined') return;
  var carouselEl = document.querySelector('#carouselExampleIndicators');
  if (!carouselEl) return;

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; // don't auto-play

  // Bootstrap 5: use data attributes or instantiate via JS
  carouselEl.setAttribute('data-bs-ride', 'carousel');
  carouselEl.setAttribute('data-bs-interval', '3500');
  carouselEl.setAttribute('data-bs-pause', 'hover');

  try {
    var carousel = new bootstrap.Carousel(carouselEl, {
      interval: 3500,
      ride: 'carousel',
      pause: 'hover',
      touch: true,
      keyboard: true,
      wrap: true
    });
  } catch (e) {
    // Bootstrap may not be loaded yet; ignore
  }
})();

// Set dynamic current year in footer
(function() {
  if (typeof window === 'undefined') return;
  var year = String(new Date().getFullYear());
  var nodes = document.querySelectorAll('.js-current-year');
  if (!nodes || nodes.length === 0) return;
  nodes.forEach(function(node) { node.textContent = year; });
})();

// ===== About page enhancements =====
(function() {
  if (typeof window === 'undefined') return;

  // Lightbox for any .lightboxable
  var overlay = document.getElementById('lightboxOverlay');
  if (overlay) {
    var overlayImg = overlay.querySelector('.lightbox-img');
    function openLightbox(src, alt) {
      overlayImg.src = src;
      overlayImg.alt = alt || '';
      overlay.classList.remove('hidden');
    }
    function closeLightbox() {
      overlay.classList.add('hidden');
      // Defer src cleanup so CSS transition (if any) can run
      setTimeout(function() { overlayImg.src = ''; }, 150);
    }

    document.addEventListener('click', function(e) {
      var img = e.target.closest('.lightboxable');
      if (img) {
        openLightbox(img.src, img.alt);
      }
      if (e.target.closest('.lightbox-close')) {
        closeLightbox();
      }
      if (e.target === overlay) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
        closeLightbox();
      }
    });
  }

  // Drag-to-scroll for .drag-scroll containers
  var draggable = document.querySelectorAll('.drag-scroll');
  draggable.forEach(function(container) {
    var isDown = false;
    var startX = 0;
    var scrollLeft = 0;

    container.addEventListener('mousedown', function(e) {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    container.addEventListener('mouseleave', function() { isDown = false; });
    container.addEventListener('mouseup', function() { isDown = false; });
    container.addEventListener('mousemove', function(e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - container.offsetLeft;
      var walk = (x - startX) * 1.2; // scroll-fast factor
      container.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    var startTouchX = 0;
    container.addEventListener('touchstart', function(e) {
      if (!e.touches || e.touches.length === 0) return;
      startTouchX = e.touches[0].clientX;
      scrollLeft = container.scrollLeft;
    }, { passive: true });
    container.addEventListener('touchmove', function(e) {
      if (!e.touches || e.touches.length === 0) return;
      var diff = e.touches[0].clientX - startTouchX;
      container.scrollLeft = scrollLeft - diff;
    }, { passive: true });
  });
})();