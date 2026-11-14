(function () {
  var root = document.querySelector('[data-nav-root]');
  var btn = root && root.querySelector('[data-nav-toggle]');
  if (!btn) return;
  function set(open) {
    root.setAttribute('data-nav-open', open ? 'true' : 'false');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? (btn.getAttribute('data-label-close') || 'Close menu') : (btn.getAttribute('data-label-open') || 'Open menu'));
  }
  btn.addEventListener('click', function () { set(root.getAttribute('data-nav-open') !== 'true'); });
  root.querySelectorAll('[data-nav-close]').forEach(function (el) { el.addEventListener('click', function () { set(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function () { set(false); });
})();
