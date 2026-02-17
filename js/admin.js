const adminContainer = document.getElementById("adminProducts");

function loadProducts() {
  const products = getData("products");
  adminContainer.innerHTML = "";

  products.forEach(p => {
    adminContainer.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <p>Stock: ${p.stock}</p>
      </div>
    `;
  });
}

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;

  const products = getData("products");

  products.push({
    id: Date.now().toString(),
    name,
    price: Number(price),
    stock: Number(stock)
  });

  setData("products", products);
  loadProducts();
}

loadProducts();
