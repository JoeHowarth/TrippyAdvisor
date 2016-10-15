Google.maps.

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: startloc,
          waypoint: locations,
          destination: endloc,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
    </script>