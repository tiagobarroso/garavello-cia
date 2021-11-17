
function adjustHeightOfPage(pageNo) {

    var offset = 80;
    var pageContentHeight = 0;

    var pageType = $('div[data-page-no="' + pageNo + '"]').data("page-type");

    if( pageType != undefined && pageType == "gallery") {
        pageContentHeight = $(".cd-hero-slider li:nth-of-type(" + pageNo + ") .tm-img-gallery-container").height();
    }
    else {
        pageContentHeight = $(".cd-hero-slider li:nth-of-type(" + pageNo + ") .js-tm-page-content").height() + 20;
    }

    if($(window).width() >= 992) { offset = 120; }
    else if($(window).width() < 480) { offset = 40; }
   
    // Get the page height
    var totalPageHeight = $('.cd-slider-nav').height()
                            + pageContentHeight + offset
                            + $('.tm-footer').height();

    // Adjust layout based on page height and window height
    if(totalPageHeight > $(window).height()) 
    {
        $('.cd-hero-slider').addClass('small-screen');
        $('.cd-hero-slider li:nth-of-type(' + pageNo + ')').css("min-height", totalPageHeight + "px");
    }
    else 
    {
        $('.cd-hero-slider').removeClass('small-screen');
        $('.cd-hero-slider li:nth-of-type(' + pageNo + ')').css("min-height", "100%");
    }
}

/*
    Everything is loaded including images.
*/
$(window).load(function(){

    //adjustHeightOfPage(1); // Adjust page height

    /* Gallery Two pop up
    -----------------------------------------*/
    $('.gallery-two').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery:{enabled:true}                
    });

    /* Gallery Three pop up
    -----------------------------------------*/
    $('.gallery-three').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery:{enabled:true}                
    });

    /* Collapse menu after click 
    -----------------------------------------*/
    $('#tmNavbar a').click(function(){
        $('#tmNavbar').collapse('hide');

        adjustHeightOfPage($(this).data("no")); // Adjust page height

        switch($(this).data("no")){
            
            case 1:
                window.history.pushState(null, null, '?page=inicial');
                break;
            case 2:
                window.history.pushState(null, null, '?page=servicos');
                break;
            case 3:
                window.history.pushState(null, null, '?page=time');
                break;
            case 4:
                window.history.pushState(null, null, '?page=endereco');
                break;
        }
    });

    /* Browser resized 
    -----------------------------------------*/
    $( window ).resize(function() {
        var currentPageNo = $(".cd-hero-slider li.selected .js-tm-page-content").data("page-no");
        
        // wait 3 seconds
        setTimeout(function() {
            adjustHeightOfPage( currentPageNo );
        }, 1000);
        
    });

    // Remove preloader (https://ihatetomatoes.net/create-custom-preloading-screen/)
    $('body').addClass('loaded');

    let searchParams = new URLSearchParams(window.location.search)

    if(searchParams.has('page')){

        switch(searchParams.get('page')){
            
            case 'inicial':
                
                let base = $("body > div.cd-hero > ul > li.selected > div > div > div > div > div.grid-item");
                base.hide();
                
                $.ajax('/data/maquinas.json')
                    .done((data) => {

                        for(let item of data){

                            let clone = base.clone();

                            clone.find('img').attr('src', item.productImage);
                            clone.find('a').attr('href', item.productImage);
                            clone.find('h2').html(item.productName);
                            clone.find('.tm-figure-description').html(item.productCompleteName);
                            clone.show();
                                                        
                            base.before(clone);
                        }

                        /* Gallery One pop up
                        -----------------------------------------*/
                        $('.gallery-one').magnificPopup({
                            delegate: 'a', // child items selector, by clicking on it popup will open
                            type: 'image',
                            gallery:{enabled:true}                
                        });

                        $('[data-no=1]').click();
                    });

                break;
            case 'servicos':
                $('[data-no=2]').click();
                break;
            case 'time':
                $('[data-no=3]').click();
                break;
            case 'endereco':
                $('[data-no=4]').click();
                break;
        }
    }

    $('.carousel').carousel({
        interval: 5000
        });

        // $('.owl-carousel').owlCarousel({
        //     stagePadding: 200,
        //     loop:true,
        //     margin:10,
        //     items:1,
        //     nav:true,
        //   responsive:{
        //         0:{
        //             items:1,
        //             stagePadding: 60
        //         },
        //         600:{
        //             items:1,
        //             stagePadding: 100
        //         },
        //         1000:{
        //             items:1,
        //             stagePadding: 200
        //         },
        //         1200:{
        //             items:1,
        //             stagePadding: 250
        //         },
        //         1400:{
        //             items:1,
        //             stagePadding: 300
        //         },
        //         1600:{
        //             items:1,
        //             stagePadding: 350
        //         },
        //         1800:{
        //             items:1,
        //             stagePadding: 400
        //         }
        //     }
        // })
        
        // var playerSettings = {
        //       controls : ['play-large'],
        //       fullscreen : { enabled: false},
        //       resetOnEnd : true,
        //       hideControls  :true,
        //   clickToPlay:true,
        //       keyboard : false,
        //     }
        
        // const players = Plyr.setup('.js-player', playerSettings);
        
        //  players.forEach(function(instance,index) {
        //             instance.on('play',function(){
        //                 players.forEach(function(instance1,index1){
        //                   if(instance != instance1){
        //                         instance1.pause();
        //                     }
        //                 });
        //             });
        //         });
        
        // $('.video-section').on('translated.owl.carousel', function (event) {
        //   players.forEach(function(instance,index1){
        //                   instance.pause();
        //                 });
        // });
               
});

/* Google map
------------------------------------------------*/
var map = '';
var center;

function initialize() {
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(37.769725, -122.462154),
        scrollwheel: false
    };

    map = new google.maps.Map(document.getElementById('google-map'),  mapOptions);

    google.maps.event.addDomListener(map, 'idle', function() {
      calculateCenter();
    });

    google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(center);
    });
}

function calculateCenter() {
    center = map.getCenter();
}

function loadGoogleMap(){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initialize';
    document.body.appendChild(script);
}

// DOM is ready
$(function() {                
    loadGoogleMap(); // Google Map
});