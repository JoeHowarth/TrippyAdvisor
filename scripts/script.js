
 
$(document).on("click", "#go", function(){
    var startLoc = $("#textbox").val();
    var points = $("#locNum").val();
    var prefDist = $("#distance").val() / points;
    var priceWeight = $("#priceWeight").val();
    
    var tripAry = [];
    
    pushPois(startLoc, prefDist, priceWeight, points, tripAry);
})

function Poi(locId, name, rating, num_reviews, cat, subcat, price, dis){
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
    this.distance = dis
}


function pushPois(location, prefDist, priceWeight, loopCount, tripAry){
    var poiAry = [];
    var ajaxComplete = false;
    $.ajax({
        url: "http://api.tripadvisor.com/api/partner/2.0/map/"+ location + "/attractions?key=89DE2CFC0C1C43978B484B55F9A514EC", 
        dataType: "json"
    }).done(function(poiData){
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
                tempPoi.distance
            ));
        }
        poiAry = removeRepeat(poiAry, tripAry);
        var returnPoi = evalPoi(poiAry, prefDist, priceWeight);
        tripAry.push(returnPoi);
        console.log("poi pushed");
        loopCount--;
        
        if(loopCount > 0){
            pushPois(poiAry[poiAry.length-1].location_id, prefDist, priceWeight, loopCount, tripAry);
        }else{
            complete(tripAry);
        }
    });
}

function complete(tripAry){
    console.log(tripAry);
}

function removeRepeat(removeAry, compareAry){
    if(removeAry.length == 0 || compareAry.length == 0){
        return removeAry;
    }
    for(var i = 0; i < removeAry.length; i++){
        for(var j = 0; j < compareAry.length; j++){
            if(removeAry[i] == compareAry[j]){
                removeAry.splice(i, 1);
            }
        }
    }
    return removeAry;
}

function evalPoi(poiAry, prefDist, priceWeight){
    //console.log(poiAry);
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
    
    //console.log(weightedPoi);
    return weightedPoi[0];
}



