function Poi(locId, name, rating, num_reviews, cat, subcat, price, dis, lat, lng){
    this.location_id = locId,
    this.name = name,
    this.rating = rating,
    this.num_reviews = num_reviews,
//    this.ranking_data = rank,
    //attraction, restaurant, hotel
    this.category = cat, 
    //pizza, sushi, japanese, nightlife
    this.subcategory = subcat,
    //portrayed as '$' 
    this.price_level = price,
//    this.cuisine = cuisine,
    this.distance = dis,
    this.lat = lat, 
    this.lng = lng
};

$(document).on("click", "#go", function(){
//    var startLoc = $("#textbox").val();
    
    var points = $("#locNum").val();
    var prefDist = $("#distance").val() / points;
    var priceWeight = $("#priceWeight").val();
    var tripLocs = new Array();
    //conditional for different input methods?
    

    var startLoc = getLocFromName($("#address").val(), prefDist, priceWeight, tripLocs, points);
    
})  

function pushPoi(location, prefDist, priceWeight, tripLocs, points){
    var poiAry = [];
    var ajaxComplete = false;
    $.ajax({
        url: "http://api.tripadvisor.com/api/partner/2.0/map/"+ location + "/attractions?key=89DE2CFC0C1C43978B484B55F9A514EC", 
        dataType: "json",
        success: function(poiData){
            for(var i = 0; i < poiData.data.length; i++){
                var tempPoi = poiData.data[i];
                var repeating = false;
                
                for(var j = 0; j < tripLocs.length; j++){
                    if(tempPoi.name == tripLocs[j].name){
                        repeating = true;
                        break;
                    }
                }
                if(repeating){
                    continue;
                }
                
                
                switch(tempPoi.price_level){
                case "$":
                    tempPoi.price_level = 1;
                    break;        
                case "$$":
                    tempPoi.price_level = 2;
                    break;
                case "$$$":
                    tempPoi.price_level = 3;
                    break;
                case "$$$$":
                    tempPoi.price_level = 4;
                    break;
                default:
                    tempPoi.price_level = 0;
                }
                
                
                poiAry.push(new Poi(
                    tempPoi.location_id, 
                    tempPoi.name, 
                    tempPoi.rating,
                    tempPoi.num_reviews,
                    tempPoi.category.name, 
                    tempPoi.subcategory, 
                    tempPoi.price_level, 
//                  tempPoi.cuisine, 
                    tempPoi.distance,
                    tempPoi.latitude,
                    tempPoi.longitude
                ));
            }
            
            var weight = weightPoi(poiAry, prefDist, priceWeight);
            tripLocs.push(weight);
            
            points--;
            if(points > 0){
                pushPoi(location, prefDist, priceWeight, tripLocs, points);
            }else{
                requestDirection(tripLocs);
            }
        }
    });
}

function weightPoi(poiAry, prefDist, priceWeight){
    var weightedPoi = [];
    for(var i = 0; i < poiAry.length; i++){
        var poi = poiAry[i];
        var weight = 0;
        if(poi.num_reviews == 0){
            weight = 2 - (Math.abs(poi.distance - prefDist)/poi.distance);
            weight += priceWeight * Math.pow(2, Math.abs(poi.price_level - 1) - 2) * (1 - poi.price_level) / Math.abs(1 - poi.price_level);
            weight = Math.pow(weight, 2) * 1 / 9;
        }else{
            weight = poi.rating - (Math.abs(poi.distance - prefDist)/poi.distance);
            weight += priceWeight * Math.pow(2, Math.abs(poi.price_level - 1) - 2) * (1 - poi.price_level) / Math.abs(1 - poi.price_level);
            weight = Math.pow(weight, 2) * 1 / 9;
        }
        
        var randArea = 180 / (poi.rating / 2 + 30) + 1;
        var randBonus = (Math.random() * 1 - 0.5) * randArea;

        poi["weight"] = weight + randBonus;
        weightedPoi.push(poi);
    }
    
    for(var i = 0; i < weightedPoi.length; i++){
        for(var j = i + 1; j < weightedPoi.length; j++){
            if(weightedPoi[i].weight < weightedPoi[j].weight){
                var temp = weightedPoi[i];
                weightedPoi[i] = weightedPoi[j];
                weightedPoi[j] = temp;
            }
        }
    }
    return weightedPoi[0];
}

$(document).on("click", "#reset", function(){
    location.reload();
})

