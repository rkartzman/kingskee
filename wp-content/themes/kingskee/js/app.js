var MadlibView = function(opts) {
	this.opts = opts;
	this.el = this.opts.el;
	this.madlibs = this.el.find('.madlibs');
	this.inactive = this.el.find('.madlibs.is-invisible');
	this.active = this.el.find('.madlibs.is-active');

  this.offset = 0;
  var self = this;
  this.init = function() {
  	var self = this;
  	var h = 0;
  	// console.log(this.active);
  	$(this.active).each(function(idx, madlib) {
  		console.log(madlib);
  		h += $(madlib).outerHeight();
  	});
  

  	var strng = 'translateY(calc(50vh - ' + h + 'px))';
  	$('.madlibs-container').css('transform', strng);

  	self.offset = h;
  	self.form = document.querySelector('.email-form');
  	// document.querySelector('#submit-btn').addEventListener('click', function(e) {
  	// 	console.log('submitting');
  	// 	self.form.submit();
  	// });
    
  	document.querySelector('.email-form').addEventListener('submit', function(e) {
  		console.log('submttting');
  		e.preventDefault();
  		var data = {action: 'submit_email', data: $(this).serialize()};
  		console.log(data);
	  	 $.ajax({
				 url: '/wp-admin/admin-ajax.php',
				 type: 'post',
				 data: data, // it will serialize the form data
	       dataType: 'json', 
	       success: function(response) {
	       	console.log(response);
	       }
	     })
	     

	    
  	})
  	document.querySelector('.madlibs .button__wrapper').addEventListener('click', function(e) { self.startSteptwo(e)});
  	document.querySelector('.madlibs .email__input').addEventListener('keypress', function(e) {self.handleEmail(e)});
  },
  this.hasScrolled = function() {
  	var st = $(window).scrollTop();
  },
  this.startSteptwo = function(e) {

  	e.preventDefault();
  	var $thisChild = $(e.currentTarget).parent();
  	console.log($thisChild);

  	var nextChild = $thisChild.next();
  	var submit = $('.madlibs.submit');
  	if ($(nextChild).hasClass('is-invisible')) {
  		$(nextChild).removeClass('is-invisible');
  		$(nextChild).addClass('is-active');
  		$(submit).removeClass('is-invisible');
  		$(submit).addClass('is-active');
  	}
  	self.calcOffset(nextChild);
  }, 
  this.calcOffset = function(section) {
  	self.offset += section.outerHeight();
  	var strng = 'translateY(calc(50vh - ' + self.offset + 'px))';
  	$('.madlibs-container').css('transform', strng);
  },
  this.handleEmail = function(e) {
  	var $this = $(this);
  	console.log(e)
  },
  this.resetFormFields = function() {
    this.fromField.value = '';
    this.toField.value = '';
  },

  _validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
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

    var mv = new MadlibView({el: $('.madlibs-container')});
    mv.init();

});
// // Create a Stripe client.
// var stripe = Stripe('pk_test_jqA5FZUC0a234B7oAd7WLxQP');

// // Create an instance of Elements.
// var elements = stripe.elements();

// // Custom styling can be passed to options when creating an Element.
// // (Note that this demo uses a wider set of styles than the guide below.)
// var style = {
//   base: {
//     color: '#32325d',
//     lineHeight: '18px',
//     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//     fontSmoothing: 'antialiased',
//     fontSize: '16px',
//     '::placeholder': {
//       color: '#aab7c4'
//     }
//   },
//   invalid: {
//     color: '#fa755a',
//     iconColor: '#fa755a'
//   }
// };

// // Create an instance of the card Element.
// var card = elements.create('card', {style: style});

// // Add an instance of the card Element into the `card-element` <div>.
// card.mount('#card-element');

// // Handle real-time validation errors from the card Element.
// card.addEventListener('change', function(event) {
//   var displayError = document.getElementById('card-errors');
//   if (event.error) {
//     displayError.textContent = event.error.message;
//   } else {
//     displayError.textContent = '';
//   }
// });

// // Handle form submission.
// var form = document.getElementById('payment-form');
// form.addEventListener('submit', function(event) {
//   event.preventDefault();

//   stripe.createToken(card).then(function(result) {
//     if (result.error) {
//       // Inform the user if there was an error.
//       var errorElement = document.getElementById('card-errors');
//       errorElement.textContent = result.error.message;
//     } else {
//       // Send the token to your server.
//       stripeTokenHandler(result.token);
//     }
//   });
// });

var ScrollInView = function(opts) {
  
    console.log('initialize scroll in view');
    this.opts = opts;
    // console.log(opts)
   // animate ltr instead of up 
    // this.animateBoth = opts.animateBoth || false;
    this.padding = opts.padding || '';
    
    this.counter = opts.counter || false;
    
    var revealer = document.querySelectorAll('.revealer');
    

        // // define our throttle scroll and resize handlers 
    var scrollHandler = util.throttle(function() {
        _requestAnimationFrame(self.toggleElement);
    }, 300);
    var resizeHandler = util.throttle(function() {
        _requestAnimationFrame(self.toggleElement);
    }, 300);
  
  



    // // add our event listeners and attach our scroll and resize handlers 
    if (window.addEventListener) {
        addEventListener('scroll', scrollHandler, false);
        addEventListener('resize', resizeHandler, false);

    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scrollHandler);
        window.attachEvent('onresize', resizeHandler);
    } else {
        window.onscroll = scrollHandler;
        window.onresize = resizeHandler;
    }

    if(window.requestAnimationFrame && document.documentElement.classList) {
      // check that we have requet animation frame in the browser
      document.documentElement.classList.add('enhanced');
    }

    var _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
    
    // // set the scroll top to 0 on initialize
    // $(window).scrollTop(0);
    

    var self = this;
    // // the element we can reuse inthe dom as the els to be revealed
    this.init = function() {
      self.initScroll();
    }, 
    this.initScroll = function() {
      self.toggleElement()
    }, 
    this.toggleElement = function() {
      for (var i = 0; i < revealer.length; i++) {
            if (self.checkVisibility(revealer[i])) {
              if (revealer[i].querySelector('img') !== null && revealer[i].querySelector('img').getAttribute('data-src') !== null) {
                image = revealer[i].querySelector('img');
                image.setAttribute('src', image.getAttribute('data-src'));

                image.removeAttribute('data-src');
                image.classList.add('isLoading');

                // image.classList.add('loaded');
                var reveal = revealer[i];
                // reveal.classList.add('revealed')
                self.fadeInCustom(reveal, image);
              } else {
                fadeInDelay(i, revealer);
                
                
              }
              // image.classList.add('loaded');
            } else {
                // revealer[i].classList.remove('revealed');
            }
        }
        function fadeInDelay(i, revealer) {
          setTimeout(function() {
            revealer[i].classList.add('revealed');
          }, i * 50);
        }
        var fadeInCustom = function(element, image) {
          image.classList.add('loaded')
          var timer = setTimeout(function () {
            element.classList.add('revealed');
          }, 350);
        }
    },
    

    // // this will loop through all of our revealer elements, call our checkVisibility function and add a class to it iff checkVisibility returns true
    // var toggleElement = function() {
 
        
    // };

    



    

    

  this.getElemInfo = function(elem) {
      var offsetTop = 0;
      var offsetLeft = 0;
      var offsetHeight = elem.offsetHeight;
      var offsetWidth = elem.offsetWidth;
      
      do {
          if (!isNaN(elem.offsetTop)) {
              offsetTop += elem.offsetTop;
          }
          if (!isNaN(elem.offsetLeft)) {
              offsetLeft += elem.offsetLeft;
          }
      } while ((elem = elem.offsetParent) !== null);

      return {
          top: offsetTop,
          left: offsetLeft,
          height: offsetHeight,
          width: offsetWidth
      };
  },
  
  this.getCurrentScroll =  function() { // get the current x and y scroll values 
    return {
          x: window.pageXOffset,
          y: window.pageYOffset
      };
  },
  this.getViewportSize = function() { // get reliable dimensions of the viewport
    return {
          width: window.document.documentElement.clientWidth,
          height: window.document.documentElement.clientHeight
      };
  }, 
  this.checkVisibility = function(elem) { // check if the element is within the boundary of the window
      var viewportSize = self.getViewportSize();
      var currentScroll = self.getCurrentScroll();
      var elemInfo = self.getElemInfo(elem);
      var spaceOffset = self.padding || 0.1;
      var elemHeight = elemInfo.height;
      var elemWidth = elemInfo.width;
      var elemTop = elemInfo.top;
      var elemLeft = elemInfo.left;
      var elemBottom = elemTop + elemHeight;
      var elemRight = elemLeft + elemWidth;

      var checkBoundaries = function() {
          // Defining the element boundaries and extra space offset
          var top = elemTop + elemHeight * spaceOffset;

          var left = elemLeft + elemWidth * spaceOffset;
          var bottom = elemBottom - elemHeight * spaceOffset;
          var right = elemRight - elemWidth * spaceOffset;

          // Defining the window boundaries and window offset
          var wTop = currentScroll.y + 0;
          var wLeft = currentScroll.x + 0;
          var wBottom = currentScroll.y - 0 + viewportSize.height;
          var wRight = currentScroll.x - 0 + viewportSize.width;

          // Check if the element is within boundary
          return (top < wBottom) && (bottom > wTop) && (left > wLeft) && (right < wRight);
      };

      return checkBoundaries();
  }
}
