// Start Ordering
function startOrdering() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("categoryPage").style.display = "block";
}

// Go Back Function
function goBack() {
    document.querySelectorAll(".container").forEach(page => page.style.display = "none");
    document.getElementById("categoryPage").style.display = "block";
}

// Food Categories
const foodItems = {
    tiffins: [
        { name: "Dosa", price: 40 },
        { name: "Idli", price: 30 },
        { name: "Vada", price: 30 },
        { name: "Poori", price: 30 }
    ],
    fastfood: [
        { name: "Veg Manchurian", price: 60 },
        { name: "Fried Rice", price: 50 },
        { name: "Egg Fried Rice", price: 60 },
        { name: "Egg Noodles", price: 60 },
        { name: "Veg Noodles", price: 50 },
        { name: "Chicken Fried Rice", price: 70 }
    ],
    lunch: [
        { name: "Full Meal", price: 100 },
        { name: "Single Meal", price: 60 },
        { name: "Paratha/Chapathi(curry)", price: 60 }
    ],
    snacks: [
        { name: "Biscuits", price: 10 },
        { name: "Chips", price: 10 },
        { name: "Ice cream", price: 20 },
        { name: "Chocolates", price: 50 },
        { name: "Kurkure", price: 10 },
        { name: "Cake", price: 10 }
    ],
    drinks: [
        { name: "Water", price: 10 },
        { name: "Maaza", price: 20 },
        { name: "Pulpy orange", price: 20 },
        { name: "Thums up", price: 20 },
        { name: "Sprite", price: 20 }
    ]
};

// Show Selected Category
function showCategory(category) {
    document.getElementById("foodItems").style.display = "block";
    document.getElementById("categoryTitle").innerText = category.toUpperCase();

    let foodList = document.getElementById("foodList");
    foodList.innerHTML = "";

    foodItems[category].forEach(item => {
        let div = document.createElement("div");
        div.classList.add("food-item");
        div.innerText = `${item.name} - ₹${item.price} ➕`;
        div.onclick = () => addToCart(item.name, item.price);
        foodList.appendChild(div);
    });
}

// Cart Functionality
let cart = [];

function addToCart(itemName, price) {
    let existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity++; // Increase quantity if item already exists
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    
    updateCartCount();
}

function updateCartCount() {
    document.getElementById("cartCount").innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Go to Cart
function goToCart() {
    document.getElementById("categoryPage").style.display = "none";
    document.getElementById("cartPage").style.display = "block";

    displayCartItems(); // Show cart items
}

// Function to display cart items
function displayCartItems() {
    let cartList = document.getElementById("cart");
    let totalElement = document.getElementById("total");
    cartList.innerHTML = ""; // Clear old cart list

    let totalPrice = 0;

    cart.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            ${item.name} - ₹${item.price} x ${item.quantity} 
            <button class="delete-btn" onclick="removeFromCart(${index})">❌</button>
        `;
        cartList.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    totalElement.innerText = totalPrice; // Update total price
}

// Function to reduce item quantity or remove if it reaches 0
function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--; // Reduce quantity by 1
    } else {
        cart.splice(index, 1); // Remove item if quantity is 1
    }
    
    displayCartItems(); // Refresh cart list
    updateCartCount(); // Update count
}

// Payment & QR Code
function goToPayment() {
    document.getElementById("cartPage").style.display = "none";
    document.getElementById("paymentPage").style.display = "block";
    document.getElementById("finalTotal").innerText = document.getElementById("total").innerText;
}

function generateQRCode() {
    document.getElementById("paymentPage").style.display = "none";
    document.getElementById("qrPage").style.display = "block";

    // Clear previous QR code
    let qrElement = document.getElementById("qrcode");
    qrElement.innerHTML = ""; // Ensure old QR code is removed

    new QRCode(qrElement, {
        text: `Order: ${cart.map(c => `${c.name} x${c.quantity}`).join(", ")} | Total: ₹${document.getElementById("total").innerText}`,
        width: 150,
        height: 150
    });
}
