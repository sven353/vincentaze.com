// Progressive enhancement for every Netlify form on the site (forms with the class js-form).
// Each form has a sibling element [data-success] that is revealed after a successful submission.
(function () {
  document.querySelectorAll('form.js-form').forEach(function (form) {
    var err = form.querySelector('[data-error]');
    var ok = form.parentElement.querySelector('[data-success]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (err) err.classList.add('hidden');
      if (!form.checkValidity()) {
        if (err) { err.textContent = 'Please complete the required fields and tick the consent box.'; err.classList.remove('hidden'); }
        form.reportValidity();
        return;
      }
      var data = new URLSearchParams(new FormData(form)).toString();
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data })
        .then(function (r) {
          if (!r.ok) throw new Error('bad status');
          form.classList.add('hidden');
          if (ok) { ok.classList.remove('hidden'); ok.focus(); }
        })
        .catch(function () {
          if (err) { err.textContent = 'Something went wrong. Please email vincent@kuma.partners instead.'; err.classList.remove('hidden'); }
        });
    });
  });
})();
