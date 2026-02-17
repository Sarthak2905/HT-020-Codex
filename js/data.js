function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

if (!localStorage.getItem("products")) {
  const products = [
    { id: "1", name: "Rice", price: 100, stock: 20 },
    { id: "2", name: "Chips", price: 20, stock: 50 },
    { id: "3", name: "Coke", price: 40, stock: 30 }
  ];
  setData("products", products);
}
