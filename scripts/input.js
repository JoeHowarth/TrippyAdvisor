// centers map on input address
// returns long lat 
 myLat = 0;
                        myLng = 0;
                        var me = new google.maps.LatLng(myLat, myLng);
                        var myOptions = {
                                            zoom: 13, // The larger the zoom number, the bigger the zoom
                                            center: me,
                                            mapTypeId: google.maps.MapTypeId.ROADMAP
                                        };
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644} //change to tufts 
        });
        var geocoder = new google.maps.Geocoder();
        console.log(geocoder);
        //document.getElementById('submit').addEventListener('click', function() {
        //  getLoc(geocoder, map);
        
        //document.getElementById('submit').addEventListener('click', function() {
         // getPin(, map);
        
        //daniel's alg(location
       // });
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
         return results[0].geometry.location;
        });
    }

         
