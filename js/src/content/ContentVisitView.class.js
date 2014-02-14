function ContentVisitView(){
	
}

ContentVisitView.prototype = new MainContentSmoothyView();

ContentVisitView.prototype.init = function(tag){
	MainContentView.prototype.init.call(this, tag);
	this.tag = jQuery(tag);
	this.listButtons = jQuery("#visits .chooseSquare .visit");
	//events
	
};

ContentVisitView.prototype.onClick = function(e){
	switch(jQuery(e.currentTarget).attr('id')){
		case 'free':
			globalVisitVar = "free";
			//Cookie.setCookie('visit.curtius.com','free','365');
		break;
		case 'fast':
			globalVisitVar = "fast";		
			//Cookie.setCookie('visit.curtius.com','fast','365');
		break;
		case 'per':
			globalVisitVar = "per";		
			//Cookie.setCookie('visit.curtius.com','per','365');
		break;
		case 'scol':
			globalVisitVar = "scol";	
			//Cookie.setCookie('visit.curtius.com','scol','365');
		break;
	}
	this.controller.setCurrent(Repository.PAGE3_ID);
};

ContentVisitView.prototype.onCurrentUpdated = function(){
	MainContentView.prototype.onCurrentUpdated.call(this);
	if(this.controller.model.current == this.id){	
		this.checkLang();
		this.enableView();
	}else{
		this.disableView();
	}
};

ContentVisitView.prototype.enableView = function(){
		this.listButtons.bind('mousedown', jQuery.proxy(this.onClick, this));
		jQuery('#backBtn').bind('mousedown', jQuery.proxy(this.onClickBack, this));
};

ContentVisitView.prototype.disableView = function(){
		this.listButtons.unbind('mousedown', jQuery.proxy(this.onClick, this));
		jQuery('#backBtn').unbind('mousedown', jQuery.proxy(this.onClickBack, this));
};

ContentVisitView.prototype.onClickBack = function(){
	this.controller.goPrevious();
};

ContentVisitView.prototype.checkLang = function(){
	//var lang = Cookie.getCookie('lang.curtius.com');
	/*$('#free').html(eval('Internationalization.VisitBtnFree'+lang));
    $('#fast').html(eval('Internationalization.VisitBtnFast'+lang));
    $('#per').html(eval('Internationalization.VisitBtnPer'+lang));
    $('#scol').html(eval('Internationalization.VisitBtnScol'+lang));	*/

    var lang = globalLangVar;
    if(lang == "fr") {
		$('#free').html(Internationalization.VisitBtnFreefr);
	    $('#fast').html(Internationalization.VisitBtnFastfr);
	    $('#per').html(Internationalization.VisitBtnPerfr);
	    $('#scol').html(Internationalization.VisitBtnScolfr);      	
    } else if(lang == "eng") {
		$('#free').html(Internationalization.VisitBtnFreeeng);
	    $('#fast').html(Internationalization.VisitBtnFasteng);
	    $('#per').html(Internationalization.VisitBtnPereng);
	    $('#scol').html(Internationalization.VisitBtnScoleng);      	
    } else if(lang == "ned") {
		$('#free').html(Internationalization.VisitBtnFreened);
	    $('#fast').html(Internationalization.VisitBtnFastned);
	    $('#per').html(Internationalization.VisitBtnPerned);
	    $('#scol').html(Internationalization.VisitBtnScolned);      
	} else if(lang == "deu") {
		$('#free').html(Internationalization.VisitBtnFreedeu);
	    $('#fast').html(Internationalization.VisitBtnFastdeu);
	    $('#per').html(Internationalization.VisitBtnPerdeu);
	    $('#scol').html(Internationalization.VisitBtnScoldeu);
	}
};