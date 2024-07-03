document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const menuContainer = document.querySelector(".menu-container");

    hamburger.addEventListener("click", function() {
      menuContainer.style.left = menuContainer.style.left === "0px" ? "-250px" : "0px";
    });

    // Cierra el menú cuando se hace clic en cualquier parte fuera de él
    document.addEventListener("click", function(event) {
      if (!menuContainer.contains(event.target) && !hamburger.contains(event.target)) {
        menuContainer.style.left = "-250px";
      }
    });
  })