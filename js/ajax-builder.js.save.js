var s, 
	parsingLinks = {

		settings: {
		    numALinks: $("a").length,
		    aLinksList: $("a")
		},

		init: function() {
			// kick things off
			
			s = this.settings;
			this.bindUIActions();
			console.log(s);
		},

		bindUIActions: function() {
			s.aLinksList.on("click", function() {
		 		parsingLinks.changingCasualLinksToAjax(s.numALinks);
				//console.log(s.aLinksList);
				return false;				
			});
		},


	changingCasualLinksToAjax: function(numToGet) {
		console.log(numToGet);
		//	Which element?
		var whichOne = $("a")[numToGet - 1];
		//	What is its href?
		var currentTarget = whichOne.href;
		//	What is its ID?
		var currentId = whichOne.id;
		console.log(currentId);
							  
		var toLoad = $(whichOne).attr('href')+' .content';
		$('.content').hide('fast',loadContent);
		$('#load').remove();
		$('#wrapper').append('<span id="load">LOADING...</span>');
		$('#load').fadeIn('normal');
		//	Set the new value of the URL bar	
		window.location.hash = $(whichOne).attr('href').substr(0,$(whichOne).attr('href').length-5);
		
		function loadContent() {
			$('#wrapper').load(toLoad,'',showNewContent())
		}

		function showNewContent() {
			parsingLinks.init();

			$('.content').show('normal',hideLoader());
		}

		function hideLoader() {
			$('#load').fadeOut('normal');
		}

		return false;

	}
};

parsingLinks.init();