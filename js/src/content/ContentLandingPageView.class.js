function ContentLandingPageView(){

}

ContentLandingPageView.prototype = new MainContentSmoothyView();

ContentLandingPageView.prototype.destroy = function(){
	console.log("ContentLandingPageView.prototype.destroy = function()");

	// console.info('ContentLandingPageView.prototype.destroy');
	this.killCookie('lang.curtius.com', '365');
	this.killCookie('visit.curtius.com', '365');
};

ContentLandingPageView.prototype.init = function(tag){
	console.log("ContentLandingPageView.prototype.init = function(tag)");
	MainContentView.prototype.init.call(this, tag);
	// console.info('ContentLandingPageView.prototype.init');
	//dom/var
	this.tag = jQuery(tag);
	//functions init
	this.destroy();
	jQuery('#contentLanding').bind('mousedown', jQuery.proxy(this.onClick, this));
};

ContentLandingPageView.prototype.killCookie = function(cname,exdays){
	console.log("ContentLandingPageView.prototype.killCookie = function(cname,exdays)");
	// console.info('ContentLandingPageView.prototype.killCookie');	
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=; " + expires;	

};

ContentLandingPageView.prototype.onClick = function(){
	console.log("ContentLandingPageView.prototype.onClick = function()");
	this.controller.setCurrent(Repository.PAGE1_ID);
}