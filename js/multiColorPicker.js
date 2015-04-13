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
        template: '<div class="multiColorPicker">\
                        <div class="nav-element top-point">\
                            <div class="color-picker ui-triangle"></div>\
                            <input type="text" class="form-control input-sm color-control top-input" maxlength="5">\
                        </div>\
                        <div class="nav-element draggable">\
                            <div class="draggableRadius"><div class="color-picker ui-triangle"></div></div>\
                            <input type="text" class="form-control input-sm color-control" maxlength="5">\
                        </div>\
                        <div class="nav-element bottom-point">\
                            <div class="color-picker ui-triangle"></div>\
                            <input type="text" class="form-control input-sm color-control bottom-input" maxlength="5">\
                        </div>\
                    </div>',

        loadingText: 'loading...',

        pinStartValue: 0,
        pinMidValue: 0.5,
        pinEndValue: 1,

        pinStartColor: '#0000ff',
        pinMidColor: '#ffffff',
        pinEndColor: '#ff0000',

        size: 350
    }

    MultiColorPicker.prototype.init = function (element, options) {
        
        var that = this;
        that.options = that.getOptions(options);
        that.$element.html(that.options.template);

        // Init sub jquery plugins
        var $colorpickers = $('.color-picker', element).colorpicker();
        var $draggablePin = $('.draggable', element).draggable({ axis: 'y', containment: 'parent'});
        var $startedPin = $('.bottom-point', element);
        var $endedPin = $('.top-point', element);
        $draggablePin.$input = $draggablePin.find('.color-control');
        $startedPin.$input = $startedPin.find('.color-control');
        $endedPin.$input = $endedPin.find('.color-control');
        // end
        
        // Set default parameters
        var endColor;
        var startColor;
        var midColor;
        var $multiColorPicker = $('.multiColorPicker', element);
        $multiColorPicker.height(that.options.size);
        $draggablePin.$input.val(that.options.pinMidValue);
        $endedPin.$input.val(that.options.pinEndValue);
        $startedPin.$input.val(that.options.pinStartValue);
        var scrollbarLenght = that.options.size;
        var scale = scrollbarLenght/100;
        var pinEndColor = that.options.pinEndColor;
        var pinMidColor = that.options.pinMidColor;
        var pinStartColor = that.options.pinStartColor;
        var range = that.options.pinEndValue - that.options.pinStartValue;
        var pinMidPosition = 100-(((that.options.pinMidValue-that.options.pinStartValue)*100)/(range));

        $endedPin.find('.color-picker').css('border-right-color', pinEndColor);
        $startedPin.find('.color-picker').css('border-right-color', pinStartColor);
        $draggablePin.find('.color-picker').css('border-right-color', pinMidColor);

        $multiColorPicker.attr('style', 'height:'+that.options.size+'px;'+
        'background: -webkit-linear-gradient(top, ' + pinEndColor + ' 0%,' + pinMidColor +' '+ pinMidPosition + '%,' + pinStartColor + ' 100%);'+
        'background: -ms-linear-gradient(top, ' + pinEndColor + ' 0%,' + pinMidColor +' '+ pinMidPosition + '%,' + pinStartColor + ' 100%);'+
        'background: -moz-linear-gradient(top, ' + pinEndColor + ' 0%,' + pinMidColor +' '+ pinMidPosition + '%,' + pinStartColor + ' 100%);');
        // end
        
        // Attach events handlers
        $draggablePin.mousedown(onPinMove);
        $draggablePin.mousemove(onPinMove);

        //$('.draggableRadius', $draggablePin).on('mouseleave', function () {
        //    $draggablePin.trigger('mouseup');
        //});

        $endedPin.$input.on('change', function() {
            $(this).css({'border-color':''});
            if(+$(this).val()<=$startedPin.$input.val()){
                +$(this).val(null);
                $(this).css({'border-color':'red'});
                return false;
            }
            else {that.options.pinEndValue = (+$(this).val()).toFixed(5);}
            calibr();
        });
        $startedPin.$input.on('change', function() {
            $(this).css({'border-color':''});
            if(+$(this).val()>=$endedPin.$input.val()){
                +$(this).val(null);
                $(this).css({'border-color':'red'});
                return false;
            }
            else {that.options.pinStartValue = (+$(this).val()).toFixed(5);}
            calibr();
        });
        $draggablePin.$input.on('change', function() {
            that.options.pinMidValue = (+$(this).val()).toFixed(5);
            calibr();
        });



        function getValues(){
                    endColor = $endedPin.find('.ui-triangle').css('border-right-color');
                    startColor = $startedPin.find('.ui-triangle').css('border-right-color');
                    midColor = $draggablePin.find('.ui-triangle').css('border-right-color');
        };

        $colorpickers.on('changeColor.colorpicker', function(event){
            $(this).css('border-right-color', event.color.toHex());

            thatPosition();
            var colorPosition = $draggablePin.position().top / scale;
            getValues();
            setGradient(colorPosition);
        });

        // end

        function calibr(){
            if(that.options.pinEndValue <= that.options.pinMidValue){
                $draggablePin.$input.val(that.options.pinEndValue);
                $draggablePin.css('top','0%');
            }
            else if(that.options.pinStartValue >= that.options.pinMidValue){
                $draggablePin.$input.val(that.options.pinStartValue);
                $draggablePin.css('top','100%');
            }
            else {
                $('.draggable').css('top',pinMidPosition+'%');
            }
            thatPosition();
        };

        function thatPosition(){
            that.options.pinMidValue = +$draggablePin.$input.val();
            that.options.pinEndValue = +$endedPin.$input.val();
            that.options.pinStartValue = +$startedPin.$input.val();
        };

        function setGradient(colorPosition){

            $multiColorPicker
                        .css('background', '-webkit-linear-gradient(top, ' + endColor + ' 0%,' + midColor + colorPosition + '%,' + startColor + ' 100%)')
                        .css('background', '-ms-linear-gradient(top, ' + endColor + ' 0%,' + midColor + colorPosition + '%,' + startColor + ' 100%)')
                        .css('background', '-moz-linear-gradient(top, ' + endColor + ' 0%,' + midColor + colorPosition + '%,' + startColor + ' 100%)');
            that.options.pinEndColor=endColor;
            that.options.pinMidColor=midColor;
            that.options.pinStartColor=startColor;
        }

        function onPinMove(){
            if(scrollbarLenght - $(this).position().top !== 0) {
                $draggablePin.$input.val((that.options.pinStartValue+((range / scrollbarLenght) * (scrollbarLenght - $(this).position().top))).toFixed(5));
            }
            getValues();
            thatPosition();
            var colorPosition = $(this).position().top / scale;
            setGradient(colorPosition);
        };

        calibr();
    }

    MultiColorPicker.prototype.getDefaults = function () {
        return MultiColorPicker.DEFAULTS
    }

    MultiColorPicker.prototype.getOptions = function (options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)
        return options
    }

    MultiColorPicker.prototype.getColors = function () {

    //debugger;
        return {
            topColor : RGBA2HEX(this.options.pinEndColor),
            midColor : RGBA2HEX(this.options.pinMidColor),
            bottomColor : RGBA2HEX(this.options.pinStartColor),
            topValue : this.options.pinEndValue,
            midValue : this.options.pinMidValue,
            bottomValue : this.options.pinStartValue
        }
    }

    MultiColorPicker.prototype.setBackgroundColor = function ($el) {
        //
    }

    function RGBA2HEX( color_value ) {
        if ( ! color_value ) return false;
        if ( color_value.indexOf('rgb') == -1) return color_value;

        var parts = color_value.toLowerCase().match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/),
            length = color_value.indexOf('rgba') ? 3 : 2; // Fix for alpha values
        delete(parts[0]);
        for ( var i = 1; i <= length; i++ ) {
            parts[i] = parseInt( parts[i] ).toString(16);
            if ( parts[i].length == 1 ) parts[i] = '0' + parts[i];
        }
        return '#' + parts.join('').toUpperCase();
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
