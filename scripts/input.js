// centers map on input address
// returns long lat 
 
    
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644}, //change to tufts
         mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
        var geocoder = new google.maps.Geocoder();
        console.log(map);
        
        var loc;
        loc = document.getElementById('address').addEventListener('click', function() {
          getLoc(geocoder, map);
        });
        
   //     loc = document.getElementByPin('pin').addEventListener('click', function() {
   //       getPin(map);
   //     });
        
       
       
       // Daniel's function (loc)
      

 //   function getPin(map
  //        var marker = new google.maps.Marker({
  //         position: new google.maps.LatLng([app:user-lat], [app:user-lon]),
  //         map: map

    function getLoc(geocoder, resultsMap) {
        var address = document.getElementById('input').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
         return results[0].geometry.location;
        });
    }

         
