function MainController(){}

MainController.prototype.model = "";

MainController.prototype.init = function(){
	console.log("MainController.prototype.init = function()");
	this.createModel();
};

MainController.prototype.createModel = function(){
	console.log("MainController.prototype.createModel = function()");
	this.model = new MainModel();
};

MainController.prototype.goNext = function(current) {
	console.log("MainController.prototype.goNext = function(current)");
	var index = jQuery.inArray(this.model.current, this.model.scope);
	this.model.setCurrent(this.model.scope[(index+1)%this.model.scope.length]);
};

MainController.prototype.setCurrent = function(current) {
	console.log("MainController.prototype.setCurrent = function(current)");
	if(this.model == undefined) return;
	if(this.model.current !== current){
		this.model.setCurrent(current);
	}
};

MainController.prototype.setHistoryId = function(historyId) {
	console.log("MainController.prototype.setHistoryId = function(historyId)");
	if(this.model == undefined) return;
	if(this.model.historyId !== historyId){
		this.model.setHistoryId(historyId);
	}
};

MainController.prototype.setScope = function(scope){
	console.log("MainController.prototype.setScope = function(scope)");
	this.model.setScope(scope);
};

MainController.prototype.goPrevious = function() {
	console.log("MainController.prototype.goPrevious = function()");
	var scope = this.model.scope;
	var index = jQuery.inArray(this.model.current, scope);
	this.setCurrent(scope[(index-1+scope.length)%scope.length]);
};

MainController.prototype.goNext = function() {
	console.log("MainController.prototype.goNext = function()");
	var scope = this.model.scope;
	var index = jQuery.inArray(this.model.current, scope);
	this.setCurrent(scope[(index+1)%scope.length]);
};
