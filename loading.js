$(document).ready(function () {
    console.log("hi");
    $(".hidden").hide(0).delay(250).slideToggle(2000);
});

setTimeout(function(){
    window.location.href = 'startscreen.html';
 }, 3000);