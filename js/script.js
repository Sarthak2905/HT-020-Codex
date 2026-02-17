const menuData = [
  { name: "Cappuccino", category: "coffee", price: 120, img: "images/coffee/cappuccino.jpg" },
  { name: "Cold Coffee", category: "coffee", price: 150, img: "images/coffee/cold-coffee.jpg" },
  { name: "Espresso", category: "coffee", price: 100, img: "images/coffee/espresso.jpg" },

  { name: "Veg Sandwich", category: "snacks", price: 90, img: "images/snacks/sandwich.jpg" },
  { name: "Cheese Burger", category: "snacks", price: 160, img: "images/snacks/burger.jpg" },
  { name: "French Fries", category: "snacks", price: 110, img: "images/snacks/fries.jpg" },

  { name: "Brownie", category: "dessert", price: 140, img: "images/dessert/brownie.jpg" },
  { name: "Ice Cream", category: "dessert", price: 80, img: "images/dessert/icecream.jpg" }
];

const menu = document.getElementById("menu");
const searchInput = document.getElementById("searchInput");

let currentCategory = "all";

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(item) {
  let cart = getCart();

  const existing = cart.find(i => i.name === item.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
  showToast(item.name + " added to cart", "success");
  
  
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const btn = document.querySelector(".cart-btn");
  btn.textContent = `🛒 View Cart (${count})`;
}

function renderMenu(items) {
  if (items.length === 0) {
    menu.innerHTML = "<p style='grid-column:1/-1;text-align:center;'>No items found</p>";
    return;
  }

  menu.innerHTML = items.map(item => `
    <div class="card">
      <img src="${item.img}" alt="${item.name}">
      <div class="card-body">
        <h3>${item.name}</h3>
        <div class="price">₹ ${item.price}</div>
        <button onclick='addToCart(${JSON.stringify(item)})'>
          Add to Cart
        </button>
      </div>
    </div>
  `).join("");
}

function filterMenu(category, btn) {
  currentCategory = category;

  document.querySelectorAll(".category button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  applyFilters();
}

function applyFilters() {
  let filtered = menuData;

  if (currentCategory !== "all") {
    filtered = filtered.filter(item => item.category === currentCategory);
  }

  const searchText = searchInput.value.toLowerCase();
  if (searchText) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchText)
    );
  }

  renderMenu(filtered);
}

renderMenu(menuData);
updateCartCount();


function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message;

  toast.className = "toast show " + type;

  setTimeout(() => {
    toast.className = "toast";
  }, 2500);
}
