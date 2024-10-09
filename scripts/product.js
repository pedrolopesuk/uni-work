// Helper function to get query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        price: params.get('price'),
        image: params.get('image'),
        description: params.get('description') || 'This is a high-quality product that offers excellent performance and durability. You can trust this product to meet your needs for both casual and professional use.'
    };
}

// Display the product details based on the query parameters
function displayProductDetails() {
    const { name, price, image, description } = getQueryParams();

    if (name && price && image) {
        document.getElementById('productName').textContent = name;
        document.getElementById('productPrice').textContent = `$${parseFloat(price).toFixed(2)}`;
        document.getElementById('productImage').src = image;
        document.getElementById('productDescription').textContent = description;
    }
}

// Add the product to the cart when "Add to Cart" button is clicked
document.getElementById('addToCartBtn').addEventListener('click', () => {
    const { name, price } = getQueryParams();
    if (name && price) {
        // Add the product to the cart
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ product: name, price: parseFloat(price) });
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show a confirmation or redirect back to the shop
        alert(`${name} was added to your cart!`);
    }
});

// Initialize the page with the product details
displayProductDetails();
