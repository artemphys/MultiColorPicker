(function( $ ) {
    //var clickCount = 0;
    //$('.scroll-bar').click(function () {
    //    clickCount = clickCount+1;
    //    if (clickCount <=4){
    //        $(this).append('<div id="draggable1" class="draggable top-point">\
    //<div class="color-picker"><span class="glyphicon glyphicon-triangle-left ui-triangle"></span></div>\
    //<input type="text" class="form-control input-sm color-control top-input"></div>');
    //    };
    //});
    $($('.draggable')[1]).css('top','50%');
    var scrollbarLenght = $('.scroll-bar').height();
    console.log(scrollbarLenght);
    $('.draggable').mousemove(function() {
        console.log('up!');
        var trianglePosition = scrollbarLenght - $(this).position().top;
        $('.color-control', this).val(trianglePosition);

    });

    $('.color-control').change(function() {
        var trianglePosition = $(this).val();
        $(this).closest('.draggable').css('top',scrollbarLenght-trianglePosition+'px');
    });

})(jQuery);
