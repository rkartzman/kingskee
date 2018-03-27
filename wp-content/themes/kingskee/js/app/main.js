console.log('hey app');
var $window = $(window),
    $body = $('body');



var ScrollView = function(opts) {
    this.opts = opts;
    this.el = this.opts.el;
    var self = this;
    
    $window.on('scroll', function() {
        self.scrollImageHandler();
    });
    this.init = function() {
        this.bindUIActions();
    },
    this.bindUIActions = function() {

    },
    this.scrollImageHandler = function() {
        var st = $(window).scrollTop();
    }
};
if(window.requestAnimationFrame && document.documentElement.classList) {
        // check that we have requet animation frame in the browser
        document.documentElement.classList.add('enhanced');
          var throttle = function(func, wait, options) {
          var _ = {
            now: Date.now || function() {
              return new Date().getTime();
            }
          };
          var context, args, result;
          var timeout = null;
          var previous = 0;
          if (!options) {
            options = {};
          }
          var later = function() {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) {
              context = args = null;
            }
          };
          return function() {
            var now = _.now();
            if (!previous && options.leading === false) {
              previous = now;
            }
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
              if (timeout) {
                clearTimeout(timeout);
                timeout = null;
              }
              previous = now;
              result = func.apply(context, args);
              if (!timeout) {
                context = args = null;
              }
            } else if (!timeout && options.trailing !== false) {
              timeout = setTimeout(later, remaining);
            }
            return result;
          };
        };

}
var _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

var utility = function(){
    return{
        throttle: function(fn, threshhold, scope) {
            threshhold || (threshhold = 250);
            var last;
            var deferTimer;
            return function() {
                var context = scope || this;

                var now = +new Date,
                    args = arguments;
                if (last && now < last + threshhold) {
                    // preserve by debouncing the last call
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        fn.apply(context, args);
                    }, threshhold);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        },
        debounce: function(fn, threshhold, scope) {
            threshhold || (threshhold = 250);
            var deferTimer;

            return function () {
                var context = scope || this;
                var args = arguments;

                clearTimeout(deferTimer);
                deferTimer = setTimeout(function() {
                    fn.apply(context, args);
                }, threshhold);

            };
        },
        setCookie: function(id, value, days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            var expires = "expires="+date.toUTCString();
            document.cookie = id + "=" + value + "; " + expires;
        },
        getCookie: function(id) {
            var name = id + "=";
            var cookies = document.cookie.split(';');

            for(var i=0; i<cookies.length; i++) {
                var cookie = cookies[i];
                while (cookie.charAt(0) == ' ')
                    cookie = cookie.substring(1);
                if( cookie.indexOf(name) == 0 )
                    return cookie.substring(name.length, cookie.length);
            }
            return "";
        },
        deleteCookie: function(id){
            this.setCookie(id, "", -1);
        },
        checkBrowser: function(){
            // Check for IE 9,10,11
            if ( /MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ){
                // this is Internet explorer 9 10 and 11
                $('html').addClass('ie');
                isIe = true;
            }

            if ( /constructor/i.test(window.HTMLElement) ){
                // this is Safari
                $('html').addClass('safari');
                isSafari = true;
            }

            if ( window.navigator.userAgent.indexOf('Edge') > -1 ){
                // this is Safari
                $('html').addClass('edge');
                isEdge = true;
            }
        }
    };
};

var scrollDetector = function(){
    var position = 0;
    var lastPosition = 0;
    var direction;
    var isTop;
    var $nav = $('.nav');

    return {
        isTop: function(){
            return isTop;
        },
        direction: function(){
            return direction;
        },
        update: function(callbacks){
            
            lastPosition = position;
            position = $window.scrollTop();
            direction = lastPosition > position ? 'up' : 'down';
            isTop = position < $nav.height();

            if( typeof(callbacks) === 'undefined' ) return;

            // call the function(s) to run after the update
            if( Array.isArray(callbacks) ){
                for( var i=0; i < callbacks.length; i++ ) {
                    callbacks[i](direction, isTop);
                }
            } else {
                callbacks(direction, isTop);
            }
        }
    }
};

var util = new utility();

var scrollCallbacks = [ // array of functions to run on scroll
    
];
var scrollDetector = new scrollDetector();
scrollDetector.update();

var scrollDelay = 250;
$window.scroll(
    util.throttle(function(){
        scrollDetector.update(scrollCallbacks);
    }, scrollDelay, this)
);


var HeaderScrollView = function(opts) {
    this.opts = opts;
    this.el = this.opts.el;
    // this.$offCanvas = $('.nav__container--offCanvas');
    this.$mobileMenu = $('.mobile__menu');
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var isTop;
    var navbarHeight = this.el.outerHeight();
    var self = this;



    var scrollHandler = util.throttle(function() {
        didScroll = true;
        if (didScroll) {
        _requestAnimationFrame(self.hasScrolled);   
        }
        didScroll = false;

    }, 17);

    if (window.addEventListener) {
        addEventListener('scroll', scrollHandler, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scrollHandler);
    } else {
        window.onscroll = scrollHandler;
    }

    
    this.init = function() {
        // var self = this;
        self.el.addClass('nav-down');
        self.bindUIActions();
        
    },
    this.bindUIActions = function() {
        $('.mobile-menu__toggle').on('click', function(e) { self.toggleMobileMenu(e) });
        $('.mobile__menu .icon-close').on('click', function(e) { self.toggleMobileMenu(e) });
        $('.body-section').on('click', function(e) { self.closeMobileMenu(e) });
    },  
    this.hasScrolled = function() {

        
        var st = $(window).scrollTop();
        isTop = st < navbarHeight;
        if (Math.abs(lastScrollTop - st) <= delta ) return;
        if (isTop) {self.el.addClass('isTop');}
        if(st > lastScrollTop && st > navbarHeight) {
            // scroll down
            // if(self.$offCanvas.hasClass('active')) { return; }
            self.el.removeClass('nav-down').addClass('nav-up');
            self.el.removeClass('isTop');
            $('body').removeClass('nav-down').addClass('nav-up');
            
        } else {
            // scroll up 
            if(st + $(window).height() < $(document).height()) {
                self.el.removeClass('nav-up').addClass('nav-down');
                $('body').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;

    }, 
    this.closeMobileMenu = function(e) {
        if($(self.$mobileMenu.hasClass('active'))) {
            self.$mobileMenu.removeClass('active');
            $('.body-section').removeClass('mm-active');
            $('body').removeClass('mm-active');
            $('#nav-icon3').removeClass('open');
            
        } else {
            return;
        }
    },
    this.toggleMobileMenu = function(e) {
        if($(self.$mobileMenu).hasClass('active')) {
            self.$mobileMenu.removeClass('active');
            $('.body-section').removeClass('mm-active');
            $('body').removeClass('mm-active');
            $('#nav-icon3').removeClass('open');
        } else {
            self.$mobileMenu.addClass('active');
            $('.body-section').addClass('mm-active');
            $('body').addClass('mm-active');
            $('#nav-icon3').addClass('open');
        }

    }
}

$(document).ready(function() {
    // var sv = new scrollView({el: $('.landing__section')});
    // sv.init();
    // var hv = new HeaderView({el: $('.nav')});
    
    var sv = new ScrollInView({});
    sv.init();
    var hsv = new HeaderScrollView({el: $('.nav')});
    hsv.init();

});