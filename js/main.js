
$(document).ready(function() {
	// Navigation
	$('#nav').onePageNav({
	    currentClass: 'current',
	    changeHash: false,
	    scrollSpeed: 750,
	    scrollThreshold: 0.5,
	    filter: '',
	    easing: 'swing',
	    begin: function() {
	        //I get fired when the animation is starting
	        console.log('begin animation')
	    },
	    end: function() {
	        //I get fired when the animation is ending
	        console.log('animation ended')
	    },
	    scrollChange: function($currentListItem) {
	        //I get fired when you enter a section and I pass the list item of the section
	        console.log($currentListItem)
	    }
	});

	//Timeline
	$('.timeline-item-trigger span').click(function(){
		if($(this).hasClass('glyphicon glyphicon-plus-sign')){$(this).removeClass('glyphicon glyphicon-plus-sign').addClass('glyphicon glyphicon-minus-sign');}
		else{$(this).removeClass('glyphicon glyphicon-minus-sign').addClass('glyphicon glyphicon-plus-sign');}
	});
	
	$('.timeline-item-title').click(function(){
		$trigger = $(this).parent().parent().find('.timeline-item-trigger span');
		if($trigger.hasClass('glyphicon glyphicon-plus-sign')){$trigger.removeClass('glyphicon glyphicon-plus-sign').addClass('glyphicon glyphicon-minus-sign');}
		else{$trigger.removeClass('glyphicon glyphicon-minus-sign').addClass('glyphicon glyphicon-plus-sign');}
	});
});