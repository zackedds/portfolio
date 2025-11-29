(function() {
  if (typeof window === 'undefined') return;

  function gradient(ctx, x0, y0, x1, y1) {
    var g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, '#8B5CF6');
    g.addColorStop(1, '#1e40af');
    return g;
  }

  function drawRoundedRect(ctx, x, y, w, h, r) {
    var radius = Math.min(r, w/2, h/2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function renderFaviconZE(canvas) {
    var ctx = canvas.getContext('2d');
    var size = canvas.width;
    // background
    var bg = gradient(ctx, 0, 0, size, size);
    ctx.fillStyle = bg;
    drawRoundedRect(ctx, 0, 0, size, size, Math.floor(size * 0.22));
    ctx.fill();
    // monogram
    ctx.fillStyle = 'white';
    ctx.font = Math.floor(size * 0.5) + 'px Plus Jakarta Sans, system-ui, -apple-system, Segoe UI, Roboto, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ZE', size/2, size/2 + 1);
  }

  function renderFaviconZ(canvas) {
    var ctx = canvas.getContext('2d');
    var size = canvas.width;
    ctx.fillStyle = '#ffffff';
    drawRoundedRect(ctx, 0, 0, size, size, Math.floor(size * 0.2));
    ctx.fill();
    ctx.fillStyle = '#1e30f3';
    ctx.font = Math.floor(size * 0.6) + 'px Plus Jakarta Sans, system-ui, -apple-system, Segoe UI, Roboto, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Z', size/2, size/2 + 2);
  }

  function renderFaviconAbstract(canvas) {
    var ctx = canvas.getContext('2d');
    var size = canvas.width;
    // gradient backdrop
    var bg = gradient(ctx, 0, 0, size, size);
    ctx.fillStyle = bg;
    drawRoundedRect(ctx, 0, 0, size, size, Math.floor(size * 0.25));
    ctx.fill();
    // abstract shape
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(size*0.2, size*0.65);
    ctx.bezierCurveTo(size*0.1, size*0.1, size*0.9, size*0.1, size*0.8, size*0.65);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function renderOGCard(canvas) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    // background gradient
    var bg = gradient(ctx, 0, 0, w, h);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    // content card
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    drawRoundedRect(ctx, 40, 40, w - 80, h - 80, 24);
    ctx.fill();
    // left photo mask
    var photoW = Math.floor((w - 120) * 0.38);
    var photoH = h - 120;
    ctx.save();
    drawRoundedRect(ctx, 60, 60, photoW, photoH, 16);
    ctx.clip();
    // use profile image if available
    var img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 60, 60, photoW, photoH);
      ctx.restore();
      drawOGText();
    };
    img.onerror = function() {
      // fallback placeholder
      ctx.fillStyle = '#dde2ee';
      ctx.fillRect(60, 60, photoW, photoH);
      ctx.restore();
      drawOGText();
    };
    img.src = 'images/people/apple_profile.png';

    function drawOGText() {
      ctx.fillStyle = '#111';
      ctx.font = '900 56px Plus Jakarta Sans, system-ui, -apple-system, Segoe UI, Roboto, Arial';
      ctx.fillText('Zack Edds', 60 + photoW + 32, 140);
      ctx.font = '600 26px Plus Jakarta Sans, system-ui, -apple-system, Segoe UI, Roboto, Arial';
      ctx.fillStyle = '#444';
      ctx.fillText('CS @ UIUC • ML • Robotics • Software', 60 + photoW + 32, 190);

      // footer
      ctx.fillStyle = '#666';
      ctx.font = '500 22px Plus Jakarta Sans, system-ui, -apple-system, Segoe UI, Roboto, Arial';
      ctx.fillText('zackedds.com', 60 + photoW + 32, h - 80);
    }
  }

  function renderOGMinimal(canvas) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    // backdrop
    var bg = gradient(ctx, 0, 0, w, h);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    // title
    ctx.fillStyle = '#fff';
    ctx.font = '900 96px Plus Jakarta Sans, system-ui, -apple-system, Segoe UI, Roboto, Arial';
    ctx.fillText('Zack Edds', 60, 200);
    ctx.font = '600 40px Plus Jakarta Sans, system-ui, -apple-system, Segoe UI, Roboto, Arial';
    ctx.fillText('CS @ UIUC • ML • Robotics • Software', 60, 270);
    // border card
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, 40, 40, w - 80, h - 80, 24);
    ctx.stroke();
  }

  function hookDownloads() {
    document.querySelectorAll('[data-dl]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.getAttribute('data-dl');
        var name = btn.getAttribute('data-name') || (id + '.png');
        var canvas = document.getElementById(id);
        if (!canvas) return;
        var link = document.createElement('a');
        link.download = name;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    });
  }

  function init() {
    var c1 = document.getElementById('fav-ze-64');
    var c2 = document.getElementById('fav-z-64');
    var c3 = document.getElementById('fav-abs-64');
    var og = document.getElementById('og-card-1200');
    var ogMin = document.getElementById('og-min-1200');

    if (c1) renderFaviconZE(c1);
    if (c2) renderFaviconZ(c2);
    if (c3) renderFaviconAbstract(c3);
    if (og) renderOGCard(og);
    if (ogMin) renderOGMinimal(ogMin);

    hookDownloads();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(); 