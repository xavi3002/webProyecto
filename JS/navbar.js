/* STICKY NAVBAR SCRIPT */
window.onscroll = function() { myFunction() };

var navbar = document.querySelector("nav");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

// CARET FLIP SCRIPT
$(document).ready(function() {
  $(".repre").hover(
    function() {
      $(this).find(".bi-caret-down-fill").addClass("caret");
    },
    function() {
      $(this).find(".bi-caret-down-fill").removeClass("caret");
    }
    );
  });
  