
	var urlToJson = 'data_proj.json';

	// MAIN CONTROLLER
	// Controller général qui va permettre de définir quelle vue est à afficher, 
	// selon le click sur un bouton ou au chargement de l'appli
	MainContentController.getInstance().setScope(
		new Array(
			Repository.LANDING_ID,
			Repository.PAGE1_ID,
			Repository.PAGE2_ID,
			Repository.PAGE3_ID,
			Repository.MAP_ID,
			Repository.WORKS_ID)
		);

	// HotSpotController
	// Controller qui va nous permettre de récupérer les data du json et du lifi, 
	//et d'envoyer des informations selon les mises à jour de celui-ci (onCurrentUpdated)
	var hotSpotController = new HotSpotController();
	hotSpotController.init();


	//Récupération du JSON
    $.getJSON(urlToJson,{
    	format:'json',
    })
      .done(function(data){
    	jQuery(data).each(jQuery.proxy(function(index,element){
			hotSpotController.model.scope[element['mapNumber']] = element;
    	},this));
    	// TEST EN CURRENT = 1
		//hotSpotController.setCurrent(hotSpotController.model.scope[1]);
    })
      .fail(function(){
		console.info('fail');
    });


    //Récupération du code lifi courant
/*
function parsingJsonFileFromMapNumber(currentValue,callback) {

		console.log("from Map Number");
    	for (var i = 1; i < jQuery(hotSpotController.model.scope).length; i++){
    	
    	if(hotSpotController.model.scope[i] != undefined){
        	if(hotSpotController.model.scope[i].mapNumber == currentValue){
        		hotSpotController.setCurrent(hotSpotController.model.scope[i]);
        		console.log(hotSpotController.setCurrent(hotSpotController.model.scope[i]));
			    callback();
        		return;
        	}	
    	}
    } 
}
*/

function parsingJsonFileFromMapNumber(currentValue,callback) {

		console.log("from Map Number");
    	for (var i = 1; i < jQuery(hotSpotController.model.scope).length; i++){
    	
    	if(hotSpotController.model.scope[i] != undefined){
        	if(hotSpotController.model.scope[i].mapNumber == currentValue){

        		hotSpotController.setCurrent(hotSpotController.model.scope[i]);
        		console.log(hotSpotController.setCurrent(hotSpotController.model.scope[i]));


			    if(this.hotSpotController.model.current) {
			        if(this.hotSpotController.model.current['oeuvre'].length > 1){

			        	console.log('There are severals');
			            hotSpotController.setCurrent(Repository.WORKS_ID);

			        } else {
			        	console.log('There is only ONE');

						hotSpotController.setCurrent(Repository.DETAIL_ID);
					}
				} 

	        		
			    callback();
        		return;
        	}	
    	}
    }    
}





function parsingJsonFile(currentValue,callback) {


    	for (var i = 1; i < jQuery(hotSpotController.model.scope).length; i++){

    	if(hotSpotController.model.scope[i] != undefined){
        	if(hotSpotController.model.scope[i].idLifi == currentValue){
        		hotSpotController.setCurrent(hotSpotController.model.scope[i]);
			    callback();
        		return;
        	}	
    	}
    } 
}

//var urlFile = '/sdcard/lifiID.txt';
var urlFile =  'test/lifiID.txt';

var currentLIFIIDToBeChecked = "";

function browsingJsonToFindLIFIID() {
	console.log("browsingJsonToFindLIFIID");

	if(jQuery(hotSpotController.model.scope).length != 0) {

    	var rawFile = new XMLHttpRequest();
        rawFile.open("GET", urlFile, true);
        rawFile.onreadystatechange = function () {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    var allTextArray = allText.split(" ");
                    var currentValue = allTextArray[0];

                    if(currentLIFIIDToBeChecked != currentValue) {
                    	currentLIFIIDToBeChecked = currentValue;
                    	console.log(currentValue);
                    	parsingJsonFile(currentValue,browsingJsonToFindLIFIID);
	                	setTimeout(function(){browsingJsonToFindLIFIID()},1000);
	                }  else {
	                	setTimeout(function(){browsingJsonToFindLIFIID()},1000);
	                }
                    //Recherche du code lifi correspondant dans notre tableau (scope), et mise à jour de la
                    //data courante de notre controleur

                }
            }
        }
        rawFile.send(null);
	}
}





//var didMyLiFiIDChanged = setInterval(function(){browsingJsonToFindLIFIID()},10000);
setTimeout(function(){browsingJsonToFindLIFIID()},1000);




    
    // VIEWS
	var contentLandingPageView = new ContentLandingPageView();
	//Ajout d'un id propre à la vue,
	//Permet de définir notamment le current du controller, et de faire des modifs sur une vue
	// seulement si cet id est égal au current du controller
	contentLandingPageView.id = Repository.LANDING_ID;
	//Ajout du controller General à ma vue
	contentLandingPageView.controller = MainContentController.getInstance();
	contentLandingPageView.init("#contentLanding");    	

	var contentLangageView = new ContentLangageView();
	contentLangageView.id = Repository.PAGE1_ID;
	contentLangageView.controller = MainContentController.getInstance();
	contentLangageView.init("#langage");    	

	var contentVisitView = new ContentVisitView();
	contentVisitView.id = Repository.PAGE2_ID;
	contentVisitView.controller = MainContentController.getInstance();
	contentVisitView.init("#visit");

	var contentWorkingView = new ContentWorkingView();
	contentWorkingView.id = Repository.PAGE3_ID;
	contentWorkingView.controller = MainContentController.getInstance();
	contentWorkingView.init("#howItWork");    	

	var contentMapView = new ContentMapView();
	contentMapView.id = Repository.MAP_ID;
	contentMapView.controller = MainContentController.getInstance();
	//Ajout du controller de data sur les views voulues
	contentMapView.hotSpotController = hotSpotController;
	contentMapView.init("#mapView");    	

	var contentWorksView = new ContentWorksView();
	contentWorksView.id = Repository.WORKS_ID;
	contentWorksView.controller = MainContentController.getInstance();
	contentWorksView.hotSpotController = hotSpotController;
	contentWorksView.init("#oeuvresView");    

	var contentDetailView = new ContentDetailView();
	contentDetailView.id = Repository.DETAIL_ID;
	contentDetailView.controller = MainContentController.getInstance();
	contentDetailView.hotSpotController = hotSpotController;
	contentDetailView.init("#contentDetail");

	var contentToolsView = new ContentToolsView();
	contentToolsView.id = Repository.TOOLS_ID;
	contentToolsView.controller = MainContentController.getInstance();
	contentToolsView.init("#tools");  

	//INIT WITH FIRST VIEW AS CURRENT
    MainContentController.getInstance().setCurrent(Repository.LANDING_ID);

