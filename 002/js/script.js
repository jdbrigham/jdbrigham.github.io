$("[data-drawer]").on('click', function(e) {
  e.preventDefault();
  $($(this).data("drawer")).toggleClass("is-open");
});
