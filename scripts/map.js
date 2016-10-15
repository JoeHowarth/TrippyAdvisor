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

console.log(geoplugin_latitude());

function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      scrollwheel: false,
      zoom: 5
    });
}