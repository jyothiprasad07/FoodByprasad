const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click',function(event) {
    event.preventDefault();
    window.location.href = "opening.html";
  });

  // Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get all the buttons with class "button"
  var addButtonList = document.querySelectorAll(".button");

  // Loop through each button and add a click event listener
  addButtonList.forEach(function(button) {
      button.addEventListener("click", function() {
          // Get the parent section of the clicked button
          var section = button.parentElement;

          // Get the item details
          var itemName = section.querySelector("h2").innerText;
          var itemPrice = section.querySelector(".price").innerText;

          // Create an object for the item
          var item = {
              name: itemName,
              price: itemPrice
          };

          // Get existing cart items from localStorage or create an empty array
          var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

          // Add the new item to the cart
          cartItems.push(item);

          // Store the updated cart items back to localStorage
          localStorage.setItem("cartItems", JSON.stringify(cartItems));

          // Redirect to the cart page
          window.location.href = "cart.html";
      });
  });
});
