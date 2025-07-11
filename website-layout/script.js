const products = [
  { id: 1, name: "Wireless Headphones", image: "https://via.placeholder.com/200x150", price: 49 },
  { id: 2, name: "Smart Watch", image: "https://via.placeholder.com/200x150", price: 79 },
  { id: 3, name: "Bluetooth Speaker", image: "https://via.placeholder.com/200x150", price: 29 },
  { id: 4, name: "Laptop Stand", image: "https://via.placeholder.com/200x150", price: 19 },
];

let cartCount = 0;

const productList = document.getElementById("product-list");
const cartCountSpan = document.getElementById("cart-count");

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
    <button onclick="addToCart()">Add to Cart</button>
  `;
  productList.appendChild(card);
});

function addToCart() {
  cartCount++;
  cartCountSpan.textContent = cartCount;
}
