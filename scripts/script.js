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

$(document).on("click", "#go", function(){
    var startLoc = $("#textbox").val();
    var points = $("#locNum").val();
    var prefDist = $("#distance").val() / points;
    var priceWeight = $("#priceWeight").val;
    
    var tripPois = [];
    
    for(var i = 0; i < points; i++){
        if(i == 0){
            tripPois.push(getPoi(startLoc, prefDist, priceWeight));
        }else{
            tripPois.push(getPoi(tripPois[i-1].location_id, prefDist, priceWeight));
        }
    }
    
    console.log(tripPois);

})



function getPoi(location, prefDist, priceWeight){
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
                    tempPoi.distance
                ));
            }
            console.log("Hello from ajax");
            return poiData;
        }
    });
    console.log("hello again");
}

function weighPoi(poiAry, prefDist, priceWeight){
    //console.log("weightPoi");
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
        
        console.log(weight+" "+randBonus);
        
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
    
    console.log(weightedPoi);
    return weightedPoi[0];
}



