// centers map on input address
// returns long lat 
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644} //change to tufts 
        });
        var geocoder = new google.maps.Geocoder();
        document.getElementById('submit').addEventListener('click', function() {
          getLoc(geocoder, map);
        
        document.getElementById('submit').addEventListener('click', function() {
          getPin(, map);
        
        //daniel's alg(location
        });
      }

    function getLoc(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
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
         return results[0].geometry.location
