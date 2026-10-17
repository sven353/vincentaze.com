(function () {
  var drawer = document.getElementById('drawer');
  var openBtn = document.getElementById('menu-open');
  var closeBtn = document.getElementById('menu-close');
  if (!drawer || !openBtn || !closeBtn) return;
  function setOpen(open) {
    drawer.classList.toggle('hidden', !open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    (open ? closeBtn : openBtn).focus();
  }
  openBtn.addEventListener('click', function () { setOpen(true); });
  closeBtn.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !drawer.classList.contains('hidden')) setOpen(false); });
  drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
})();
