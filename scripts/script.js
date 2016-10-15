function Poi(locId, name, rank, cat, subcat, price, cuisine, dis){
    this.location_id = locId,
    this.name = name,
    this.ranking_data = rank,
    //attraction, restaurant, hotel
    this.category = cat,
    //pizza, sushi, japanese, nightlife
    this.subcategory = subcat,
    //portrayed as '$' 
    this.price_level = price,
//    this.cuisine = cuisine,
    this.distance = dis
}

$(document).on("click", "#submit", function(){
    var location = $("#textbox").val();
    $.ajax({
        url: "http://api.tripadvisor.com/api/partner/2.0/map/"+ location + "/attractions?key=89DE2CFC0C1C43978B484B55F9A514EC", 
        dataType: "json", 
        success: function(poiData){
            var poiAry = [];
            for(var i = 0; i < poiData.data.length; i++){
                var tempPoi = poiData.data[i];
                console.log(tempPoi);
                poiAry.push(new Poi(
                    tempPoi.location_id, 
                    tempPoi.name, 
                    tempPoi.ranking_data, 
                    tempPoi.category.name, 
                    tempPoi.subcategory, 
                    tempPoi.price_level, 
//                  tempPoi.cuisine, 
                    tempPoi.distance
                ));
                console.log(poiAry[i]);
            }
        weighPoi(poiAry);
        }     
    });
});

function weighPoi(poiAry){
    

}



