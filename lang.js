/* Energon Corporation: language choice (E-072). No inline script; CSP script-src 'self'.
   The NO/EN switch stores the choice in localStorage when clicked.
   Redirects happen ONLY from the English home page "/": a stored choice wins, otherwise the first entry of
   navigator.languages decides (nb/nn/no -> /no/, anything else stays on /). A direct /no/ link always shows
   Norwegian and is never redirected. Redirect uses location.replace, and only when the target differs. */
(function () {
  var KEY = 'energon-lang';
  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function stored() { try { var v = localStorage.getItem(KEY); return (v === 'en' || v === 'nb') ? v : null; } catch (e) { return null; } }
  function browser() {
    var l = (navigator.languages && navigator.languages.length) ? navigator.languages[0] : (navigator.language || '');
    var p = String(l).toLowerCase().split(/[-_]/)[0];
    return (p === 'nb' || p === 'nn' || p === 'no') ? 'nb' : 'en';
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[data-lang]') : null;
    if (a) store(a.getAttribute('data-lang') === 'nb' ? 'nb' : 'en');
  });
  var path = location.pathname;
  if (path !== '/' && path !== '/index.html') return;
  if ((stored() || browser()) === 'nb') location.replace('/no/' + location.hash);
})();
