function ContentDetailView(){

}

ContentDetailView.prototype = new MainContentSmoothyView();

ContentDetailView.prototype.init = function(tag){
    console.log("ContentDetailView.prototype.init = function(tag)");
    MainContentView.prototype.init.call(this,tag);
    this.tag = jQuery(tag);
    /*init data to change by json*/
    this.artworkTitle = this.tag.find('.artworkTitle span');
    this.artworkDetail = this.tag.find('#artworkDetail');
    this.artworkLink = this.tag.find('#artworkLinks');
    this.detailButton = jQuery('#detailButton');
    this.linkedArtworksButton = jQuery('#linkedArtworksButton');
    this.displayingSVG();
    this.displayingArtImage();
};


ContentDetailView.prototype.onCurrentUpdated = function(){
    console.log("ContentDetailView.prototype.onCurrentUpdated = function()");
    MainContentView.prototype.onCurrentUpdated.call(this);
    if(this.controller.model.current == this.id){
        this.checkLang();
        this.enableView();
        this.keyWords();
        window.setTimeout(this.popUp, 200);
    }else{
        this.disableView();
    }
};

ContentDetailView.prototype.enableView = function(){
    console.log("ContentDetailView.prototype.enableView = function()");
    //events
    this.detailButton.bind('mousedown', jQuery.proxy(this.onClickedDetail, this));
    this.linkedArtworksButton.bind('mousedown', jQuery.proxy(this.onClickedLinkedArt, this));
    jQuery('#zoomLauncher').bind('mousedown', jQuery.proxy(this.onZoomLauncher,this));
    jQuery('.zoomBack, .si-icon-maximize-rotate svg').bind('mousedown', jQuery.proxy(this.onZoomBack,this));
    jQuery('.si-icon-hamburger-cross, .si-icon-hamburger-cross2').bind('mousedown', jQuery.proxy(this.onClickIcon, this));
    jQuery('.planButton2').bind('mousedown', jQuery.proxy(this.onBackToMap,this));
    jQuery('#artworkinfos').bind('mousedown', jQuery.proxy(this.onClickTools, this));

    jQuery(this.hotSpotController.model).bind(HotSpotEvent.ON_CURRENT_UPDATED, jQuery.proxy(this.onDataUpdated, this));
    this.displayItem();
    window.setTimeout(jQuery.proxy(this.svgColor,this), 100);
};

ContentDetailView.prototype.disableView = function(){
    console.log("ContentDetailView.prototype.disableView = function()");
    //events
    this.detailButton.unbind('mousedown', jQuery.proxy(this.onClickedDetail, this));
    this.linkedArtworksButton.unbind('mousedown', jQuery.proxy(this.onClickedLinkedArt, this));
    jQuery('#zoomLauncher').unbind('mousedown', jQuery.proxy(this.onZoomLauncher,this));
    jQuery('.zoomBack, .si-icon-maximize-rotate svg').unbind('mousedown', jQuery.proxy(this.onZoomBack,this));
    jQuery('.si-icon-hamburger-cross, .si-icon-hamburger-cross2').unbind('mousedown', jQuery.proxy(this.onClickIcon, this));
    jQuery('.planButton2').unbind('mousedown', jQuery.proxy(this.onBackToMap,this));
    jQuery('#artworkinfos').unbind('mousedown', jQuery.proxy(this.onClickTools, this));    
    jQuery(this.hotSpotController.model).unbind(HotSpotEvent.ON_CURRENT_UPDATED, jQuery.proxy(this.onDataUpdated, this));

    window.clearTimeout(jQuery.proxy(this.svgColor,this), 100);
};


//ondataupdated : quand les données du lifi on changé
ContentDetailView.prototype.onDataUpdated = function(){
    console.log("ContentDetailView.prototype.onDataUpdated = function()");

   // Même problématique que pour la vue ContentWorks 
};


ContentDetailView.prototype.displayItem = function(){
    console.log("ContentDetailView.prototype.displayItem = function()");

    // Ici on ne récupère les données que de item de hotsSpotController. Si enregistré dans les vues précedentes, il devrait être
    // récupéré ici
    this.checkLang();
/*
    console.log("this.hotSpotController.model.current");
    console.log(this.hotSpotController.model);
    console.log("this.hotSpotController.model.current");
*/
    var lang = globalLangVar;


        if( (this.hotSpotController.model.current == "detail") || (this.hotSpotController.model.current == "works") ) {

            if(lang=="fr"){
                
                $('.artworkTitle').html(this.hotSpotController.model.item['textes']['FR']['titreOeuvre']);
                $('#artworkDetail').html(this.hotSpotController.model.item['textes']['FR']['descriptionOeuvre']);
                $('#artworkChapoHolder').html(this.hotSpotController.model.item['textes']['FR']['chapeauOeuvre']);
                $('#artworkChapoHolder').html(this.hotSpotController.model.item['textes']['FR']['chapeauOeuvre']);

                var linkedImagesToDisplay = "<h1>OEUVRES LIEES</h1>";
                for (var i = 0; i < this.hotSpotController.model.item['sousOeuvre'].length; i++) {

                    linkedImagesToDisplay += "<div class='sousOeuvresImages'><img src='img/artwork/"+this.hotSpotController.model.item['sousOeuvre'][i]['srcImage']+"' alt='' /></div>";
                    linkedImagesToDisplay += "<div class='sousOeuvresLieesTexte'>"+this.hotSpotController.model.item['sousOeuvre'][i]['textes']['FR']['chapeau']+"</div>";
                }
                $('#artworkLinks').html(linkedImagesToDisplay);
        //
              
            } else if(lang=="eng"){
                $('.artworkTitle').html(this.hotSpotController.model.item['textes']['EN']['titreOeuvre']);
                $('#artworkDetail').html(this.hotSpotController.model.item['textes']['EN']['DescriptionOeuvre']);
                  $('#artworkChapoHolder').html(this.hotSpotController.model.item['textes']['EN']['chapeauOeuvre']);

                var linkedImagesToDisplay = "";
                for (var i = 0; i < this.hotSpotController.model.item['sousOeuvre'].length; i++) {

                    linkedImagesToDisplay += "<div class='sousOeuvresImages'><img src='img/artwork/"+this.hotSpotController.model.item['sousOeuvre'][i]['srcImage']+"' alt='' /></div>";
                    linkedImagesToDisplay += "<div class='sousOeuvresLieesTexte'>"+this.hotSpotController.model.item['sousOeuvre'][i]['textes']['EN']['chapeau']+"</div>";
                }
                $('#artworkLinks').append(linkedImagesToDisplay);

            } else if(lang=="ned"){
                $('.artworkTitle').html(this.hotSpotController.model.item['textes']['NED']['titreOeuvre']);
                $('#artworkDetail').html(this.hotSpotController.model.item['textes']['NED']['DescriptionOeuvre']);
                $('#artworkChapoHolder').html(this.hotSpotController.model.item['textes']['NED']['chapeauOeuvre']);

                var linkedImagesToDisplay = "";
                for (var i = 0; i < this.hotSpotController.model.item['sousOeuvre'].length; i++) {

                    linkedImagesToDisplay += "<div class='sousOeuvresImages'><img src='img/artwork/"+this.hotSpotController.model.item['sousOeuvre'][i]['srcImage']+"' alt='' /></div>";
                    linkedImagesToDisplay += "<div class='sousOeuvresLieesTexte'>"+this.hotSpotController.model.item['sousOeuvre'][i]['textes']['NED']['chapeau']+"</div>";
                }
                $('#artworkLinks').append(linkedImagesToDisplay);

            } else if(lang=="deu"){
                $('.artworkTitle').html(this.hotSpotController.model.item['textes']['DEU']['titreOeuvre']);
                $('#artworkDetail').html(this.hotSpotController.model.item['textes']['DEU']['DescriptionOeuvre']);
                $('#artworkChapoHolder').html(this.hotSpotController.model.item['textes']['DEU']['chapeauOeuvre']);

                var linkedImagesToDisplay = "";
                for (var i = 0; i < this.hotSpotController.model.item['sousOeuvre'].length; i++) {

                    linkedImagesToDisplay += "<div class='sousOeuvresImages'><img src='img/artwork/"+this.hotSpotController.model.item['sousOeuvre'][i]['srcImage']+"' alt='' /></div>";
                    linkedImagesToDisplay += "<div class='sousOeuvresLieesTexte'>"+this.hotSpotController.model.item['sousOeuvre'][i]['textes']['DEU']['chapeau']+"</div>";
                }

                $('#artworkLinks').append(linkedImagesToDisplay);

            } else {
                alert('language not recognized');
            }
        
        } else {

            if(lang=="fr"){
                
                $('.artworkTitle').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['FR']['titreOeuvre']);
                $('#artworkDetail').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['FR']['descriptionOeuvre']);
                $('#artworkChapoHolder').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['FR']['chapeauOeuvre']);
                $('#artworkChapoHolder').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['FR']['chapeauOeuvre']);

                var linkedImagesToDisplay = "<h1>OEUVRES LIEES</h1>";
                for (var i = 0; i < this.hotSpotController.model.current['oeuvre'][0]['sousOeuvre'].length; i++) {

                    linkedImagesToDisplay += "<div class='sousOeuvresImages'><img src='img/artwork/"+this.hotSpotController.model.current['oeuvre'][0]['sousOeuvre'][i]['srcImage']+"' alt='' /></div>";
                    linkedImagesToDisplay += "<div class='sousOeuvresLieesTexte'>"+this.hotSpotController.model.current['oeuvre'][0]['sousOeuvre'][i]['textes']['FR']['chapeau']+"</div>";
                }
                $('#artworkLinks').html(linkedImagesToDisplay);
        //
              
            } else if(lang=="eng"){
                $('.artworkTitle').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['EN']['titreOeuvre']);
                $('#artworkDetail').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['EN']['DescriptionOeuvre']);
                  $('#artworkChapoHolder').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['EN']['chapeauOeuvre']);

                var linkedImagesToDisplay = "";
                for (var i = 0; i < this.hotSpotController.model.current['oeuvre'][0]['sousOeuvre'].length; i++) {

                    linkedImagesToDisplay += "<div class='sousOeuvresImages'><img src='img/artwork/"+this.hotSpotController.model.current['oeuvre'][0]['sousOeuvre'][i]['srcImage']+"' alt='' /></div>";
                    linkedImagesToDisplay += "<div class='sousOeuvresLieesTexte'>"+this.hotSpotController.model.current['oeuvre'][0]['sousOeuvre'][i]['textes']['EN']['chapeau']+"</div>";
                }
                $('#artworkLinks').append(linkedImagesToDisplay);

            } else if(lang=="ned"){
                $('.artworkTitle').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['NED']['titreOeuvre']);
                $('#artworkDetail').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['NED']['DescriptionOeuvre']);
                $('#artworkChapoHolder').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['NED']['chapeauOeuvre']);

                var linkedImagesToDisplay = "";
                for (var i = 0; i < this.hotSpotController.model.current['oeuvre'][0]['sousOeuvre'].length; i++) {

                    linkedImagesToDisplay += "<div class='sousOeuvresImages'><img src='img/artwork/"+this.hotSpotController.model.current['oeuvre'][0]['sousOeuvre'][i]['srcImage']+"' alt='' /></div>";
                    linkedImagesToDisplay += "<div class='sousOeuvresLieesTexte'>"+this.hotSpotController.model.current['oeuvre'][0]['sousOeuvre'][i]['textes']['NED']['chapeau']+"</div>";
                }
                $('#artworkLinks').append(linkedImagesToDisplay);

            } else if(lang=="deu"){
                $('.artworkTitle').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['DEU']['titreOeuvre']);
                $('#artworkDetail').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['DEU']['DescriptionOeuvre']);
                $('#artworkChapoHolder').html(this.hotSpotController.model.current['oeuvre'][0]['textes']['DEU']['chapeauOeuvre']);

                var linkedImagesToDisplay = "";
                for (var i = 0; i < this.hotSpotController.model.current['oeuvre'][0]['sousOeuvre'].length; i++) {

                    linkedImagesToDisplay += "<div class='sousOeuvresImages'><img src='img/artwork/"+this.hotSpotController.model.current['oeuvre'][0]['sousOeuvre'][i]['srcImage']+"' alt='' /></div>";
                    linkedImagesToDisplay += "<div class='sousOeuvresLieesTexte'>"+this.hotSpotController.model.current['oeuvre'][0]['sousOeuvre'][i]['textes']['DEU']['chapeau']+"</div>";
                }
                $('#artworkLinks').append(linkedImagesToDisplay);

            } else {
                alert('language not recognized');
            }
        }


    this.displayingArtImage();    
};

ContentDetailView.prototype.onClickTools = function(){
    console.log("ContentDetailView.prototype.onClickTools = function()");
    this.controller.setHistoryId(Repository.DETAIL_ID);
    this.controller.setCurrent(Repository.TOOLS_ID);
};

ContentDetailView.prototype.displayingSVG = function(){
    console.log("ContentDetailView.prototype.displayingSVG = function()");
    [].slice.call( document.querySelectorAll( '#resize > .si-icon' ) ).forEach( function( el ) {
        var svgicon = new svgIcon( el, svgIconConfig );
    } );

    new svgIcon( document.querySelector( '.si-icon-hamburger-cross' ), svgIconConfig, { 
        easing : mina.elastic, 
        speed: 600,
        size : { w : 50, h : 50 }
    } );

    new svgIcon( document.querySelector( '.si-icon-hamburger-cross2' ), svgIconConfig, { 
        easing : mina.elastic, 
        speed: 600,
        size : { w : 50, h : 50 }
    } );
};

/* ================================================================================ */
/* === DETAIL VIEW ================================================================ */
/* ================================================================================ */

// Couleur des SVG
ContentDetailView.prototype.svgColor = function(){
    console.log("ContentDetailView.prototype.svgColor = function()");
    jQuery('#artworkLeft').find('path').attr({'stroke':'#000','fill':'#000'});
    jQuery('#resize').find('path').attr({'stroke':'#fff','fill':'#fff'});
};

ContentDetailView.prototype.onClickedDetail = function(){
    console.log("ContentDetailView.prototype.onClickedDetail = function()");
    jQuery('.si-icon-hamburger-cross').click();
    if(jQuery('.si-icon-hamburger-cross').hasClass('si-icon-unselected')){
        // Bouton noir
        jQuery('.si-icon-hamburger-cross').find('path').attr('stroke','#fff');
        jQuery('#detailButton').css('background-color','#000');
        jQuery('#detailButton').css('color','#fff');
        jQuery('.si-icon-hamburger-cross').removeClass('si-icon-unselected');
        jQuery('.si-icon-hamburger-cross').addClass('si-icon-selected');
        // Fenêtres à droite
        jQuery('#artworkZoomHolder').removeClass('goLeftZoom');
        jQuery('#artworkZoomHolder').addClass('goRightZoom');
        jQuery('#artworkChapoHolder').removeClass('goLeftZoom');
        jQuery('#artworkChapoHolder').addClass('goRightZoom');
        jQuery('#artworkDetail').removeClass('goLeft').css('opacity','1');
        jQuery('#artworkDetail').addClass('goRight');
        // Autre bouton blanc
        // Autre fenêtre à gauche
        if(jQuery('.si-icon-hamburger-cross2').hasClass('si-icon-selected')) {
            //jQuery('.si-icon-hamburger-cross2').click();
            jQuery('#linkedArtworksButton').mousedown();
            jQuery('.si-icon-hamburger-cross2').find('path').attr('stroke','#000');
            jQuery('#linkedArtworksButton').css('background-color','#fff');
            jQuery('#linkedArtworksButton').css('color','#000');
            jQuery('#artworkLinks').removeClass('goRight').css('opacity','0');;
            jQuery('#artworkLinks').addClass('goLeft');
            jQuery('#artworkZoomHolder').removeClass('goLeftZoom');
            jQuery('#artworkZoomHolder').addClass('goRightZoom');
            jQuery('#artworkChapoHolder').removeClass('goLeftZoom');
            jQuery('#artworkChapoHolder').addClass('goRightZoom');
        }
    } else {
        // Bouton blanc
        jQuery('.si-icon-hamburger-cross').find('path').attr('stroke','#000');
        jQuery('#detailButton').css('background-color','#fff');
        jQuery('#detailButton').css('color','#000');
        jQuery('.si-icon-hamburger-cross').removeClass('si-icon-selected');
        jQuery('.si-icon-hamburger-cross').addClass('si-icon-unselected');
        // Fenêtres à gauche
        jQuery('#artworkZoomHolder').removeClass('goRightZoom');
        jQuery('#artworkZoomHolder').addClass('goLeftZoom');
        jQuery('#artworkChapoHolder').removeClass('goRightZoom');
        jQuery('#artworkChapoHolder').addClass('goLeftZoom');
        jQuery('#artworkDetail').removeClass('goRight').css('opacity','0');
        jQuery('#artworkDetail').addClass('goLeft');
    };
};

ContentDetailView.prototype.onClickedLinkedArt = function(){
    console.log("ContentDetailView.prototype.onClickedLinkedArt = function()");
    jQuery('.si-icon-hamburger-cross2').click();
    if(jQuery('.si-icon-hamburger-cross2').hasClass('si-icon-unselected')) {
        // Bouton noir
        jQuery('.si-icon-hamburger-cross2').find('path').attr('stroke','#fff');
        jQuery('#linkedArtworksButton').css('background-color','#000');
        jQuery('#linkedArtworksButton').css('color','#fff');
        jQuery('.si-icon-hamburger-cross2').removeClass('si-icon-unselected');
        jQuery('.si-icon-hamburger-cross2').addClass('si-icon-selected');
        // Fenêtre à droite
        jQuery('#artworkZoomHolder').removeClass('goLeftZoom');
        jQuery('#artworkZoomHolder').addClass('goRightZoom');
        jQuery('#artworkChapoHolder').removeClass('goLeftZoom');
        jQuery('#artworkChapoHolder').addClass('goRightZoom');
        jQuery('#artworkLinks').removeClass('goLeft').css('opacity','1');
        jQuery('#artworkLinks').addClass('goRight');
        // Autre bouton blanc
        // Autre fenêtre à gauche
        if(jQuery('.si-icon-hamburger-cross').hasClass('si-icon-selected')) {
            //jQuery('.si-icon-hamburger-cross').click();
            jQuery('#detailButton').mousedown();
            jQuery('.si-icon-hamburger-cross').find('path').attr('stroke','#000');
            jQuery('#detailButton').css('background-color','#fff');
            jQuery('#detailButton').css('color','#000');
            jQuery('#artworkDetail').removeClass('goRight').css('opacity','0');;
            jQuery('#artworkDetail').addClass('goLeft');
            jQuery('#artworkZoomHolder').removeClass('goLeftZoom');
            jQuery('#artworkZoomHolder').addClass('goRightZoom');
            jQuery('#artworkChapoHolder').removeClass('goLeftZoom');
            jQuery('#artworkChapoHolder').addClass('goRightZoom');
        }
    } else {
        // Bouton blanc
        jQuery('.si-icon-hamburger-cross2').find('path').attr('stroke','#000');
        jQuery('#linkedArtworksButton').css('background-color','#fff');
        jQuery('#linkedArtworksButton').css('color','#000');
        jQuery('.si-icon-hamburger-cross2').removeClass('si-icon-selected');
        jQuery('.si-icon-hamburger-cross2').addClass('si-icon-unselected');
        // Fenêtres à gauche
        jQuery('#artworkZoomHolder').removeClass('goRightZoom');
        jQuery('#artworkZoomHolder').addClass('goLeftZoom');
        jQuery('#artworkChapoHolder').removeClass('goRightZoom');
        jQuery('#artworkChapoHolder').addClass('goLeftZoom');
        jQuery('#artworkLinks').removeClass('goRight').css('opacity','0');
        jQuery('#artworkLinks').addClass('goLeft');
    };
    
};

ContentDetailView.prototype.displayingArtImage = function() {
    console.log("ContentDetailView.prototype.displayingArtImage = function()");

    if( (this.hotSpotController.model.current == "works") || (this.hotSpotController.model.current == "detail") ) {

        var artWork;
        artWork = "img/artwork/" + this.hotSpotController.model.item['image'];
        jQuery('#artworkZoom').smoothZoom({ 
            image_url: artWork,
            width: 400,
            height: 525,
            responsive: false,
            responsive_maintain_ratio: true,
            max_WIDTH: '',
            max_HEIGHT: '',
            zoom_BUTTONS_SHOW: false,
            pan_BUTTONS_SHOW: false,
            zoom_MAX:'150',
            initial_ZOOM: '0',
            border_SIZE: 0
        }); 

    } else {

        if(this.hotSpotController.model.current) {

            if(this.hotSpotController.model.current['oeuvre'].length > 1){

                this.controller.setCurrent(Repository.WORKS_ID);

            } else {

                this.hotSpotController.setItem(this.hotSpotController.model.current['oeuvre']);
            
                var artWork;
                artWork = "img/artwork/" + this.hotSpotController.model.current['oeuvre'][0]['image'];
                jQuery('#artworkZoom').smoothZoom({ 
                    image_url: artWork,
                    width: 400,
                    height: 525,
                    responsive: false,
                    responsive_maintain_ratio: true,
                    max_WIDTH: '',
                    max_HEIGHT: '',
                    zoom_BUTTONS_SHOW: false,
                    pan_BUTTONS_SHOW: false,
                    zoom_MAX:'150',
                    initial_ZOOM: '0',
                    border_SIZE: 0
                }); 

              //  jQuery('#artworkZoom').html('<img src="'+artWork+'" id="currentArtWotkBeeingSeen" alt="" style="height: 525px; z-index: 10000000;" />');            

            }
        } 
    }   

};


ContentDetailView.prototype.onZoomLauncher = function() {
    console.log("ContentDetailView.prototype.onZoomLauncher = function()");
    var opacityCheck = jQuery('#artworkLinks').css('opacity');
    var opacityCheck2 = jQuery('#artworkDetail').css('opacity');
    if( opacityCheck == '1' || opacityCheck2 == '1' ){
        jQuery('#artworkZoomHolder').css('left','-250px');
    }
    else{
        jQuery('#artworkZoomHolder').css('left','140px');
    }

    jQuery('#artworkZoom img').css({'opacity':'0'});

    jQuery('#artworkZoomHolder').css({'width':'+=600px','height':'+=100px','top':'-=50px'});
    jQuery('#artworkZoom').css({'width':'+=600px','height':'+=100px'});
    jQuery('#artworkLinks').css('opacity','0');
    jQuery('#artworkDetail').css('opacity','0');
    jQuery('#artworkLeft').css('opacity','0');
    jQuery('#artworkChapoHolder').css({'opacity':'0','display':'none'});
    jQuery('.zoomBack').css('display','block');
    jQuery('.planButton2').css('display','none');    
    jQuery(this).css('display','none');
    jQuery('.si-icon-maximize-rotate').click();




    if( (this.hotSpotController.model.current == "works") || (this.hotSpotController.model.current == "detail") ) {

        var artWork;
        artWork = "img/artwork/" + this.hotSpotController.model.item['image'];
        jQuery('#artworkZoom').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
        image_url: artWork,
        width: 1000,
        height: 625,
        responsive: false,
        responsive_maintain_ratio: true,
        max_WIDTH: '',
        max_HEIGHT: '',
        zoom_BUTTONS_SHOW: false,
        pan_BUTTONS_SHOW: false,
        zoom_MAX:'150',
        initial_ZOOM: '0',
        border_SIZE: 0
        }); 

    } else {
        //

        var artWork;
        if(this.hotSpotController.model.current) {
            artWork = "img/artwork/" + this.hotSpotController.model.current['oeuvre'][0]['image'];
        } else {
//            artWork = "img/oeuvre.jpg";
            artWork = "";
        }

        jQuery('#artworkZoom').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 

        image_url: artWork,
        width: 1000,
        height: 625,
        responsive: false,
        responsive_maintain_ratio: true,
        max_WIDTH: '',
        max_HEIGHT: '',
        zoom_BUTTONS_SHOW: false,
        pan_BUTTONS_SHOW: false,
        zoom_MAX:'150',
        initial_ZOOM: '0',
        border_SIZE: 0
    }); 
    }
};

ContentDetailView.prototype.onZoomBack = function() {
    console.log("ContentDetailView.prototype.onZoomBack = function()");
    if(jQuery('.si-icon-hamburger-cross').hasClass('si-icon-selected')){
        jQuery('#artworkDetail').css('opacity','1');
    }
    if(jQuery('.si-icon-hamburger-cross2').hasClass('si-icon-selected')){
        jQuery('#artworkLinks').css('opacity','1');
    }
    jQuery('#artworkLeft').css('opacity','1');
    jQuery('#artworkChapoHolder').css({'opacity':'1','display':'block'});
    jQuery('#artworkZoomHolder').css({'width':'-=600px','height':'-=100px','top':'+=50px','left':'320px'});
    jQuery('#artworkZoom').css({'width':'-=600px','height':'-=100px'});
    jQuery('.zoomBack').css('display','none');
    jQuery('.planButton2').css('display','block'); 
    jQuery('#zoomLauncher').css('display','block');
    jQuery('.si-icon-maximize-rotate').click();


    if( (this.hotSpotController.model.current == "works") || (this.hotSpotController.model.current == "detail") ) {

        var artWork;
        artWork = "img/artwork/" + this.hotSpotController.model.item['image'];


        jQuery('#artworkZoom').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
            image_url: artWork,
            width: 400,
            height: 525,
            responsive: false,
            responsive_maintain_ratio: true,
            max_WIDTH: '',
            max_HEIGHT: '',
            zoom_BUTTONS_SHOW: false,
            pan_BUTTONS_SHOW: false,
            zoom_MAX:'150',
            initial_ZOOM: '0',
            border_SIZE: 0
        });

    } else {
        var artWork;
        if(this.hotSpotController.model.current) {
            artWork = "img/artwork/"+this.hotSpotController.model.current['oeuvre'][0]['image'];
        } else {
            //artWork = "img/oeuvre.jpg";
            artWork = "";            
        }

        jQuery('#artworkZoom').smoothZoom('destroy').css('background-image', 'url(zoom_assets/preloader.gif)').smoothZoom({ 
            image_url: artWork,
            width: 400,
            height: 525,
            responsive: false,
            responsive_maintain_ratio: true,
            max_WIDTH: '',
            max_HEIGHT: '',
            zoom_BUTTONS_SHOW: false,
            pan_BUTTONS_SHOW: false,
            zoom_MAX:'150',
            initial_ZOOM: '0',
            border_SIZE: 0
        });        
    }        //

};

ContentDetailView.prototype.onClickIcon = function(e){
    console.log("ContentDetailView.prototype.onClickIcon = function(e)");
    jQuery(e.currentTarget).click();
};

ContentDetailView.prototype.onBackToMap = function() {
    console.log("ContentDetailView.prototype.onBackToMap = function()");
    this.controller.setCurrent(Repository.MAP_ID);
};

ContentDetailView.prototype.checkLang = function(){
    console.log("ContentDetailView.prototype.checkLang = function()");
    //var lang = Cookie.getCookie('lang.curtius.com');
    var lang  = globalLangVar;

    if(lang == "fr") {
        $('#detailButton .buttonText').html(Internationalization.DetailBtnTextfr);
        $('#linkedArtworksButton .buttonText').html(Internationalization.ArtLinkBtnfr);
    } else if (lang == "eng") {
        $('#detailButton .buttonText').html(Internationalization.DetailBtnTexteng);
        $('#linkedArtworksButton .buttonText').html(Internationalization.ArtLinkBtneng);
    } else if (lang == "ned") {
        $('#detailButton .buttonText').html(Internationalization.DetailBtnTextned);
        $('#linkedArtworksButton .buttonText').html(Internationalization.ArtLinkBtnned);     
    } else if (lang == "deu") {
        $('#detailButton .buttonText').html(Internationalization.DetailBtnTextdeu);
        $('#linkedArtworksButton .buttonText').html(Internationalization.ArtLinkBtndeu);     
    }
};

ContentDetailView.prototype.keyWords = function(){
    console.log("ContentDetailView.prototype.keyWords = function()");
    //var lang = Cookie.getCookie('lang.curtius.com');
    $('.keywordPopup').remove();
    var lang = globalLangVar;
    $.ajax({    
        url: 'keyword'+lang+'.json',
        dataType: 'json',
        timeout: 5000,
        success: function(data, status) {
            $.each(data, function(i, item) { 
                if($('#wrapper:contains('+item.keyword+')')){
                    $("em").highlight(''+item.keyword+'', { element: 'a', className: 'open-popup-link keyword '+item.keyword+'', wordsOnly: true});
                    $('body a.'+item.keyword+'').attr({ href: '#'+item.keyword+'' });
                    $('#wrapper').append('<div class="keywordPopup white-popup mfp-hide" id="'+item.keyword+'">'+item.keytext+'</div>');
                }
            });
        },
        error: function() {
            console.log('There was an error loading the data.');
        }
    });

};

ContentDetailView.prototype.popUp = function(){
    console.log("ContentDetailView.prototype.popUp = function()");
    $('.open-popup-link').magnificPopup({
      type:'inline',
      removalDelay: 300,
      // Class that is added to popup wrapper and background
      // make it unique to apply your CSS animations just to this exact popup
      mainClass: 'mfp-fade',
      midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
};

