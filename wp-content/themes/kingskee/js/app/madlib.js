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