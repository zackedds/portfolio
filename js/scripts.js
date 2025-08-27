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