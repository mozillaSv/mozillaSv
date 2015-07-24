(function($){
  $.fn.go_top = function(params){
    var defaults = {
      "top":200,
      "in":200,
      "out":200,
      "duration":400,
    };

    var options = jQuery.extend(defaults, params);
    var go_top = $(this);   
    
    $(window).on('load scroll', function(){
      if ($(this).scrollTop() > options.top) {        
        go_top.css({'display':'inline'})          
      } else {        
        go_top.fadeOut(options.out);
      }
    });

    return go_top.click(function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, options.duration);
    });
  };

}( jQuery ));
