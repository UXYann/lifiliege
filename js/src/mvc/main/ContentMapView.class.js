
function ContentMapView(){

}

ContentMapView.prototype = new MainContentSmoothyView();

ContentMapView.prototype.init = function(tag){
	console.log("ContentMapView.prototype.init = function(tag)");
	MainContentView.prototype.init.call(this, tag);
	//dom/var
	this.tag = jQuery(tag);
	this.coordRDC = [];
	this.coord1 = [];
	this.coord2 = [];
	this.position = '';
	this.positionArray = '';
	this.zoomContainer = jQuery('#zoom_container');
    this.level = jQuery('.level');
    this.levels = jQuery('#levels');
    this.legend2 = jQuery('#legend2');
    this.legend3 = jQuery('#legend3');
    this.legend4 = jQuery('#legend4');
    this.legend5 = jQuery('#legend5');
    this.currentPositionData = "";
    this.lastPositionData = "";
    this.floorHeadBand = jQuery('#floorHeadBand');
	//this.displayingMap();

	jQuery(this.hotSpotController.model).bind(HotSpotEvent.ON_CURRENT_UPDATED, jQuery.proxy(this.onDataUpdated, this));	
};


ContentMapView.prototype.onCurrentUpdated = function(){
	console.log("ContentMapView.prototype.onCurrentUpdated = function()");
	MainContentView.prototype.onCurrentUpdated.call(this);
	if(this.controller.model.current == this.id){
	    this.checkLang();
		this.enableView();
	}else{
		this.disableView();
	}

};

ContentMapView.prototype.enableView = function(){
	console.log("ContentMapView.prototype.enableView = function()");
	this.initCoordonates();
	//this.populateMapRDC();
	window.setTimeout(jQuery.proxy(this.addingSpotLights, this), 100);
	this.addingClicksFeatures();
	this.checkStage();
	window.setTimeout(jQuery.proxy(this.localize,this), 250);
	window.setTimeout(jQuery.proxy(this.addingSpotInteraction,this), 100);
};

ContentMapView.prototype.disableView = function(){
	console.log("ContentMapView.prototype.disableView = function()");
	window.clearTimeout(jQuery.proxy(this.addingSpotLights, this), 100);
	this.removeClicksFeatures();
	window.clearTimeout(jQuery.proxy(this.localize,this), 250);
	window.clearTimeout(jQuery.proxy(this.addingSpotInteraction,this), 100);
	this.destroyCoordonates();	
};

/*
* ONDATAUPDATED : à chaque fois que nous reçevons un nouvel id de Lifi
*/
//ondataupdated : quand les données du lifi on changé
ContentMapView.prototype.onDataUpdated = function(){
	console.log("ContentMapView.prototype.onDataUpdated = function()");
	//Récupération de la data courante pour évaluer la position courante
	this.currentPositionData = this.hotSpotController.model.current;

	//Si nous sommes actuellement sur la vue map et seulement dans ce cas alors
	//Renvoie sur une page selon le type de contenu
	if(this.controller.model.current == this.id){
		if(this.hotSpotController.model.current['oeuvre'].length > 1){
			this.controller.setCurrent(Repository.WORKS_ID);
		} else {
			//Si il n'y a qu'une seule oeuvre, on l'enregistre dans la variable item de hotspotcontroller
			// va servir pour la vue detail, qui ne gère qu'un seul item venant de la map, 
			// ou d'un clique depuis la page de plusieurs oeuvres
			this.hotSpotController.setItem(this.hotSpotController.model.current['oeuvre']);
			this.controller.setCurrent(Repository.DETAIL_ID);
		}
	}

	//Evaluation de la data pour donner la dernière position courante	
	if(this.currentPositionData != "" && this.currentPositionData != null && this.currentPositionData != undefined){
		this.lastPositionData = this.currentPositionData;
	}
	this.checkStage();
};

ContentMapView.prototype.checkStage = function(){
	console.log("ContentMapView.prototype.checkStage = function()");

	if(this.lastPositionData != ""){
		switch(this.lastPositionData["etage"]){
			case 0:
				jQuery("#level1").mousedown();
			break;
			case 1:
				jQuery("#level2").mousedown();
			break;
			case 2:
				jQuery("#level3").mousedown();
			break;
		}
	}
};

ContentMapView.prototype.populateMapRDC = function(){
	console.log("ContentMapView.prototype.populateMapRDC = function()");
	// console.info('ContentMapView.prototype.populateMapRDC');
    for (var i = 1; i < this.coordRDC.length; i++) {
        jQuery('.landmarks').append('<div class="item mark"data-position="'+this.coordRDC[ i ]+'" data-show-at-zoom="0"><div class="lifiPointHolder" id="Lampe'+i+'"><div class="lifiPoint">'+i+'</div></div></div>');
    }
};

ContentMapView.prototype.populateMap1 = function(){
	console.log("ContentMapView.prototype.populateMap1 = function()");
	// console.info('ContentMapView.prototype.populateMap1');
	var floor1Num = "";
    for (var i = 1; i < this.coord1.length; i++) {
        floor1Num = i+parseInt(this.coordRDC.length)-1;
        jQuery('.landmarks').append('<div class="item mark" data-position="'+this.coord1[ i ]+'" data-show-at-zoom="0"><div class="lifiPointHolder" id="Lampe'+floor1Num+'"><div class="lifiPoint">'+floor1Num+'</div></div></div>');
    }
};

ContentMapView.prototype.populateMap2 = function(){
	console.log("ContentMapView.prototype.populateMap2 = function()");
	// console.info('ContentMapView.prototype.populateMap2');
	var floor2Num = "";
    for (var i = 1; i < this.coord2.length; i++) {
        floor2Num = i+parseInt(this.coordRDC.length)+parseInt(this.coord1.length)-1;
        jQuery('.landmarks').append('<div class="item mark" data-position="'+this.coord2[ i ]+'" data-show-at-zoom="0"><div class="lifiPointHolder" id="Lampe'+floor2Num+'"><div class="lifiPoint">'+floor2Num+'</div></div></div>');
    }
};

ContentMapView.prototype.addingSpotLights = function() {
	console.log("ContentMapView.prototype.addingSpotLights = function()");
	var markcount = jQuery('.landmarks').find(".mark").length;
    //Si il y a plusieurs marks, alors on affiche et positionne
    if(markcount > 2) {
        if(this.lastPositionData != ""){
        	jQuery('.landmarks').find(".mark:nth-child("+this.lastPositionData['mapNumber']+")").addClass("currentLifiPoint");
        }else{
        	//nécessaire ?
        	jQuery('.landmarks').find(".mark:nth-child("+0+")").addClass("currentLifiPoint");
        }
        
        jQuery('.currentLifiPoint').css('z-index','10000000000000');
        jQuery('.currentLifiPoint').prevAll('.mark').addClass('visitedLifiPoint');
        // Position de la prochaine borne (.nextLifiPoint)
        jQuery('.currentLifiPoint').next().addClass('nextLifiPoint');
    }
    else {
        jQuery('.landmarks').find(".mark:last-child").addClass("currentLifiPoint");

    }
     // Position de la dernière borne consultée (.currentLifiPoint)
        this.position = (jQuery('.currentLifiPoint').attr('data-position'));
        this.positionArray = this.position.split(',');

};

ContentMapView.prototype.localize = function () {
	console.log("ContentMapView.prototype.localize = function ()");
	// console.info('ContentMapView.prototype.localize');
    this.zoomContainer.smoothZoom('focusTo',{
        x: this.positionArray[0],
        y: this.positionArray[1],
        zoom: 150,
        speed: 4
    });
            
};

ContentMapView.prototype.displayingMap = function() {
	console.log("ContentMapView.prototype.displayingMap = function()");
	// console.info('ContentMapView.prototype.displayingMap');
    this.zoomContainer.smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({
        image_url: 'img/lvl0.png',
        responsive: false,
        responsive_maintain_ratio: true,
        max_WIDTH: '',
        max_HEIGHT: '',
        zoom_BUTTONS_SHOW: false,
        pan_BUTTONS_SHOW: false,
        zoom_MAX:'150',
        initial_ZOOM: '150',
        border_SIZE: 0
    });

};
    

ContentMapView.prototype.addingSpotInteraction = function() {
	console.log("ContentMapView.prototype.addingSpotInteraction = function()");
	// console.info('ContentMapView.prototype.addingSpotInteraction');
	jQuery('.visitedLifiPoint, .currentLifiPoint').bind('mousedown',jQuery.proxy(this.onSpotMouseDown, this));

};

ContentMapView.prototype.onSpotMouseDown = function(){
	console.log("ContentMapView.prototype.onSpotMouseDown = function()");
	// console.info('ContentMapView.prototype.onSpotMouseDown');
	//this.controller.setCurrent(Repository.WORKS_ID);
};

ContentMapView.prototype.removeClicksFeatures = function(){
	console.log("ContentMapView.prototype.removeClicksFeatures = function()");
	jQuery("#level1").unbind('mousedown', jQuery.proxy(this.onClickFeatures, this));
	jQuery("#level2").unbind('mousedown', jQuery.proxy(this.onClickFeatures, this));
	jQuery("#level3").unbind('mousedown', jQuery.proxy(this.onClickFeatures, this));
	jQuery("#localize").unbind('mousedown', jQuery.proxy(this.localize, this));
};

ContentMapView.prototype.addingClicksFeatures = function() {
	console.log("ContentMapView.prototype.addingClicksFeatures = function()");
	// console.info('ContentMapView.prototype.addingClicksFeatures')
	jQuery("#level1").bind('mousedown', jQuery.proxy(this.onClickFeatures, this));
	jQuery("#level2").bind('mousedown', jQuery.proxy(this.onClickFeatures, this));
	jQuery("#level3").bind('mousedown', jQuery.proxy(this.onClickFeatures, this));
	jQuery('#artworksinfosMap').bind('mousedown', jQuery.proxy(this.onClickTools, this));
	jQuery("#localize").bind('mousedown', jQuery.proxy(this.localize, this));

	for (var i = 0; i < this.coord1.length; i++) {
        jQuery('#lampe'+i).bind('mousedown', jQuery.proxy(this.onClickSpot, this));
    };
};

ContentMapView.prototype.onClickTools = function(){
	console("ContentMapView.prototype.onClickTools = function()");
	this.controller.setHistoryId(Repository.MAP_ID);
	this.controller.setCurrent(Repository.TOOLS_ID);
};
/*
ContentMapView.prototype.onClickSpot = function(){
	jQuery.getJSON('data.json', function(data) {
        $.each( data, function( key, val ) {
            console.log(data[0]);
            console.log(val);
            console.log(val.idLiFi);
            console.log(val.Oeuvre[0].idOeuvre);
            console.log(val.Oeuvre[0].FichierImage);
        });
    });
};
*/
ContentMapView.prototype.onClickFeatures = function(e){
	console.log("ContentMapView.prototype.onClickFeatures = function(e)");
	switch(jQuery(e.currentTarget).attr('id')){
		case 'level1':
			this.zoomContainer.smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
	            image_url: 'img/lvl0.png',
	            zoom_MAX:'150'
	        }); 
	        jQuery('.landmarks').empty();
	        if(this.coordRDC.length){
	            this.populateMapRDC();
	            $('#zoom_container').smoothZoom('refreshAllLandmarks');
	            //window.setTimeout(AddingCurrentPos, 50);
	            window.setTimeout(jQuery.proxy(this.addingSpotLights,this), 100);
	            window.setTimeout(jQuery.proxy(this.localize,this), 250);
	            //openTools();
	            window.setTimeout(jQuery.proxy(this.addingSpotInteraction,this), 100);
	        }
	        this.level.removeClass('levelSelected');
	        jQuery('#level1').addClass('levelSelected');
	        this.floorHeadBand.css('background-color','#B3B2B2'); 
	        this.levels.css('border-color','#B3B2B2');
	        this.legend2.find('.mapIcon').css({'background':'url("img/info.png") 0 0 no-repeat','top':'15px','left':'10px'}); 
	        this.legend3.css({'background':'url("img/info.png") 0 0 no-repeat','height':'80px','line-height':'80px','padding-top':'0'});
	        this.legend3.find('.mapIcon').css('background','url("img/shop.png") 0 0 no-repeat'); 
	        this.legend4.find('.mapIcon').css('background','url("img/cafe.png") 0 0 no-repeat'); 
	        this.legend5.find('.mapIcon').css('background','url("img/wc.png") 0 0 no-repeat'); 
	        this.checkLang();
		break;
		case 'level2':
	        this.zoomContainer.smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
	            image_url: 'img/lvl1.png',
	            zoom_MAX:'150'
	        }); 
	        jQuery('.landmarks').empty();
	        if(this.coord1.length){
	            this.populateMap1();
	            $('#zoom_container').smoothZoom('refreshAllLandmarks');
	            //window.setTimeout(AddingCurrentPos, 50);
	            window.setTimeout(jQuery.proxy(this.addingSpotLights,this), 100);
	            window.setTimeout(jQuery.proxy(this.localize,this), 250);
	            //openTools();
	            window.setTimeout(jQuery.proxy(this.addingSpotInteraction,this), 100);
	        }
	        this.level.removeClass('levelSelected');
	        jQuery('#level2').addClass('levelSelected');
	        this.floorHeadBand.css('background-color','#9bd3c3');
	        this.levels.css('border-color','#9bd3c3');
	        this.legend2.find('.mapIcon').css({'background':'url("img/mapIcons2.png") 0 -358px no-repeat','top':'33px','left':'5px'}); 
	        this.legend3.css({'background':'url("img/mapIcons2.png") 0 -158px no-repeat','height':'60px','line-height':'normal','padding-top':'20px'});
	        this.legend3.find('.mapIcon').css('background','url("img/mapIcons2.png") 0 -58px no-repeat'); 
	        this.legend4.find('.mapIcon').css('background','url("img/mapIcons2.png") 0 -108px no-repeat'); 
	        this.legend5.find('.mapIcon').css('background','url("img/mapIcons2.png") 0 -208px no-repeat');
	        this.checkLang();
		break;
		case 'level3':
			this.zoomContainer.smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
	            image_url: 'img/lvl2.png',
	            zoom_MAX:'150'
	        }); 
	        jQuery('.landmarks').empty();
	        if(this.coord2.length){
	            this.populateMap2();
	            $('#zoom_container').smoothZoom('refreshAllLandmarks');
	            //window.setTimeout(AddingCurrentPos, 50);
	            window.setTimeout(jQuery.proxy(this.addingSpotLights,this), 100);
	            window.setTimeout(jQuery.proxy(this.localize,this), 250);
	            //openTools();
	            window.setTimeout(jQuery.proxy(this.addingSpotInteraction,this), 100);
	        }
	        this.level.removeClass('levelSelected');
	        jQuery('#level3').addClass('levelSelected');
	        this.floorHeadBand.css('background-color','#EACA81'); 
	        this.levels.css('border-color','#EACA81');
	        this.legend2.find('.mapIcon').css({'background':'url("img/mapIcons2.png") 0 -358px no-repeat','top':'33px','left':'5px'}); 
	        this.legend3.css({'background':'url("img/mapIcons2.png") 0 -158px no-repeat','height':'60px','line-height':'normal','padding-top':'20px'});
	        this.legend3.find('.mapIcon').css('background','url("img/mapIcons2.png") 0 -58px no-repeat'); 
	        this.legend4.find('.mapIcon').css('background','url("img/mapIcons2.png") 0 -108px no-repeat'); 
	        this.legend5.find('.mapIcon').css('background','url("img/mapIcons2.png") 0 -208px no-repeat');
	        this.checkLang();
		break;		
	}
};

ContentMapView.prototype.destroyCoordonates = function(){
	console.log("ContentMapView.prototype.destroyCoordonates = function()");
	this.coordRDC = [];
	this.coord1 = [];
	this.coord2 = [];
};


ContentMapView.prototype.initCoordonates = function(){
	console.log("ContentMapView.prototype.initCoordonates = function()");

	//Cookie.setCookie('visit.curtius.com','per','365');
	var visit = globalVisitVar;
	// var visit = Cookie.getCookie('visit.curtius.com');
	var itemCoordRDC = 0;
	var itemCoord1 = 0;
	var itemCoord2 = 0;
	for(var i = 1; i< jQuery(this.hotSpotController.model.scope).length; i++){
		for(var j = 0; j < this.hotSpotController.model.scope[i].parcours.length; j++){
			if(this.hotSpotController.model.scope[i].parcours[j].parcoursType == visit){
				switch(this.hotSpotController.model.scope[i].etage){
					case 0:
						itemCoordRDC ++;
						this.coordRDC[itemCoordRDC] = this.hotSpotController.model.scope[i].coordinates;
					break;
					case 1:
						itemCoord1 ++;
						this.coord1[itemCoord1] = this.hotSpotController.model.scope[i].coordinates;
					break;
					case 2:
						itemCoord2 ++;
						this.coord2[itemCoord2] = this.hotSpotController.model.scope[i].coordinates;
					break;
				}
			}
		}
	}
};

ContentMapView.prototype.checkLang = function(){
	console.log("ContentMapView.prototype.checkLang = function()");
//	var lang = Cookie.getCookie('lang.curtius.com');
	var lang = globalLangVar;

    if(lang == "fr") {
	    jQuery('.legendBlock p').html(Internationalization.MapLegendfr);

	   if(jQuery('#level1').hasClass('levelSelected')){
	    	$('#legend2 span').html(Internationalization.MapLvl1Legend2fr);
	        $('#legend3 span').html(Internationalization.MapLvl1Legend3fr);
	        $('#legend4 span').html(Internationalization.MapLvl1Legend4fr);
	        $('#legend5 span').html(Internationalization.MapLvl1Legend5fr);
	    }
	    else{
	    	$('#legend2 span').html(Internationalization.MapLvlDefLegend2fr);
	        $('#legend3 span').html(Internationalization.MapLvlDefLegend3fr);
	        $('#legend4 span').html(Internationalization.MapLvlDefLegend4fr);
	        $('#legend5 span').html(Internationalization.MapLvlDefLegend5fr);
	    }
	    $('#legend1 span').html(Internationalization.MapLegend1fr);
	    $('#legend6 span').html(Internationalization.MapLegend6fr);
	    $('#legend7 span').html(Internationalization.MapLegend7fr);
	    $('#legend8 span').html(Internationalization.MapLegend8fr);
	    $('#legendBlock6 p').html(Internationalization.MapLegendBlockfr);
 
    } else if(lang == "eng") {
	    jQuery('.legendBlock p').html(Internationalization.MapLegendeng));

	   if(jQuery('#level1').hasClass('levelSelected')){
	    	$('#legend2 span').html(Internationalization.MapLvl1Legend2eng);
	        $('#legend3 span').html(Internationalization.MapLvl1Legend3eng);
	        $('#legend4 span').html(Internationalization.MapLvl1Legend4eng);
	        $('#legend5 span').html(Internationalization.MapLvl1Legend5eng);
	    }
	    else{
	    	$('#legend2 span').html(Internationalization.MapLvlDefLegend2eng);
	        $('#legend3 span').html(Internationalization.MapLvlDefLegend3eng);
	        $('#legend4 span').html(Internationalization.MapLvlDefLegend4eng);
	        $('#legend5 span').html(Internationalization.MapLvlDefLegend5eng);
	    }
	    $('#legend1 span').html(Internationalization.MapLegend1eng);
	    $('#legend6 span').html(Internationalization.MapLegend6eng);
	    $('#legend7 span').html(Internationalization.MapLegend7eng);
	    $('#legend8 span').html(Internationalization.MapLegend8eng);
	    $('#legendBlock6 p').html(Internationalization.MapLegendBlockeng);
   
    } else if(lang == "ned") {
	    jQuery('.legendBlock p').html(Internationalization.MapLegendned);
  
	   if(jQuery('#level1').hasClass('levelSelected')){
	    	$('#legend2 span').html(Internationalization.MapLvl1Legend2ned);
	        $('#legend3 span').html(Internationalization.MapLvl1Legend3ned);
	        $('#legend4 span').html(Internationalization.MapLvl1Legend4ned);
	        $('#legend5 span').html(Internationalization.MapLvl1Legend5ned);
	    }
	    else{
	    	$('#legend2 span').html(Internationalization.MapLvlDefLegend2ned);
	        $('#legend3 span').html(Internationalization.MapLvlDefLegend3ned);
	        $('#legend4 span').html(Internationalization.MapLvlDefLegend4ned);
	        $('#legend5 span').html(Internationalization.MapLvlDefLegend5ned);
	    }
	    $('#legend1 span').html(Internationalization.MapLegend1ned);
	    $('#legend6 span').html(Internationalization.MapLegend6ned);
	    $('#legend7 span').html(Internationalization.MapLegend7ned);
	    $('#legend8 span').html(Internationalization.MapLegend8ned);
	    $('#legendBlock6 p').html(Internationalization.MapLegendBlockned);

    } else if(lang == "deu") {
	    jQuery('.legendBlock p').html(Internationalization.MapLegenddeu));
	   if(jQuery('#level1').hasClass('levelSelected')){
	    	$('#legend2 span').html(Internationalization.MapLvl1Legend2deu);
	        $('#legend3 span').html(Internationalization.MapLvl1Legend3deu);
	        $('#legend4 span').html(Internationalization.MapLvl1Legend4deu);
	        $('#legend5 span').html(Internationalization.MapLvl1Legend5deu);
	    }
	    else{
	    	$('#legend2 span').html(Internationalization.MapLvlDefLegend2deu);
	        $('#legend3 span').html(Internationalization.MapLvlDefLegend3deu);
	        $('#legend4 span').html(Internationalization.MapLvlDefLegend4deu);
	        $('#legend5 span').html(Internationalization.MapLvlDefLegend5deu);
	    }
	    $('#legend1 span').html(Internationalization.MapLegend1deu);
	    $('#legend6 span').html(Internationalization.MapLegend6deu);
	    $('#legend7 span').html(Internationalization.MapLegend7deu);
	    $('#legend8 span').html(Internationalization.MapLegend8deu);
	    $('#legendBlock6 p').html(Internationalization.MapLegendBlockdeu);
    }

/*

    jQuery('.legendBlock p').html(eval('Internationalization.MapLegend'+lang));
    if(jQuery('#level1').hasClass('levelSelected')){
    	$('#legend2 span').html(eval('Internationalization.MapLvl1Legend2'+lang));
        $('#legend3 span').html(eval('Internationalization.MapLvl1Legend3'+lang));
        $('#legend4 span').html(eval('Internationalization.MapLvl1Legend4'+lang));
        $('#legend5 span').html(eval('Internationalization.MapLvl1Legend5'+lang));
    }
    else{
    	$('#legend2 span').html(eval('Internationalization.MapLvlDefLegend2'+lang));
        $('#legend3 span').html(eval('Internationalization.MapLvlDefLegend3'+lang));
        $('#legend4 span').html(eval('Internationalization.MapLvlDefLegend4'+lang));
        $('#legend5 span').html(eval('Internationalization.MapLvlDefLegend5'+lang));
    }
    $('#legend1 span').html(eval('Internationalization.MapLegend1'+lang));
    $('#legend6 span').html(eval('Internationalization.MapLegend6'+lang));
    $('#legend7 span').html(eval('Internationalization.MapLegend7'+lang));
    $('#legend8 span').html(eval('Internationalization.MapLegend8'+lang));
    $('#legendBlock6 p').html(eval('Internationalization.MapLegendBlock'+lang));
    */
};
