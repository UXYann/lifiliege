function ContentToolsView(){
	
}

ContentToolsView.prototype = new MainContentSmoothyView();

ContentToolsView.prototype.init = function(tag,e){
	MainContentView.prototype.init.call(this,tag);
	this.currentLangage = "";
	this.newLangage = "";
	this.valideBtn = this.tag.find('#toolsValidate .validate');
};

ContentToolsView.prototype.onCurrentUpdated = function(e){

	MainContentView.prototype.onCurrentUpdated.call(this);

	if(this.controller.model.current == this.id){

		//this.currentLangage = Cookie.getCookie('lang.curtius.com');
		this.currentLangage = globalLangVar;
		jQuery('.lang').parent().removeClass('paramSelected');
		jQuery('.lang').each(jQuery.proxy(function(index,element){
			if(jQuery(element).attr('id') == this.currentLangage){
				jQuery(element).parent().addClass('paramSelected');
			}
		},this));
		this.newLangage = this.currentLangage;
		this.checkLang();
		this.enableView();
		this.keyWords();
		window.setTimeout(this.popUp, 200);
	}else{
		this.disableView();
		this.currentLangage = "";
		this.newLangage = "";
	}

};

ContentToolsView.prototype.enableView = function(){

	jQuery('.lang').bind('mousedown', jQuery.proxy(this.onClickParam, this));
	this.valideBtn.bind('mousedown', jQuery.proxy(this.onClickValidate, this));
};

ContentToolsView.prototype.disableView = function(){
	jQuery('.lang').unbind('mousedown', jQuery.proxy(this.onClickParam, this));
	this.valideBtn.unbind('mousedown', jQuery.proxy(this.onClickValidate, this));
};

ContentToolsView.prototype.onClickParam = function(e){
	jQuery('.lang').parent().removeClass('paramSelected');
	jQuery(e.currentTarget).parent().addClass('paramSelected');
	this.newLangage = jQuery(e.currentTarget).attr('id');
};

ContentToolsView.prototype.onClickValidate = function(e){
		//Cookie.setCookie('lang.curtius.com',this.newLangage,'365');
		globalLangVar = this.newLangage;
		var redirectBack = this.controller.model.historyId;
		this.controller.model.setHistoryId(null);
		this.controller.setCurrent(redirectBack);
};

ContentToolsView.prototype.checkLang = function(){
	//var lang = Cookie.getCookie('lang.curtius.com');
	var lang = globalLangVar;
	if(lang == "fr") {
		jQuery('#toolsValidate .validate').html(Internationalization.ToolsBtnValidatefr);
		jQuery('#toolsHeadband').html(Internationalization.ToolsChooseLangfr);
		jQuery('.resetCancel').html(Internationalization.ToolsResetCancelfr);
		jQuery('.resetApp').html(Internationalization.ToolsResetAppfr);
		jQuery('.resetTitle').html(Internationalization.ToolsResetTitlefr);
		jQuery('.resetText').html(Internationalization.ToolsResetTextfr);
	} else if (lang == "eng") {
		jQuery('#toolsValidate .validate').html(Internationalization.ToolsBtnValidateeng);
		jQuery('#toolsHeadband').html(Internationalization.ToolsChooseLangeng);
		jQuery('.resetCancel').html(Internationalization.ToolsResetCanceleng);
		jQuery('.resetApp').html(Internationalization.ToolsResetAppeng);
		jQuery('.resetTitle').html(Internationalization.ToolsResetTitleeng);
		jQuery('.resetText').html(Internationalization.ToolsResetTexteng);
	} else if (lang == "ned") {
		jQuery('#toolsValidate .validate').html(Internationalization.ToolsBtnValidatened);
		jQuery('#toolsHeadband').html(Internationalization.ToolsChooseLangned);
		jQuery('.resetCancel').html(Internationalization.ToolsResetCancelned);
		jQuery('.resetApp').html(Internationalization.ToolsResetAppned);
		jQuery('.resetTitle').html(Internationalization.ToolsResetTitlened);
		jQuery('.resetText').html(Internationalization.ToolsResetTextned);		
	} else if (lang == "deu") {
		jQuery('#toolsValidate .validate').html(Internationalization.ToolsBtnValidatedeu);
		jQuery('#toolsHeadband').html(Internationalization.ToolsChooseLangdeu);
		jQuery('.resetCancel').html(Internationalization.ToolsResetCanceldeu);
		jQuery('.resetApp').html(Internationalization.ToolsResetAppdeu);
		jQuery('.resetTitle').html(Internationalization.ToolsResetTitledeu);
		jQuery('.resetText').html(Internationalization.ToolsResetTextdeu);		
	}
};

ContentToolsView.prototype.keyWords = function(){
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

ContentToolsView.prototype.popUp = function(){
    $('.open-popup-link').magnificPopup({
      type:'inline',
      removalDelay: 300,

      // Class that is added to popup wrapper and background
      // make it unique to apply your CSS animations just to this exact popup
      mainClass: 'mfp-fade',
      midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
};