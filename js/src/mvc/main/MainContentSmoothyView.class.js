function MainContentSmoothyView(){
	
}

MainContentSmoothyView.prototype = new MainContentView();

MainContentSmoothyView.prototype.show = function(){
	if(this.tag.css('display','none'))
		this.tag.fadeIn('fast');
};

MainContentSmoothyView.prototype.hide = function(){
	if(this.tag.css('display','block'))
		this.tag.css('display','none');
};