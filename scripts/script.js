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
    var startLoc = $("#textbox").val();
    var points = $("#locNum").val();
    var prefDist = $("#distance").val() / points;
    var priceWeight = $("#priceWeight").val();
//     var restaurantNum = $("#restaurantNum").val();
    var tripPois = [];
  
    pushPoi(startLoc, prefDist, priceWeight, tripPois, points);
})  



function pushPoi(location, prefDist, priceWeight, tripPois, points){
    var poiAry = [];
    var ajaxComplete = false;
    $.ajax({
        url: "http://api.tripadvisor.com/api/partner/2.0/map/"+ location + "/attractions?key=89DE2CFC0C1C43978B484B55F9A514EC", 
        dataType: "json",
        success: function(poiData){
            for(var i = 0; i < poiData.data.length; i++){
                var tempPoi = poiData.data[i];
//                console.log(tempPoi);
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
            
            var returnAry = removeRepeat(poiAry, tripPois);
            
            tripPois.push(weightPoi(returnAry, prefDist, priceWeight));
            points--;
            if(points > 0){
                pushPoi(location, prefDist, priceWeight, tripPois, points);
            }else{
                requestDirection(tripPois);
            }
        }
    });
}

function removeRepeat(removeAry, originAry){
    if(removeAry.length == 0 || originAry.length == 0){
        return removeAry;
    }
    
    for(var i = 0; i < removeAry.length; i++){
        for(var j = 0; j < originAry.length; j++){
            if(removeAry[i].name == originAry[j].name){
                removeAry.splice(i, 1);
                i--;
            }
        }
    }
    return removeAry;
}

function weightPoi(poiAry, prefDist, priceWeight){
    var weightedPoi = [];
    for(var i = 0; i < poiAry.length; i++){
        var poi = poiAry[i];
        var weight = 0;
        if(poi.num_reviews == 0){
            weight = 2 - Math.abs(5 - (5 * poi.distance / prefDist));
            weight += priceWeight * Math.pow(2, Math.abs(poi.price_level - 1) - 2) * (1 - poi.price_level) / Math.abs(1 - poi.price_level);
            weight = Math.pow(weight, 2) * 1 / 9;
        }else{
            weight = poi.rating - Math.abs(5 - (5 * poi.distance / prefDist));
            weight += priceWeight * Math.pow(2, Math.abs(poi.price_level - 1) - 2) * (1 - poi.price_level) / Math.abs(1 - poi.price_level);
            weight = Math.pow(weight, 2) * 1 / 9;
        }
        
        var randArea = 180 / (poi.rating / 2 + 30) + 1;
        var randBonus = (Math.random() * 1 - 0.5) * randArea;
        
//        console.log(weight+" "+randBonus);
        
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
//    console.log(weightedPoi);
    return weightedPoi[0];
}



