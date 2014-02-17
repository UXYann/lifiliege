function HotSpotController(){
	this.model = undefined;
}

HotSpotController.prototype.destroy = function(){
	console.log("HotSpotController.prototype.destroy = function()");
	if(this.model !== undefined){
		this.model.destroy();
		this.model = null;
	}
};

HotSpotController.prototype.init = function(){
	console.log("HotSpotController.prototype.init = function()");
	this.model = new HotSpotModel();
};

//current
HotSpotController.prototype.setCurrent = function(current){
	console.log("HotSpotController.prototype.setCurrent = function(current)");

	if(this.model == undefined)
		return;
	if(this.model.current !== current)
		this.model.setCurrent(current);
};
//scope
HotSpotController.prototype.setScope = function(scope){
	console.log("HotSpotController.prototype.setScope = function(scope)");
	this.model.setScope(scope);
};
//state
HotSpotController.prototype.setState = function(state){
	console.log("HotSpotController.prototype.setState = function(state)");
	if(this.model == undefined)
		return;
	if(this.model.state !== state)
		this.model.setState(state);
};

//curent
HotSpotController.prototype.setItem = function(item){
	console.log("HotSpotController.prototype.setItem = function(item)");
	if(this.model == undefined)
		return;
	if(this.model.item !== item)
		this.model.setItem(item);
};