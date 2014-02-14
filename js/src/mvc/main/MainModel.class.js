function MainModel(){
	this.scope = [];
	this.totalCount = 0;
}


MainModel.prototype.current = "";
MainModel.prototype.scope = "";
MainModel.prototype.historyId = "";

MainModel.prototype.setCurrent = function(current) {
	this.current = current;
	jQuery(this).trigger(MainEvent.ON_CURRENT_UPDATED, this.current);
};

MainModel.prototype.setScope = function(scope) {
	this.scope = scope;
	jQuery(this).trigger(MainEvent.ON_SCOPE_UPDATED);
};

MainModel.prototype.setTotalCount = function(totalCount) {
	this.totalCount = totalCount;
	jQuery(this).trigger(MainEvent.ON_TOTAL_COUNT_UPDATED, this.totalCount);
};

MainModel.prototype.setHistoryId = function(historyId){
	this.historyId = historyId;
	jQuery(this).trigger(MainEvent.ON_HISTORY_UPDATED, this.historyId);
};