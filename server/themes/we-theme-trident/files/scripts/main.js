(function($) {
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 100
  });

  $(function() {
    $('.match-grid-col-scroll').matchHeight();
  });
})(jQuery);