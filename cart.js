document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const emptyCartMessage = document.getElementById('empty-cart-message');

  let cart = [];
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const itemName = item.dataset.name;
      const itemPrice = parseFloat(item.dataset.price);
      
      addToCart(itemName, itemPrice);
    });
  });
  
  function addToCart(name, price) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === name) {
        cart[i].quantity++;
        renderCart();
        return;
      }
    }
    cart.push({ name, price, quantity: 1 });
    renderCart();
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
  }
  
  function renderCart() {
    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
      emptyCartMessage.style.display = 'block';
      cartTotal.textContent = "₹0.00";
    } else {
      emptyCartMessage.style.display = 'none';

      let total = 0;
      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity} <button class="remove-from-cart" data-index="${index}">Remove</button>`;
        cartItemsList.appendChild(li);
        
        total += item.price * item.quantity;
      });
      
      cartTotal.textContent = "₹" + total.toFixed(2);
      
      const removeButtons = document.querySelectorAll('.remove-from-cart');
      removeButtons.forEach(button => {
        button.addEventListener('click', () => {
          const index = button.dataset.index;
          removeFromCart(index);
        });
      });
    }
  }
  
  // Display menu when the page loads
  displayMenu();
});

function checkout() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  if (cartItems.childNodes.length === 0) {
      alert('Your cart is empty!');
  } else {
      const confirmation = confirm(`Total: ${cartTotal.innerText}\nProceed to payment?`);
      if (confirmation) {
          // Perform any additional logic here before redirecting, if needed
          alert('Redirecting to payment page...');
          window.location.href = 'payment.html';
          cartItems.innerHTML = '';
          cartTotal.innerText = '0.00';
      }
  }
}

// Select the checkout button and add event listener
const checkoutButton = document.querySelector('button');
checkoutButton.addEventListener('click', checkout);
