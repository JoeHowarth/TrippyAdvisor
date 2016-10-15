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

//function getLocFromRaw(lat, lng){
//    return lat + "," + lng;
//}

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

         
