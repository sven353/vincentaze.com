(function () {
  var panel = document.getElementById('drawer');
  var btn = document.getElementById('menu-open');
  if (!panel || !btn) return;
  function setOpen(open) {
    panel.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function () { setOpen(panel.classList.contains('hidden')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.classList.contains('hidden')) { setOpen(false); btn.focus(); } });
  document.addEventListener('click', function (e) { if (!panel.classList.contains('hidden') && !panel.contains(e.target) && !btn.contains(e.target)) setOpen(false); });
  panel.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
  window.matchMedia('(min-width: 768px)').addEventListener('change', function (m) { if (m.matches) setOpen(false); });
})();
