document.addEventListener("DOMContentLoaded", () => {

  const billDiv = document.getElementById("bill");
  const totalEl = document.getElementById("total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    if (!cart.length) {
      billDiv.innerHTML = "<p>Your cart is empty.</p>";
      totalEl.textContent = "₹ 0";
      return;
    }

    let total = 0;

    billDiv.innerHTML = cart.map((item, index) => {
      const amt = item.price * item.qty;
      total += amt;

      return `
       <div class="bill-item">
  
  <div class="item-details">
    <div class="item-name">${item.name}</div>

    <div class="qty-controls">
      <button onclick="decreaseQty(${index})">−</button>
      <span class="qty-number">${item.qty}</span>
      <button onclick="increaseQty(${index})">+</button>
      <button onclick="removeItem(${index})" class="remove">🗑</button>
    </div>
  </div>

  <div class="item-price">₹ ${amt}</div>

</div>

      `;
    }).join("");

    totalEl.textContent = "₹ " + total;
  }

  window.increaseQty = function(index) {
    cart[index].qty++;
    saveCart();
    renderCart();
  }

  window.decreaseQty = function(index) {
    if (cart[index].qty > 1) {
      cart[index].qty--;
    } else {
      cart.splice(index, 1);
    }
    saveCart();
    renderCart();
  }

  window.removeItem = function(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  renderCart();
});



