// less than 1280px viewport width
if (window.innerWidth < 1280) {
  const refs = {
    mobileMenu: document.querySelector("[data-mobile-menu]"),
    openMobileMenuBtn: document.querySelector("[data-open-mobile-menu-btn]"),
    navLinks: document.querySelectorAll("[data-nav-link]"),
  };

  refs.openMobileMenuBtn.addEventListener("click", toggleMobileMenu);

  refs.navLinks.forEach(function (link) {
    link.addEventListener("click", toggleMobileMenu);
  });

  function toggleMobileMenu() {
    const isMobileMenuExpanded =
      refs.openMobileMenuBtn.classList.contains("is-active");

    document.body.classList.toggle("scroll-hidden");
    refs.mobileMenu.classList.toggle("is-open");
    refs.openMobileMenuBtn.classList.toggle("is-active");
    refs.openMobileMenuBtn.setAttribute("aria-expanded", !isMobileMenuExpanded);
  }
}
