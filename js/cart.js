const cartContainer = document.getElementById("cartContainer");
let cart = getData("cart");
let total = 0;

cart.forEach(item => {
  total += item.price;

  cartContainer.innerHTML += `
    <div class="card">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
    </div>
  `;
});

document.getElementById("totalAmount").innerText = "Total: ₹" + total;

function placeOrder() {
  let orders = getData("orders");

  const newOrder = {
    id: Date.now(),
    items: cart,
    total: total,
    date: new Date().toLocaleDateString()
  };

  orders.push(newOrder);
  setData("orders", orders);

  localStorage.removeItem("cart");
  alert("Order placed successfully!");
  location.reload();
}
