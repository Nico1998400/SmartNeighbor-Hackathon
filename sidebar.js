/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function navEvent() {
    if ($("#mySidebar").hasClass("closed")) {
        
        $("#mySidebar").css("width", "250px");
        $("#mySidebar").removeClass("closed");
        $("#mySidebar").addClass("open");
        $(".openbtn").css("visibility", "hidden");

    } else if ($("#mySidebar").hasClass("open")) {
        
        $("#mySidebar").css("width", "0px");
        $("#mySidebar").removeClass("open");
        $("#mySidebar").addClass("closed");
        $(".openbtn").css("visibility", "visible");
    }
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}