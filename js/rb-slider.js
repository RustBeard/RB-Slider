/*!
 * Based on jQuery plugin boilerplate by @ajpiano and @addyosmani
 */

/*
 * to do: 
 * animation speed (nav showing)
 * auto play (and stop on hover, dots on bottom - legend)
 * scale up when clicked
 * touch and mouse slide
 * animation style (ease)
 * path to image for left and right navigation
 */

;(function ($, window, document, undefined) {

    // Default options
    var RBslider = 'RBslider',
        defaults = {
            arrowImagePath: './img/arrow.svg',
            slideSpeed: 300
        };

    // Constructor
    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = RBslider;

        this.init();
    }

    Plugin.prototype = {

        init: function () {
            var that = this;
            $(window).load(function(){
                that.build();
                that.clone();
                that.visible();
                that.move();
            });
        },

        build: function () {
            RBslider = $(this.element);
            RBslider.addClass('rbslider');
            RBslider.children().addClass('rbslider-element');
            RBelement = $('.rbslider-element');
            RBelement.css({
                height: RBslider.height() // Height 'o element same as slider element - apply 'tis inline, better fer divs wit' content
            }); 
            RBfirst = RBelement.first();
            RBlast = RBelement.last();

            // Create container overflowin' slider, that holds content
            RBelement.wrapAll("<div class='rbslider-holder' />");
            RBholder = $('.rbslider-holder');

            // create navigation
            RBslider.append('<div class="rbslider-right" ><img src="' + this.options.arrowImagePath + '" /></div>');
            RBslider.append('<div class="rbslider-left" ><img src="' + this.options.arrowImagePath + '" /></div>');
            RBnav = $('.rbslider-right, .rbslider-left');
            RBnavRight = $('.rbslider-right');
            RBnavLeft = $('.rbslider-left');

            RBnav.hide();
            RBslider.hover(function () {
                RBnav.stop().animate({width: 'toggle'}, 200); 
            }, function () {
                RBnav.stop().animate({width: 'toggle'}, 300); 
            });
        },

        move: function () {
            RBcurrentElement = RBfirst;
            
            // move slider when navigation is clicked
            slideSpeed = this.options.slideSpeed;
            
            var that = this;
            
            RBnav.click(function () {
                RBholderPos = RBholder.position().left;
                
                RBholder.stop(true, true);
                var target = $(this).attr('class');
                
                if (target === 'rbslider-right') {
                    var value = RBcurrentElement.width();
                    RBholder.animate({
                        right: '+=' + value
                    }, slideSpeed, that.visible);
                    RBcurrentElement = RBcurrentElement.next();
                } else {
                    if(RBcurrentElement === RBfirst) {
                        
                        alert('dupa');
                        
                    }
                    else {
                        var value = RBcurrentElement.prev().width();
                        RBholder.animate({
                            right: '-=' + value
                        }, slideSpeed, that.visible);
                        RBcurrentElement = RBcurrentElement.prev();
                    }
                }
                
                console.log('RBholder position: ' + RBholderPos);
                console.log('Current element: ' + RBcurrentElement.attr('src'));
            });
        }, 
        
        visible: function () {
            RBelement.each(function () {
                var RBholderValue = parseInt(RBholder.css('right'), 10);
                var value = ($(this).position().left) - RBholderValue;  // each element (left border) position
                if ((value < RBslider.width()) && value >= 0) {
                    $(this).addClass('visible');
                }
                else {
                    $(this).removeClass('visible');
                }
            });
        }, 
        
        clone: function () {
            // adding only necessary elements for infinite loop
            $(RBelement.get().reverse()).each(function () {
                var value = ($(this).position().left - RBslider.width());
                if (value <= 0) {
                    RBelement.last().after($(this).clone());
                }
            });
            
            RBelement.each(function () {
                var value = ($(this).position().left + $(this).width() - RBslider.width());
                if (value >= 0) {
                    RBelement.first().before($(this).clone());
                }
            });
            
            // Declare it second time, because cloned elements aren't in variable
            RBelement = $('.rbslider-element');
            
            // Calculate holder's width after RBslider's content is loaded
            RBholderWidth = 0;
            RBelement.each(function () {
                RBholderWidth += $(this).outerWidth();
            });
            RBholder.css({
                width: RBholderWidth
            });
            
            // set starting position
            RBholder.css({ right: 
            (RBfirst.position().left)
            });
        }
    };

    // Plugin wrapper around the constructor preventing against multiple instantiations
    $.fn[RBslider] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + RBslider)) {
                $.data(this, 'plugin_' + RBslider,
                new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);