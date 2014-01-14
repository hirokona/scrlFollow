/*!
 * jQuery scrlFollow Plugin (beta)
 * http://hirokonakahara.com/jquery/scrlFollow/
 * Copyright 2014 Hiroko Nakahara
 * Released under the MIT license
 */

;(function($) {
	//test test test
	$.fn.scrlFollow = function(options){
		var elements = this;
		elements.each(function(){
			var opts = $.extend({}, $.fn.scrlFollow.defaults, options);
		  	var $trg = $(this);
			var trgH = $trg.height();
			var trgOffset = $trg.offset().top; //initial pos
			var trgTop;
			var timer = null;
			var $stopAt = opts.stopAt;
			if($stopAt){ var stopOffset = $stopAt.offset().top;}

			var checkScroll = function(){
		    	//function is called = still scrolling = reset timer (cancel to do ajast)
		        window.clearTimeout(timer);
		    	//ajast target when [opts.speed]ms passed
		        timer = window.setTimeout(function() {
					var scrollTop = $(window).scrollTop();
		            if (scrollTop > trgOffset) {
		            	//set trgTop
		            	if($stopAt && (scrollTop + trgH > stopOffset )){
		            		//stop at opts.stopAt
							trgTop = stopOffset - trgH;
		            	} else {
		            		//browser top
							trgTop = scrollTop;
						}
					} else { //initial pos
						trgTop = trgOffset;
					}
					$trg.stop().animate({top: trgTop},opts.speed,opts.easing);
		        }, opts.timeout);
			}

			checkScroll();
			$(window).scroll(function() {
				checkScroll();
			});
		});

		return this;
	};

	$.fn.scrlFollow.defaults = {
	  stopAt: '',
	  speed: 400,
	  timeout: 200,
	  easing: 'swing'
	};

}) (jQuery);
