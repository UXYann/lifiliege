function ContentWorkingView(){

}

ContentWorkingView.prototype = new MainContentSmoothyView();

ContentWorkingView.prototype.init = function(tag){
    console.log("ContentWorkingView.prototype.init = function(tag)");
    MainContentView.prototype.init.call(this, tag);
	this.tag = jQuery(tag);
};

ContentWorkingView.prototype.onCurrentUpdated = function(){
    console.log("ContentWorkingView.prototype.onCurrentUpdated = function()");
    MainContentView.prototype.onCurrentUpdated.call(this);

    if(this.controller.model.current == this.id){
    	this.enableView();
    }else{
        this.disableView();
    }
};

ContentWorkingView.prototype.enableView = function(){
    console.log("ContentWorkingView.prototype.enableView = function()");
    this.checkLang();
    this.keyWords();
    window.setTimeout(this.popUp, 200);
    jQuery('#lifiNext').bind('mousedown', jQuery.proxy(this.onClick, this));
};


ContentWorkingView.prototype.disableView = function(){
    console.log("ContentWorkingView.prototype.disableView = function()");
    jQuery('#lifiNext').unbind('mousedown', jQuery.proxy(this.onClick, this));  
};

ContentWorkingView.prototype.onClick = function(){
    console.log("ContentWorkingView.prototype.onClick = function()");
    this.controller.setCurrent(Repository.MAP_ID);
};

ContentWorkingView.prototype.checkLang = function(){
    console.log("ContentWorkingView.prototype.checkLang = function()");
//    var lang = Cookie.getCookie('lang.curtius.com');
    var lang = globalLangVar;
    // Lifi Explanation

    if(lang == "fr") {
        jQuery('#lifiTitle').html(Internationalization.LifiExpTitlefr);
        jQuery('#lifiSubtitle').html(Internationalization.LifiExpSubTitlefr);
        jQuery('#lifiStep1').html(Internationalization.LifiExpStep1fr);
        jQuery('#lifiStep2').html(Internationalization.LifiExpStep2fr);
        jQuery('#lifiTxt1').html(Internationalization.LifiTxt1fr);
        jQuery('#lifiTxt2').html(Internationalization.LifiTxt2fr);
        jQuery('#lifiTxt3').html(Internationalization.LifiTxt3fr);
        jQuery('#lifiNext').html(Internationalization.LifiBtnNextfr);      
    } else if(lang == "eng") {
        jQuery('#lifiTitle').html(Internationalization.LifiExpTitleeng);
        jQuery('#lifiSubtitle').html(Internationalization.LifiExpSubTitleeng);
        jQuery('#lifiStep1').html(Internationalization.LifiExpStep1eng);
        jQuery('#lifiStep2').html(Internationalization.LifiExpStep2eng);
        jQuery('#lifiTxt1').html(Internationalization.LifiTxt1eng);
        jQuery('#lifiTxt2').html(Internationalization.LifiTxt2eng);
        jQuery('#lifiTxt3').html(Internationalization.LifiTxt3eng);
        jQuery('#lifiNext').html(Internationalization.LifiBtnNexteng);         
    } else if(lang == "ned") {
        jQuery('#lifiTitle').html(Internationalization.LifiExpTitlened);
        jQuery('#lifiSubtitle').html(Internationalization.LifiExpSubTitlened);
        jQuery('#lifiStep1').html(Internationalization.LifiExpStep1ned);
        jQuery('#lifiStep2').html(Internationalization.LifiExpStep2ned);
        jQuery('#lifiTxt1').html(Internationalization.LifiTxt1ned);
        jQuery('#lifiTxt2').html(Internationalization.LifiTxt2ned);
        jQuery('#lifiTxt3').html(Internationalization.LifiTxt3ned);
        jQuery('#lifiNext').html(Internationalization.LifiBtnNextned);   
    } else if(lang == "deu") {
        jQuery('#lifiTitle').html(Internationalization.LifiExpTitledeu);
        jQuery('#lifiSubtitle').html(Internationalization.LifiExpSubTitledeu);
        jQuery('#lifiStep1').html(Internationalization.LifiExpStep1deu);
        jQuery('#lifiStep2').html(Internationalization.LifiExpStep2deu);
        jQuery('#lifiTxt1').html(Internationalization.LifiTxt1deu);
        jQuery('#lifiTxt2').html(Internationalization.LifiTxt2deu);
        jQuery('#lifiTxt3').html(Internationalization.LifiTxt3deu);
        jQuery('#lifiNext').html(Internationalization.LifiBtnNextdeu); 
    } 
    /*   
    jQuery('#lifiTitle').html(eval('Internationalization.LifiExpTitle'+lang));
    jQuery('#lifiSubtitle').html(eval('Internationalization.LifiExpSubTitle'+lang));
    jQuery('#lifiStep1').html(eval('Internationalization.LifiExpStep1'+lang));
    jQuery('#lifiStep2').html(eval('Internationalization.LifiExpStep2'+lang));
    jQuery('#lifiTxt1').html(eval('Internationalization.LifiTxt1'+lang));
    jQuery('#lifiTxt2').html(eval('Internationalization.LifiTxt2'+lang));
    jQuery('#lifiTxt3').html(eval('Internationalization.LifiTxt3'+lang));
    jQuery('#lifiNext').html(eval('Internationalization.LifiBtnNext'+lang));
    */
};

ContentWorkingView.prototype.keyWords = function(){
    console.log("ContentWorkingView.prototype.keyWords = function()");
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

ContentWorkingView.prototype.popUp = function(){
    console.log("ContentWorkingView.prototype.popUp = function()");
    $('.open-popup-link').magnificPopup({
      type:'inline',
      removalDelay: 300,

      // Class that is added to popup wrapper and background
      // make it unique to apply your CSS animations just to this exact popup
      mainClass: 'mfp-fade',
      midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
};