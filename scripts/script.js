$(document).on("click", "#submit", function(){
    console.log("Hello");
    var location = $("#textbox").val();
    $("#test").load("http://api.tripadvisor.com/api/partner/2.0/map/"+ location + "?key=89DE2CFC0C1C43978B484B55F9A514EC");  
});