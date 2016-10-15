//#input stuff


function codeAddress() {
    var address = document.getElementById("address").value;
    var inp;
    geocoder.geocode( { 'address': address}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
		//map.setCenter(results[0].geometry.location);
		//var marker = new google.maps.Marker({
		//	map: map,
		//	position: results[0].geometry.location
		    });



		 inp=results[0].geometry.location;
	         
		alert(inp);
	    } else {
		alert("Geocode was not successful for the following reason: " + status)
		    }
    return inp:



