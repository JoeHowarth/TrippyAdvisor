//$(document).on("click", "#submit", function(){
//    console.log("Hello");
//    var location = $("#textbox").val();
//    $("#test").load("http://api.tripadvisor.com/api/partner/2.0/map/"+ location + "?key=89DE2CFC0C1C43978B484B55F9A514EC");  
//});

function Poi(locId, name, rate, rank, cat, subcat, price, cuisine, dis){
    var location_id,
    var name,
    var ranking_data,
    var category,
    var subcategory,
    var price_level,
    var cuisine,
    var distance
};

$(document).on("click", "#submit", function(){
    var location = $("#textbox").val();
    $.ajax({
        url: "http://api.tripadvisor.com/api/partner/2.0/map/"+ location + "?key=89DE2CFC0C1C43978B484B55F9A514EC", 
        dataType: "json", 
        success: function(poiData){
            console.log(poiData);
            var poiAry = [];
            console.log(poiData[0].name);
//            for(var i = 0; i < poiData.length; i++){
//                var tempPoi = poiData[i];
//                poiAry[].push(new Poi(
//                    tempPoi.location_id, 
//                    tempPoi.name, 
//                    tempPoi.rating, 
//                    tempPoi.num_reviews, 
//                    tempPoi.category, 
//                    tempPoi.subcategory, 
//                    tempPoi.price_level, 
//                    tempPoi.cuisine, 
//                    tempPoi.distance
//                ));
//             }
        }
            //start();     
    });
});



