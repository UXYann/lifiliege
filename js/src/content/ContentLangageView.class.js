function ContentLangageView(){
	
}

ContentLangageView.prototype = new MainContentSmoothyView();

ContentLangageView.prototype.init = function(tag){
	MainContentView.prototype.init.call(this, tag);
	this.tag = jQuery(tag);
	this.listButtons = jQuery(".langs .chooseSquare .lang");	
};

ContentLangageView.prototype.onCurrentUpdated = function(){
	MainContentView.prototype.onCurrentUpdated.call(this);
	if(this.controller.model.current == this.id){
		this.enableView();
	}else{
		this.disableView();
	}
};

ContentLangageView.prototype.enableView = function(){
//events
	this.listButtons.bind('mousedown', jQuery.proxy(this.onClick, this));
};

ContentLangageView.prototype.disableView = function(){
	this.listButtons.unbind('mousedown', jQuery.proxy(this.onClick, this));
};

ContentLangageView.prototype.onClick = function(e){
	switch(jQuery(e.currentTarget).attr('id')){
		case 'fr':
			//Cookie.setCookie('lang.curtius.com','fr','365');
			var lang = "fr";
			globalLangVar = "fr";
			jQuery('html').removeClass('langENG, langNED, langDEU');
		    jQuery('html').addClass('langFR');
		    jQuery('.lang').parent().removeClass('paramSelected');
		    jQuery('.fr').parent().addClass('paramSelected');
		break;
		case 'eng':
			//Cookie.setCookie('lang.curtius.com','eng','365');
			var lang = "eng";
			globalLangVar = "eng";
	        jQuery('html').removeClass('langFR, langNED, langDEU');
	        jQuery('html').addClass('langENG');
	        jQuery('.lang').parent().removeClass('paramSelected');
	        jQuery('.eng').parent().addClass('paramSelected');
		break;
		case 'ned':
			//Cookie.setCookie('lang.curtius.com','ned','365');
			var lang = "ned";
			globalLangVar = "ned";
	        jQuery('html').removeClass('langFR, langENG, langDEU');
	        jQuery('html').addClass('langNED');
	        jQuery('.lang').parent().removeClass('paramSelected');
	        jQuery('.ned').parent().addClass('paramSelected');
		break;
		case 'deu':
			//Cookie.setCookie('lang.curtius.com','deu','365');
			var lang = "deu";
			globalLangVar = "deu";			
	        jQuery('html').removeClass('langFR, langENG, langNED');
	        jQuery('html').addClass('langDEU');
	        jQuery('.lang').parent().removeClass('paramSelected');
	        jQuery('.deu').parent().addClass('paramSelected');
		break;
	}
	this.controller.setCurrent(Repository.PAGE2_ID);
};
