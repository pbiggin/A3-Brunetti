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
