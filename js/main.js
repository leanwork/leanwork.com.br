(function () {
  var toggle = document.querySelector('.nav-toggle');
  var header = document.querySelector('.site-header');
  var links = document.querySelectorAll('.nav-links .nav-link');
  if (!toggle || !header) return;

  function closeMenu() {
    header.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    var isOpen = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  toggle.addEventListener('click', toggleMenu);
  links.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', function (e) {
    if (header.classList.contains('nav-open') && !header.contains(e.target)) {
      closeMenu();
    }
  });
})();
