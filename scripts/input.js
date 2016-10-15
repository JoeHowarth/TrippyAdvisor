// centers map on input address
// returns long lat 
 
//<<<<<<< HEAD
    
//        var map = new google.maps.Map(document.getElementById('map'), {
//          zoom: 8,
//          center: {lat: -34.397, lng: 150.644}, //change to tufts
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//        });
//console.log("Hello");
//        
//        var geocoder = new google.maps.Geocoder();
//        console.log(map);
        
//        var loc;
//        loc = document.getElementById('address').addEventListener('click', function() {
//              getLoc(geocoder, map);
//        });

//var geocoder = new google.maps.Geocoder();
//
//$(document).on("click", "#go", function(){
//    console.log(getLoc(geocoder, map));
//})
//        
//=======
//    function initMap() {
//        var map = new google.maps.Map(document.getElementById('map'), {
//          zoom: 8,
//          center: {lat: -34.397, lng: 150.644}, //change to tufts
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//        });
//        
//        var geocoder = new google.maps.Geocoder();
//        console.log(map);
//        
//        var loc;
//        loc = document.getElementById('address').addEventListener('click', function() {
//          getLoc(geocoder, map);
//        });
//    }
//>>>>>>> origin/master
   //     loc = document.getElementByPin('pin').addEventListener('click', function() {
   //       getPin(map);
   //     });
        
       
       
       // Daniel's function (loc)
      

 //   function getPin(map
  //        var marker = new google.maps.Marker({
  //         position: new google.maps.LatLng([app:user-lat], [app:user-lon]),
  //         map: map

//    function getLoc(geocoder, resultsMap) {
//        console.log("test");
//        var address = document.getElementById('address').value;
//        console.log(address);
//        geocoder.geocode({'address': address}, function(results, status) {
//          if (status === 'OK') {
//              console.log("test2");
//            resultsMap.setCenter(results[0].geometry.location);
//            var marker = new google.maps.Marker({
//              map: resultsMap,
//              position: results[0].geometry.location
//            });
//              console.log("test2");
//          } else {
//            alert('Geocode was not successful for the following reason: ' + status);
//          }
//        console.log("test3");
//         return results[0].geometry.location;
//        });
//    }

//getLocFromGeoIP();

//first ajax is not functioning, returns error
//function getLocFromGeoIP(){
//    $.ajax({
//        url: "http://api.hostip.info/get_json.php",
//        datatype: "json"
//    }).done(function(data){
//        $.ajax({
//            url: "http://www.geoplugin.net/json.gp?ip=" + data.ip,
//            datatype: "json"
//        }).done(function(data){
//            var latlng = data.geoplugin_latitude + "," + data.geoplugin_longitude;
//            console.out("IP"+latlng);
//            return latlng;
//        });
//    });
//
//}

function getLocFromRaw(lat, lng){
    return lat + "," + lng;
}

function getLocFromName(address, prefDist, priceWeight, tripPois, points){
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyDyifMNPY2-AG4ry0JCQgG3DwVmuRILpu4",
        datatype: "json"
    }).done(function(data){
        var latlng = data.results[0].geometry.location.lat + ", " + data.results[0].geometry.location.lng; 
        console.log(latlng);
        
        pushPoi(latlng, prefDist, priceWeight, tripPois, points);
//        return latlng;
    });
}

         
