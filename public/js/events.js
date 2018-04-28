$(document).ready(() => {
  // hamburger
  const $navToggle = $(".navBurgerToggle");
  // navbar menu
  const $navToggleMenu = $("#navBurgerToggleMenu");

  // toggle navbar menu
  $($navToggle).click((event) => {
    $navToggle.toggleClass("is-active");
    $navToggleMenu.toggleClass("is-active");
  });
});
