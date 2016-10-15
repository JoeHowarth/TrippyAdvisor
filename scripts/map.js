//function initialize(){
//    var mapProp = {
//        center:new google.maps.LatLng(geoplugin_latitude, geoplugin_longitude),
//        zoom: 17,
//        mapTypeId:google.maps.MapTypeId.ROADMAP,
//        maxZoom: 17,
//        scrollwheel: false
//    }
//    
//    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
//    google.maps.event.addDomListener(window, 'load', initialize);
//}
//

//console.log(geoplugin_latitude());
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initMap() {
    // Create a map object and specify the DOM element for display.
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        scrollwheel: false,
        zoom: 5
    });
    directionsDisplay.setMap(map);
}

function requestDirection(tripPois){
    console.log(tripPois[1]);
    var request = {
        origin : new google.maps.LatLng(tripPois[0].lat, tripPois[0].lng),
        destination : new google.maps.LatLng(tripPois[tripPois.length-1].lat, tripPois[tripPois.length-1].lng),
        travelMode : "WALKING"
    };
    console.log("output");
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            console.log("output");
            directionsDisplay.setDirections(result);
        }
    });
}

