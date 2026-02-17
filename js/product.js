const container = document.getElementById("productContainer");
const products = getData("products");

products.forEach(product => {
  container.innerHTML += `
    <div class="card">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <button onclick="addToCart('${product.id}')">Add to Cart</button>
    </div>
  `;
});

function addToCart(id) {
  let cart = getData("cart");
  const product = products.find(p => p.id === id);

  cart.push(product);
  setData("cart", cart);

  alert("Added to cart!");
}
