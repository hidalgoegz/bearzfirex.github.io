(function($){
  $.fn.extend({
       center: function (options) {
            var options =  $.extend({ // Default values
                 inside: $(this).parent(), // element, center into window
                 transition: 0, // millisecond, transition time
                 minX:0, // pixel, minimum left element value
                 minY:0, // pixel, minimum top element value
                 withScrolling:true, // booleen, take care of the scrollbar (scrollTop)
                 vertical:true, // booleen, center vertical
                 horizontal:true // booleen, center horizontal
            }, options);
            return this.each(function() {
                 var props = {position:'absolute'};
                 if (options.vertical) {
                      var top = ($(options.inside).height() - $(this).outerHeight()) / 2;
                      if (options.withScrolling) top += $(options.inside).scrollTop() || 0;
                      top = (top > options.minY ? top : options.minY);
                      $.extend(props, {top: top+'px'});
                 }
                 if (options.horizontal) {
                       var left = ($(options.inside).width() - $(this).outerWidth()) / 2;
                       if (options.withScrolling) left += $(options.inside).scrollLeft() || 0;
                       left = (left > options.minX ? left : options.minX);
                       $.extend(props, {left: left+'px'});
                 }
                 if (options.transition > 0) $(this).animate(props, options.transition);
                 else $(this).css(props);
                 return $(this);
            });
       }
  });
})(jQuery);

function centerAll() {
  $('.center').center();
  $('.center-vertically').center({
    horizontal: false
  });
  $('.center-horizontally').center({
    vertical: false
  });
}

centerAll();

$(window).bind('resize', function() {
    centerAll();
    $('.full-window').css({
      width: "100%",
      height: $(window).height()
    });
    $('.hamburger').removeClass('is-active');
    if($(window).width() > 799)
    {
      $('.elements').css({'transition' : 'none'}).removeClass('show')
    }
    else {
      $('.elements').css({'transition' : 'top 0.4s'}).removeClass('show')
    }
});

$(document).ready(function(){

  centerAll();

  $('.hamburger').click(function(){
    $(this).toggleClass("is-active");
    $('.elements').toggleClass("show");
  });

  $('.elements a').click(function(){
    $('.hamburger').click();
  });
  
  $('.full-window').css({
    width: "100%",
    height: $(window).height()
  });

  $('#content').fadeIn(500, function(){
    centerAll();
    $('body').toggleClass('start animated');
    setTimeout(function(){
      $('body').toggleClass('animated done');
    }, 2000);
  });
});