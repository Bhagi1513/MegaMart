const API_URL = "https://6a2cdb563e2b60ab03900fb5.mockapi.io/api/V1/products";

const search = document.getElementById("search-box");
const Productscontainer = document.getElementById("products-container");
const menuToggle = document.getElementById("menutoggle");
const navlinks = document.getElementById("nav-links");
const loading = document.getElementById("loading");

let products = [];

// Load existing cart and wishlist from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Search functionality
search.addEventListener("input", () => {
    const searchtext = search.value.toLowerCase();

    const filterProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchtext)
    );

    displayproducts(filterProducts);
});

// Fetch products from API
async function getUser() {
    loading.innerHTML = "Loading...";

    const response = await fetch(API_URL);
    const data = await response.json();

    products = data;

    console.log(products);

    loading.innerHTML = "";

    displayproducts(products);
}

getUser();

// Display products
function displayproducts(products) {
    Productscontainer.innerHTML = "";

    products.forEach(product => {
        Productscontainer.innerHTML += `
        <div class="card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>

            <button class="cart-btn"
                onclick="addToCart('${product.id}')">
                🛒 Add to Cart
            </button>

            <button class="wish-btn"
                onclick="addToWishlist('${product.id}')">
                ❤️ Wishlist
            </button>
        </div>
        `;
    });
}

// Add product to cart
function addToCart(id) {

    const product = products.find(item => item.id == id);

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Added to Cart");
}

// Add product to wishlist
function addToWishlist(id) {

    const product = products.find(item => item.id == id);

    wishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert("Added to Wishlist");
}

// Mobile menu
function togglemenu() {
    document
        .getElementById("nav-links")
        .classList.toggle("active");
}