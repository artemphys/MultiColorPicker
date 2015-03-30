(function( $ ) {
            $('.scroll-bar').click(function () {
                //$(this).append('<div id="draggable1" class="draggable">\
                //<div class="btn btn-xs input-group color-picker" >\
                //<span class="input-group-addon"><i>1</i></span></div></div>');
            });
    $('.draggable').mousemove(function() {
        var trianglePosition = $(this).position().top;
        $('.position-input', this).val(trianglePosition);
    });
})(jQuery);
