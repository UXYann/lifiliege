function ContentWorksView(){
	
}

ContentWorksView.prototype = new MainContentSmoothyView();

ContentWorksView.prototype.init = function(tag){
	console.log("ContentWorksView.prototype.init = function(tag)");
	MainContentView.prototype.init.call(this, tag);
	this.tag = jQuery(tag);
		
};


//on currentUpdated : quand notre vue s'affiche
ContentWorksView.prototype.onCurrentUpdated = function(){
	console.log("ContentWorksView.prototype.onCurrentUpdated = function()");
	MainContentView.prototype.onCurrentUpdated.call(this);
	if(this.controller.model.current == this.id){
		this.checkLang();
		this.enableView();
		this.keyWords();
		window.setTimeout(this.popUp, 200);
	}else{
		this.disableView();
	}
}

//ondataupdated : quand les données du lifi on changé
ContentWorksView.prototype.onDataUpdated = function(){
	console.log("ContentWorksView.prototype.onDataUpdated = function()");

	//Encore un peu de mal avec le parcours, est-ce que l'on veut changer de vue si jamais les données du lifi
	// ont changé et que l'on est sur cette page ? 
	// Si oui, alors on recuprère le current de hotspotcontroller, on verifie si il y a plusieurs oeuvres, si oui
	// on reste ici et on affiche displayItem, si non, on enregistre la valeur de l'oeuvre dans item de hotspot et
	//on redirige vers la vue detail

}

ContentWorksView.prototype.enableView = function(){
	console.log("ContentWorksView.prototype.enableView = function()");
	jQuery('.spacerTd').first().remove();
	//enable events
	jQuery('#artworksinfos').bind('mousedown', jQuery.proxy(this.onClickTools, this));
	jQuery('.slideBGArtworks img').bind('mousedown', jQuery.proxy(this.onClickWork, this));
	jQuery('.planButton').bind('mousedown', jQuery.proxy(this.onBackToMap,this));
	//on écoute le changement de données du lifi que quand on est sur cette vue
	jQuery(this.hotSpotController.model).bind(HotSpotEvent.ON_CURRENT_UPDATED, jQuery.proxy(this.onDataUpdated, this));
	this.displayItems();
};


ContentWorksView.prototype.displayItems = function(){
	console.log("ContentWorksView.prototype.displayItems = function()");

//	console.log('id Lifi : ' + this.hotSpotController.model.current.idLifi + 'Nombres oeuvres : ' + this.hotSpotController.model.current['oeuvre'].length);

	if(this.hotSpotController.model.current['oeuvre'].length > 1) {
		
		$('.severalArtWorksContainer').html("");
		var currentContainer = $('.severalArtWorksContainer');

		var currentArtWorkItem = "";
		for (var i = 0; i < this.hotSpotController.model.current['oeuvre'].length ; i++) {
/*			
			console.log('---------------------------------------------------');
			console.log("this.hotSpotController.model.current['oeuvre'][i]");
			console.log(this.hotSpotController.model.current['oeuvre'][i]);
			console.log("this.hotSpotController.model.current['oeuvre'][i]");
			console.log('---------------------------------------------------');
*/
 			currentArtWorkItem += "<span class='severalArtWorksItems'><img src='img/artwork/"+this.hotSpotController.model.current['oeuvre'][i]['image']+"' class='specificAndMultipe' id='"+this.hotSpotController.model.current['oeuvre'][i]['idOeuvre']+"' alt='' />";
			currentArtWorkItem += "<br/>";
			currentArtWorkItem += "<span>"+this.hotSpotController.model.current['oeuvre'][i]['textes']['FR']['titreOeuvre']+"</span>";
			currentArtWorkItem += "</span>";
//
		//this.hotSpotController.setItem(this.hotSpotController.model.current['oeuvre'][i]);
		//jQuery('.specificAndMultipe').bind('mousedown', console.log('YANN'));

//		jQuery('.severalArtWorksContainer').bind('mousedown', jQuery.proxy(this.onClickWork, this.hotSpotController.model.current['oeuvre'][i]['idOeuvre']));
//		jQuery('.specificAndMultipe').bind('mousedown', jQuery.proxy(this.onClickWork, this.hotSpotController.model.current['oeuvre'][i]['idOeuvre']));
//
		}

		jQuery('.specificAndMultipe').bind('mousedown', jQuery.proxy(this.onClickWork, this.hotSpotController.setItem(this.hotSpotController.model.current['oeuvre'][i])));

		currentContainer.append(currentArtWorkItem);
		//this.controller.setCurrent(Repository.WORKS_ID);

	} else {
				
		this.hotSpotController.setItem(this.hotSpotController.model.current['oeuvre']);

		this.controller.setCurrent(Repository.DETAIL_ID);
	}

};



ContentWorksView.prototype.disableView = function(){
	console.log("ContentWorksView.prototype.disableView = function()");
	//disable events
	jQuery('#artworksinfos').unbind('mousedown', jQuery.proxy(this.onClickTools, this));
	jQuery('.slideBGArtworks img').unbind('mousedown', jQuery.proxy(this.onClickWork, this));
	jQuery('.planButton').unbind('mousedown', jQuery.proxy(this.onBackToMap,this)); 



	if(this.hotSpotController.model.current) {

		jQuery('.severalArtWorksContainer').bind('mousedown', jQuery.proxy(this.onClickWork, this));
		//jQuery('.severalArtWorksContainer').bind('mousedown', jQuery.proxy(this.onClickWork, this.hotSpotController.model.current));	
	}
	




};


ContentWorksView.prototype.onClickTools = function(){
	console.log("ContentWorksView.prototype.onClickTools = function()");
	this.controller.setHistoryId(Repository.WORKS_ID);
	this.controller.setCurrent(Repository.TOOLS_ID);
};

ContentWorksView.prototype.onClickWork = function(tag){
	console.log("ContentWorksView.prototype.onClickWork = function(tag)");
/*	
	console.log("$('#'tag.target.id");
	console.log(tag.target.id);
	console.log("$('#'tag.target.id");
*/
	for (var i = 0; i < jQuery(hotSpotController.model.scope).length; i++) {
    	
    	if(hotSpotController.model.scope[i] != undefined){

    		if(hotSpotController.model.scope[i]['oeuvre'].length > 1) {
    			for (var j = 0; j < hotSpotController.model.scope[i]['oeuvre'].length; j++) {

		        	if(hotSpotController.model.scope[i]['oeuvre'][j]['idOeuvre'] == tag.target.id){

		        		hotSpotController.setItem(hotSpotController.model.scope[i]['oeuvre'][j]);
//		        		console.log(hotSpotController.model.scope[i]['oeuvre'][j]);

		        		hotSpotController.setCurrent(Repository.DETAIL_ID);
		        	} 

    			}
    		}
    	}
    }

	// ON ne bindera plus sur l'image mais sur le contenu généré dans display item via le json
	// au bind d'un element, il faudra enregistrer la valeur d'une oeuvre dans item de hotspotcontroller, 
	// et rediriger vers detail view 

	this.controller.setCurrent(Repository.DETAIL_ID);
};

ContentWorksView.prototype.checkLang = function(){
	console.log("ContentWorksView.prototype.checkLang = function()");
	//var lang = Cookie.getCookie('lang.curtius.com');
	var lang = globalLangVar;

    if(lang == "fr") {
		jQuery('.planButton').html(Internationalization.PlanBtnfr);
	    jQuery('#artItemsTitle').html(Internationalization.ArtItemTitlefr);    
    } else if(lang == "eng") {
		jQuery('.planButton').html(Internationalization.PlanBtneng);
	    jQuery('#artItemsTitle').html(Internationalization.ArtItemTitleeng);       
    } else if(lang == "ned") {
		jQuery('.planButton').html(Internationalization.PlanBtnned);
	    jQuery('#artItemsTitle').html(Internationalization.ArtItemTitlened);  
    } else if(lang == "deu") {
		jQuery('.planButton').html(Internationalization.PlanBtndeu);
	    jQuery('#artItemsTitle').html(Internationalization.ArtItemTitledeu);
    }
    /* 	
    jQuery('#planButton').html(eval('Internationalization.PlanBtn'+lang));
    jQuery('#artItemsTitle').html(eval('Internationalization.ArtItemTitle'+lang));
    */

};

ContentWorksView.prototype.onBackToMap = function() {
	console.log("ContentWorksView.prototype.onBackToMap = function()");
    this.controller.setCurrent(Repository.MAP_ID);
};

ContentWorksView.prototype.keyWords = function(){
	console.log("ContentWorksView.prototype.keyWords = function()");
    //var lang = Cookie.getCookie('lang.curtius.com');
	$('.keywordPopup').remove();
    var lang = globalLangVar;
    $.ajax({    
        url: 'keyword'+lang+'.json',
        dataType: 'json',
        timeout: 5000,
        success: function(data, status) {
            $.each(data, function(i, item) { 
                if($('#wrapper:contains('+item.keyword+')')){
                    $("em").highlight(''+item.keyword+'', { element: 'a', className: 'open-popup-link keyword '+item.keyword+'', wordsOnly: true});
                    $('body a.'+item.keyword+'').attr({ href: '#'+item.keyword+'' });
                    $('#wrapper').append('<div class="keywordPopup white-popup mfp-hide" id="'+item.keyword+'">'+item.keytext+'</div>');
                }
            });
        },
        error: function() {
            console.log('There was an error loading the data.');
        }
    });

};

ContentWorksView.prototype.popUp = function(){
	console.log("ContentWorksView.prototype.popUp = function()");
    $('.open-popup-link').magnificPopup({
      type:'inline',
      removalDelay: 300,

      // Class that is added to popup wrapper and background
      // make it unique to apply your CSS animations just to this exact popup
      mainClass: 'mfp-fade',
      midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
};