// used copilot here to assist with creating this feature //
const products = [
  {
    name: "Biscoff Gelato Cake",
    type: "gelato",
    image: "../images/placeholder.webp",
  },
  {
    name: "Black forest",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  {
    name: "Bombe Alaska Gelato Cake",
    type: "gelato",
    image: "../images/placeholder.webp",
  },
  {
    name: "Brunetti Classico Rocher",
    type: "gelato",
    image: "../images/placeholder.webp",
  },
  {
    name: "Cassata Sicliana",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  {
    name: "Chocolate Mud Cake",
    type: "standard",
    image: "../images/placeholder.webp",
  },
  {
    name: "Chocolate Souffle",
    type: "standard",
    image: "../images/placeholder.webp",
  },
  {
    name: "Classic Black Forest",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  {
    name: "Classic White Forest",
    type: "standard",
    image: "../images/placeholder.webp",
  },
  { name: "Con Amore", type: "premium", image: "../images/placeholder.webp" },
  {
    name: "Cookies & Cream Cheesecake",
    type: "standard",
    image: "../images/placeholder.webp",
  },
  {
    name: "Croquembuche",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  { name: "Crostata", type: "standard", image: "../images/placeholder.webp" },
  { name: "Fleur", type: "premium", image: "../images/placeholder.webp" },
  { name: "Francese", type: "premium", image: "../images/placeholder.webp" },
  {
    name: "Giant Cannoli Cake",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  {
    name: "Julio Cesere",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  {
    name: "Lemon Mergingue Tart",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  { name: "Lemon Tart", type: "standard", image: "../images/placeholder.webp" },
  { name: "Millefoglie", type: "premium", image: "../images/placeholder.webp" },
  {
    name: "Mixed Berry Charlotte",
    type: "standard",
    image: "../images/placeholder.webp",
  },
  {
    name: "Mixed Fruit Tart",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  {
    name: "New York cheesecake",
    type: "standard",
    image: "../images/placeholder.webp",
  },
  {
    name: "Nocciolato Cake",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  { name: "Opera", type: "standard", image: "../images/placeholder.webp" },
  {
    name: "Pear & Cheese Crumble",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  { name: "Profiterole", type: "premium", image: "../images/placeholder.webp" },
  {
    name: "Promesse D'amore Tower",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  {
    name: "Rocher Gelato Cake",
    type: "gelato",
    image: "../images/placeholder.webp",
  },
  { name: "Royale", type: "standard", image: "../images/placeholder.webp" },
  { name: "Sotto Bosco", type: "premium", image: "../images/placeholder.webp" },
  {
    name: "Strawberry Cheesecake Gelato Cake",
    type: "gelato",
    image: "../images/placeholder.webp",
  },
  {
    name: "Strawberry Tart",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  { name: "Svizzera", type: "standard", image: "../images/placeholder.webp" },
  {
    name: "Tiramisu Semifreddo",
    type: "premium",
    image: "../images/placeholder.webp",
  },
  { name: "Torta", type: "premium", image: "../images/placeholder.webp" },
  {
    name: "Torta Di Arancia",
    type: "standard",
    image: "../images/placeholder.webp",
  },
];

let productsPerPage = 12;
let currentPage = 0;
let isExpanded = false;

// Function to load products
function loadProducts() {
  const productList = document.getElementById("product-list");
  const start = currentPage * productsPerPage;
  const end = start + productsPerPage;
  const productsToLoad = products.slice(start, end);

  productsToLoad.forEach((product) => {
    // Determine the price based on the product type

    let price;
    if (product.type === "premium") {
      price = "From $46.00";
    } else if (product.type === "standard") {
      price = "From $43.00";
    } else if (product.type === "gelato") {
      price = "$65.00";
    } else {
      price = "Price not available";
    }
    // Create product card
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${price}</p>
      `;

    productList.appendChild(productDiv);
  });

  currentPage++;

  if (currentPage * productsPerPage >= products.length) {
    document.getElementById("load-more").innerText = "Load Less";
    isExpanded = true;
  }
}

function loadLessProducts() {
  const productList = document.getElementById("product-list");
  const allProducts = Array.from(productList.children);

  // Remove products beyond the first batch
  const productsToRemove = allProducts.slice(productsPerPage);
  productsToRemove.forEach((product) => product.remove());

  currentPage = 1; // Reset to the first page
  document.getElementById("load-more").innerText = "Load More";
  isExpanded = false;
}

// load button listeners
document.getElementById("load-more").addEventListener("click", () => {
  if (isExpanded) {
    loadLessProducts();
  } else {
    loadProducts();
  }
});

loadProducts();


function toggleOverlay () {
  const overlay = document.querySelector(".overlay");
    overlay.classList.toggle("hidden");
}
