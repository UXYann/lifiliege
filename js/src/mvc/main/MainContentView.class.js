function MainContentView(){

}

MainContentView.prototype.tag = "";
MainContentView.prototype.controller = "";

MainContentView.prototype.init = function(tag){
	console.log("MainContentView.prototype.init = function(tag)");
	this.tag = jQuery(tag);
	jQuery(this.controller.model).bind((MainEvent.ON_CURRENT_UPDATED), jQuery.proxy(this.onCurrentUpdated, this));
};

MainContentView.prototype.onCurrentUpdated = function(){
	console.log("MainContentView.prototype.onCurrentUpdated = function()");
	if(this.controller.model.current === this.id){
		this.show();
	}else{
		this.hide();
	}
};

MainContentView.prototype.show = function(){
	console.log("MainContentView.prototype.show = function()");
	if(this.tag.css('display') == 'none'){
		this.tag.css('display','block');
	}
};

MainContentView.prototype.hide = function(){
	console.log("MainContentView.prototype.hide = function()");
	if(this.tag.css('display') == 'block'){
		this.tag.css('display','none');
	}
};