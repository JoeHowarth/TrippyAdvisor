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
    var waypoints = [];
    if(tripPois.length > 2){
        for(var i = 1; i < tripPois.length-1; i++){
            waypoints.push({
                location: new google.maps.LatLng(tripPois[i].lat, tripPois[i].lng),
                stopover: true
            });
        }
    }
    var request = {
        origin : new google.maps.LatLng(tripPois[0].lat, tripPois[0].lng),
        destination : new google.maps.LatLng(tripPois[tripPois.length-1].lat, tripPois[tripPois.length-1].lng),
        waypoints: waypoints,
        travelMode : "WALKING",
        optimizeWaypoints : true
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });
}

