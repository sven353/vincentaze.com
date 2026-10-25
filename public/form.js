(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var err = document.getElementById('form-error');
  var ok = document.getElementById('form-success');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    err.classList.add('hidden');
    if (!form.checkValidity()) {
      err.textContent = 'Please complete every field and accept the privacy policy.';
      err.classList.remove('hidden');
      form.reportValidity();
      return;
    }
    var data = new URLSearchParams(new FormData(form)).toString();
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data })
      .then(function (r) {
        if (!r.ok) throw new Error('bad status');
        form.classList.add('hidden');
        ok.classList.remove('hidden');
        ok.focus();
      })
      .catch(function () {
        err.textContent = 'Something went wrong. Please email vincent@kuma.partners instead.';
        err.classList.remove('hidden');
      });
  });
})();
