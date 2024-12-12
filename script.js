// Sample menu items
const menuItems = [
    { name: 'Cold drink', price: 20 },
    { name: 'Hot Chips', price: 30 },
    { name: 'Turmeric Milk', price: 20 },
    { name: 'Mayonnaise', price: 10 },
    { name: 'Oregano Seasoning', price: 10 }
];

// Function to display menu items
function displayMenu() {
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = '';
    
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.name} - ₹${item.price.toFixed(2)}`;
        li.onclick = () => addToCart(item);
        menuList.appendChild(li);
    });
}

// Function to add item to cart
function addToCart(item) {
    const cartItems = document.getElementById('cart-items');
    const li = document.createElement('li');
    li.innerText = `${item.name} - ₹${item.price.toFixed(2)}`;
    cartItems.appendChild(li);

    updateTotal(item.price);
}

// Function to update total
function updateTotal(price) {
    const cartTotal = document.getElementById('cart-total');
    const currentTotal = parseFloat(cartTotal.innerText);
    const newTotal = currentTotal + price;
    cartTotal.innerText = `₹${newTotal.toFixed(2)}`;
}

// Function to handle checkout
function checkout() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cartItems.childNodes.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert(`Total: ${cartTotal.innerText}\nThank you for your order!`);
        // You might want to add logic here to send the order to a backend or save it in some way.
        cartItems.innerHTML = '';
        cartTotal.innerText = '0.00';
    }
}

// Display menu when the page loads
displayMenu();
