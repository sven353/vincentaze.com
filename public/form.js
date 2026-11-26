// Progressive enhancement for every Netlify form on the site (forms with the class js-form).
// Each form has a sibling element [data-success] that is revealed after a successful submission.
(function () {
  document.querySelectorAll('form.js-form').forEach(function (form) {
    var err = form.querySelector('[data-error]');
    var ok = form.parentElement.querySelector('[data-success]');
    var btn = form.querySelector('button[type="submit"]');
    var label = btn ? btn.innerHTML : '';
    function fail(msg) {
      if (err) { err.textContent = msg; err.classList.remove('hidden'); }
      if (btn) { btn.disabled = false; btn.innerHTML = label; btn.removeAttribute('aria-busy'); }
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (err) err.classList.add('hidden');
      if (!form.checkValidity()) {
        form.querySelectorAll(':invalid').forEach(function (el) { el.setAttribute('aria-invalid', 'true'); });
        if (err) { err.textContent = 'Please complete the required fields and tick the consent box.'; err.classList.remove('hidden'); }
        form.reportValidity();
        return;
      }
      if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); btn.textContent = 'Sending…'; }
      var data = new URLSearchParams(new FormData(form)).toString();
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data })
        .then(function (r) {
          if (!r.ok) throw new Error('bad status');
          form.classList.add('hidden');
          if (ok) { ok.classList.remove('hidden'); ok.focus(); }
        })
        .catch(function () { fail('Something went wrong. Please email vincent@kuma.partners instead.'); });
    });
    form.addEventListener('input', function (e) { if (e.target.removeAttribute) e.target.removeAttribute('aria-invalid'); });
  });
})();
