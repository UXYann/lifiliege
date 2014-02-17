function MainContentTransitionView(){

}

MainContentTransitionView.prototype = new MainContentView();

MainContentTransitionView.prototype.show = function(){
	console.log("MainContentTransitionView.prototype.show = function()");
	this.tag.unbind('webkitTransitionEnd', jQuery.proxy(this.onEndTransition, this));
	this.tag.removeClass('right');
	this.tag.addClass('center');

};

MainContentTransitionView.prototype.hide = function(){
	console.log("MainContentTransitionView.prototype.hide = function()");
		this.tag.removeClass('center');
		this.tag.addClass('left');
		this.tag.bind('webkitTransitionEnd', jQuery.proxy(this.onEndTransition, this));
		this.tag.children().unbind('webkitTransitionEnd', jQuery.proxy(this.onEndTransition, this));
};

MainContentTransitionView.prototype.onEndTransition = function(e){
	console.log("MainContentTransitionView.prototype.onEndTransition = function(e)");

	this.tag.removeClass('left');
	this.tag.addClass('right');
}