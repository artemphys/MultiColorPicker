(function( $ ) {

    $($('.nav-element')[1]).css('top','50%');
    $('.draggable').find('.color-control').val(500);
    $('.top-point').find('.color-control').val(1000);
    $('.bottom-point').find('.color-control').val(0);
    var midPosition = 500;
    var topPosition = 1000;
    var bottomPosition = 0;
    var scrollbarLenght = $('.scroll-bar').height();
    var scale=scrollbarLenght/100;

    $('.draggable').mousemove(function() {
        var range = topPosition - bottomPosition;
        $('.color-control', this).val((range/scrollbarLenght)*(scrollbarLenght - $(this).position().top));

        var colorPosition =$(this).position().top/scale;
        var topColor = $('.top-point').find('.ui-triangle').css('color');
        var bottomColor = $('.bottom-point').find('.ui-triangle').css('color');
        var midColor = $('.ui-triangle', this).css('color');
        $('.scroll-bar').css('background', '-webkit-linear-gradient(top, '+topColor+' 0%,'+midColor+colorPosition+'%,'+bottomColor+' 100%');
    });

    $('.top-point').find('.color-control').change(function() {
        topPosition = $(this).val();
        calibr();
    });
    $('.bottom-point').find('.color-control').change(function() {
        bottomPosition = $(this).val();
        calibr();
    });
    $('.draggable').find('.color-control').change(function() {
        midPosition = $(this).val();
        calibr();

    });


function calibr(){
    var range = topPosition - bottomPosition;
    if(topPosition <= midPosition){
        $('.draggable').find('.color-control').val(topPosition);
        $('.draggable').css('top','0%');
    }
    else if(bottomPosition >= midPosition){
        $('.draggable').find('.color-control').val(bottomPosition);
        $('.draggable').css('top','100%');
    }
    else {$('.draggable').css('top',100-(midPosition*100)/range+'%');};
    $('.draggable').mousemove();
};


    $('.color-picker').colorpicker().on('changeColor.colorpicker', function(event){
        $('.ui-triangle', this).css('color', event.color.toHex());
        var topColor = $('.top-point').find('.ui-triangle').css('color');
        var bottomColor = $('.bottom-point').find('.ui-triangle').css('color');
        var midColor = $('.ui-triangle', this).css('color');
        $('.scroll-bar').css('background', '-webkit-linear-gradient(top, '+topColor+' 0%,'+midColor+' 50%,'+bottomColor+' 100%');
    });


})(jQuery);
