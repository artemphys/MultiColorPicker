+function ($) {
    'use strict';

    // MULTICOLORPICKER PUBLIC CLASS DEFINITION
    // ==============================

    var MultiColorPicker = function (element, options) {
        this.$element  = $(element)
        this.options   = $.extend({}, MultiColorPicker.DEFAULTS, options)
        this.isLoading = false
        this.init(element, options)
    }

    MultiColorPicker.VERSION  = '1.0.0'

    MultiColorPicker.DEFAULTS = {
        template: '<div class="multiple-color-selector">\
                        <div class="nav-element top-point">\
                            <div class="color-picker"><span class="glyphicon glyphicon-triangle-left ui-triangle"></span></div>\
                            <input type="text" class="form-control input-sm color-control top-input">\
                        </div>\
                        <div class="nav-element draggable">\
                            <div class="color-picker"><span class="glyphicon glyphicon-triangle-left ui-triangle"></span></div>\
                            <input type="text" class="form-control input-sm color-control">\
                        </div>\
                        <div class="nav-element bottom-point">\
                            <div class="color-picker"><span class="glyphicon glyphicon-triangle-left ui-triangle"></span></div>\
                            <input type="text" class="form-control input-sm color-control bottom-input">\
                        </div>\
                    </div>',

        loadingText: 'loading...'
    }

    MultiColorPicker.prototype.init = function (element, options) {

        this.options   = this.getOptions(options);
        this.$element.html(this.options.template);

        var midPosition = 500;
        var topPosition = 1000;
        var bottomPosition = 0;
        var scrollbarLenght = $('.multiple-color-selector', element).height();
        var scale = scrollbarLenght/100;
        
        $('.draggable', element).find('.color-control').val(500).parent().css('top','50%');
        $('.top-point', element).find('.color-control').val(1000);
        $('.bottom-point', element).find('.color-control').val(0);
        
        $('.draggable', element).mousemove(function() {
            var range = topPosition - bottomPosition;
            $('.color-control', this).val((range/scrollbarLenght)*(scrollbarLenght - $(this).position().top));

            var colorPosition =$(this).position().top/scale;
            
            var topColor = $('.top-point').find('.ui-triangle').css('color');
            var bottomColor = $('.bottom-point').find('.ui-triangle').css('color');
            var midColor = $('.ui-triangle', this).css('color');
            $('.multiple-color-selector').css('background', '-webkit-linear-gradient(top, '+topColor+' 0%,'+midColor+colorPosition+'%,'+bottomColor+' 100%');
        });

        $('.top-point', element).find('.color-control').change(function() {
            topPosition = $(this).val();
            calibr();
        });
        $('.bottom-point', element).find('.color-control').change(function() {
            bottomPosition = $(this).val();
            calibr();
        });
        $('.draggable', element).find('.color-control').change(function() {
            midPosition = $(this).val();
            calibr();

        });

        function calibr(){
            var range = topPosition - bottomPosition;
            if(topPosition <= midPosition){
                $('.draggable', element).find('.color-control').val(topPosition);
                $('.draggable', element).css('top','0%');
            }
            else if(bottomPosition >= midPosition){
                $('.draggable', element).find('.color-control').val(bottomPosition);
                $('.draggable', element).css('top','100%');
            }
            else {$('.draggable').css('top',100-(midPosition*100)/range+'%');};
            $('.draggable', element).mousemove();
        };

        $('.color-picker', element).colorpicker().on('changeColor.colorpicker', function(event){
            $('.ui-triangle', this).css('color', event.color.toHex());
            
            var topColor = $('.top-point', element).find('.ui-triangle').css('color');
            var bottomColor = $('.bottom-point', element).find('.ui-triangle').css('color');
            var midColor = $('.ui-triangle', this).css('color');
            $('.multiple-color-selector').css('background', '-webkit-linear-gradient(top, '+topColor+' 0%,'+midColor+' 50%,'+bottomColor+' 100%');
        });

        $( '.draggable', element).draggable({ axis: 'y', containment: 'parent'});
        $('.color-picker', element).colorpicker({});

    }

    MultiColorPicker.prototype.getDefaults = function () {
        return MultiColorPicker.DEFAULTS
    }

    MultiColorPicker.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)
        return options
    }

    MultiColorPicker.prototype.getColors = function () {
        
        var data = {
            topColor : RGBA2HEX($('.top-point', this.$element).find('.ui-triangle').css('color')),
            bottomColor : RGBA2HEX($('.bottom-point', this.$element).find('.ui-triangle').css('color')),
            midColor : RGBA2HEX($('.draggable', this.$element).find('.ui-triangle').css('color')),
            topValue : $('.top-point', this.$element).find('.color-control').val(),
            bottomValue : $('.bottom-point', this.$element).find('.color-control').val(),
            midValue : $('.draggable', this.$element).find('.color-control').val()
        };
        return data;
    }

    function RGBA2HEX( color_value ) {
        if ( ! color_value ) return false;
        var parts = color_value.toLowerCase().match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/),
            length = color_value.indexOf('rgba') ? 3 : 2; // Fix for alpha values
        delete(parts[0]);
        for ( var i = 1; i <= length; i++ ) {
            parts[i] = parseInt( parts[i] ).toString(16);
            if ( parts[i].length == 1 ) parts[i] = '0' + parts[i];
        }
        return '#' + parts.join('').toUpperCase(); // #F7F7F7
    }

    // MULTICOLORPICKER PLUGIN DEFINITION
    // ========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('multicolorpicker')
            var options = typeof option == 'object' && option

            if (!data && option == 'destroy') return
            if (!data) $this.data('multicolorpicker', (data = new MultiColorPicker(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    var old = $.fn.multicolorpicker

    $.fn.multicolorpicker             = Plugin
    $.fn.multicolorpicker.Constructor = MultiColorPicker


    // MULTICOLORPICKER NO CONFLICT
    // ==================

    $.fn.multicolorpicker.noConflict = function () {
        $.fn.multicolorpicker = old
        return this
    };

}(jQuery);
