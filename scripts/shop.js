const allProducts = [
    { name: 'Gaming Mouse', price: 50, brand: 'Brand A', image: 'https://via.placeholder.com/150?text=Gaming+Mouse' },
    { name: 'Mechanical Keyboard', price: 120, brand: 'Brand B', image: 'https://via.placeholder.com/150?text=Mechanical+Keyboard' },
    { name: 'Headset', price: 80, brand: 'Brand A', image: 'https://via.placeholder.com/150?text=Headset' },
    { name: 'MacBook M1', price: 1599, brand: 'Brand B', image: 'https://via.placeholder.com/150?text=MacBook+M1' },
    { name: 'Gaming Monitor', price: 299, brand: 'Brand A', image: 'https://via.placeholder.com/150?text=Gaming+Monitor' },
    { name: 'Iphone 16', price: 899, brand: 'Brand A', image: 'https://via.placeholder.com/150?text=Iphone+16' }
];

document.getElementById('priceRange').addEventListener('input', function () {
    document.getElementById('priceValue').textContent = this.value;
});

document.getElementById('applyFilters').addEventListener('click', () => {
    const price = document.getElementById('priceRange').value;
    const brands = [];
    if (document.getElementById('brandA').checked) brands.push('Brand A');
    if (document.getElementById('brandB').checked) brands.push('Brand B');

    filterProducts(price, brands);
});

function filterProducts(price, brands) {
    const filteredProducts = allProducts.filter(product =>
        product.price <= price && (brands.length === 0 || brands.includes(product.brand))
    );
    displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = products.map(product =>
        `<div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button onclick="addToCart(event, '${product.name}', ${product.price})">Add to Cart</button>
        </div>`
    ).join('');
}

// Display all products initially
displayFilteredProducts(allProducts);

let cart = [];
const deliveryCost = 5;
const taxRate = 0.07;

function addToCart(event, product, price) {
    event.stopPropagation();
    cart.push({ product, price });
    updateCartSummary();
    showNotification(`${product} was added to your cart!`);
}

function updateCartSummary() {
    const cartItemsList = document.getElementById('cartItems');
    cartItemsList.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        cartItemsList.innerHTML += `
            <li>
                ${item.product} - $${item.price.toFixed(2)}
                <button onclick="removeFromCart(${index})">Delete</button>
            </li>
        `;
        subtotal += item.price;
    });

    const tax = subtotal * taxRate;
    const total = subtotal + tax + deliveryCost;

    document.getElementById('subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `Tax: $${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById('cartCount').textContent = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartSummary();
}

function openCart() {
    updateCartSummary();
    document.getElementById('cartModal').style.display = 'flex';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before checkout.");
    } else {
        alert("Thank you for your purchase!");
        cart = [];
        updateCartSummary();
        closeCart();
    }
}

function openProductDetails(name, price, image) {
    const url = `product.html?name=${encodeURIComponent(name)}&price=${price}&image=${encodeURIComponent(image)}`;
    window.location.href = url;
}

window.onclick = function (event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        closeCart();
    }
}
