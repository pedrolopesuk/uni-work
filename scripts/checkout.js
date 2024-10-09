// Simulate getting cart data from localStorage or session
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render the product list and calculate the total price
function renderCheckout() {
    const productList = document.getElementById('productList');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.product}</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        productList.appendChild(li);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to handle payment process
function pay() {
    const emailInput = document.getElementById('emailInput').value;
    const loadingElement = document.getElementById('loading');
    const successMessage = document.getElementById('successMessage');
    const productSummary = document.getElementById('productSummary');
    const paymentSection = document.querySelector('.payment-section'); // Reference the payment section

    // Validate the email input
    if (!emailInput.trim()) {
        alert('Please enter a valid email address.');
        return;
    }

    // Show loading spinner
    loadingElement.style.display = 'block';

    // Simulate payment process delay
    setTimeout(() => {
        // Hide loading spinner
        loadingElement.style.display = 'none';

        // Hide product summary and payment section
        productSummary.style.display = 'none';
        paymentSection.style.display = 'none'; // Hide payment section after success

        // Show success message
        successMessage.style.display = 'block';

        // Display the email in the success message
        document.getElementById('customerEmail').textContent = emailInput;

        // Clear cart after successful purchase
        localStorage.removeItem('cart');
    }, 2000);
}

// Function to return to the store
function returnToStore() {
    window.location.href = 'index.html'; // Change to your store URL
}

// Load the checkout details when the page loads
window.onload = function() {
    renderCheckout();
}
