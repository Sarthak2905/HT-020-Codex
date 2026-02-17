const menuData = [
  { name: "Chana dal", category: "Grocery", price: 120, img: "images/Chana dal.jpg" },
  { name: "Coriander", category: "Grocery", price: 150, img: "images/Coriander.jpg" },
  { name: "Jaggery", category: "Grocery", price: 100, img: "images/Jaggery.jpg" },
  { name: "phenyl", category: "Grocery", price: 100, img: "images/phenyl.jpg" },
  { name: "Sugar", category: "Grocery", price: 100, img: "images/Sugar.jpg" },
  { name: "sunflower oil", category: "Grocery", price: 100, img: "images/sunflower oil.jpg" },
  { name: "Turmeric powder", category: "Grocery", price: 100, img: "images/Turmeric powder.jpg" },
  { name: "wheat", category: "Grocery", price: 100, img: "images/wheat.jpg" },

  { name: "Aloo Bhujiya", category: "snacks", price: 90, img: "images/Aloo Bhujiya.jpg" },
  { name: "Biscuit", category: "snacks", price: 160, img: "images/Biscuit.jpg" },
  { name: "Chips", category: "snacks", price: 110, img: "images/Chips.jpg" },
  { name: "Corn Flakes", category: "snacks", price: 110, img: "images/Corn Flakes.jpg" },
  { name: "oats", category: "snacks", price: 110, img: "images/oats.jpg" },
  { name: "Pasta", category: "snacks", price: 110, img: "images/Pasta.jpg" },

  { name: "Brinjal", category: "VegeTables", price: 140, img: "images/Brinjal.jpg" },
  { name: "Cabbage", category: "VegeTables", price: 80, img: "images/Cabbage.jpg" },
  { name: "Carrot", category: "VegeTables", price: 80, img: "images/Carrot.jpg" },
  { name: "Garlic", category: "VegeTables", price: 80, img: "images/Garlic.jpg" },
  { name: "Lady Finger", category: "VegeTables", price: 80, img: "images/Lady Finger.jpg" },
  { name: "Onion", category: "VegeTables", price: 80, img: "images/Onion.jpg" },
  { name: "Potato", category: "VegeTables", price: 80, img: "images/Potato.jpg" },
  { name: "Spinach", category: "VegeTables", price: 80, img: "images/Spinach.jpg" },
  { name: "Tomato", category: "VegeTables", price: 80, img: "images/Tomato.jpg" },
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
