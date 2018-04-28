$().ready(() => {
  console.log($);
  // hamburger
  const $navToggle = $(".navBurgerToggle");
  // navbar menu
  const $navToggleMenu = $("#navBurgerToggleMenu");
  // navbar menu item(s)
  const $navCloseMenu = $(".navbar-item-selected");

  // toggle navbar menu open/close
  $($navToggle).click((event) => {
    $navToggle.toggleClass("is-active");
    $navToggleMenu.toggleClass("is-active");
    console.log("nav menu toggled");
  });

  // close navbar menu on navbar item click
  $($navCloseMenu).click((event) => {
    $navToggle.toggleClass("is-active");
    $navToggleMenu.toggleClass("is-active");
    console.log("nav menu closed");
  });
});
