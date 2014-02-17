function MainContentController(){
	
}

MainContentController.prototype = new MainController();

MainContentController.instance = "";

MainContentController.getInstance = function() {
	console.log("MainContentController.getInstance = function()");
	if (MainContentController.instance == "")
	{
		var instance = new MainContentController();
		instance.init();
		MainContentController.instance = instance;
	}
	return MainContentController.instance;
};
