
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
