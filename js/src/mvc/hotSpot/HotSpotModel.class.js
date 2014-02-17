function HotSpotModel(){
	console.log("function HotSpotModel()");

	this.scope = [];
	this.current = undefined;
	this.state = undefined;
	this.item = undefined;
}

HotSpotModel.prototype.destroy = function(){
	console.log("HotSpotModel.prototype.destroy = function()");
	jQuery(this).unbind(HotSpotEvent.ON_CURRENT_UPDATED);
	jQuery(this).unbind(HotSpotEvent.ON_SCOPE_UPDATED);
	jQuery(this).unbind(HotSpotEvent.ON_STATE_UPDATED);
	jQuery(this).unbind(HotSpotEvent.ON_ITEM_UPDATED);
};

HotSpotModel.prototype.setCurrent = function(current){
	console.log("HotSpotModel.prototype.setCurrent = function(current)");
	this.current = current;
	jQuery(this).trigger(HotSpotEvent.ON_CURRENT_UPDATED);
};

HotSpotModel.prototype.setScope = function(scope){
	console.log("HotSpotModel.prototype.setScope = function(scope)");
	this.scope = scope;
	jQuery(this).trigger(HotSpotEvent.ON_SCOPE_UPDATED);
};

HotSpotModel.prototype.setState = function(state) {
	console.log("HotSpotModel.prototype.setState = function(state)");
	this.state = state;
	jQuery(this).trigger(HotSpotEvent.ON_STATE_UPDATED, this.state);
};

HotSpotModel.prototype.setItem = function(item){
	console.log("HotSpotModel.prototype.setItem = function(item)");
	this.item = item;
	jQuery(this).trigger(HotSpotEvent.ON_ITEM_UPDATED);
};