jQuery(function(){
    console.log("Inside the main function");

var minimized_elements = $('p.minimize');
console.log("The minized text is ",minimized_elements);
var minimize_character_count = 200;    

minimized_elements.each(function(){ 
console.log("Inside the minimize function");   
var t = $(this).text();        
if(t.length < minimize_character_count ) return;

$(this).html(
    t.slice(0,minimize_character_count )+'<span>... </span><a href="#" class="more">More</a>'+
    '<span style="display:none;">'+ t.slice(minimize_character_count ,t.length)+' <a href="#" class="less">Less</a></span>'
);

}); 

$('a.more', minimized_elements).click(function(event){
event.preventDefault();
$(this).hide().prev().hide();
$(this).next().show();        
});

$('a.less', minimized_elements).click(function(event){
event.preventDefault();
$(this).parent().hide().prev().show().prev().show();    
});

})