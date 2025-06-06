let productsPerPage = 12;
let currentPage = 0;
let isExpanded = false;

function createProductElement(product) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  productDiv.innerHTML = `
    <a href="${product.link}" class="product-link"> 
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    </a>
  `;

  const productImage = productDiv.querySelector(".product-image");
  productImage.addEventListener("load", () => productImage.classList.add("loaded"));
  if (productImage.complete) productImage.classList.add("loaded");

  return productDiv;
}

function loadProducts() {
  const productList = document.getElementById("product-list");
  const start = currentPage * productsPerPage;
  const end = start + productsPerPage;
  const productsToLoad = products.slice(start, end);

  productsToLoad.forEach((product) => productList.appendChild(createProductElement(product)));

  currentPage++;
  if (currentPage * productsPerPage >= products.length) {
    document.getElementById("load-more").style.display = "none";
    isExpanded = true;
  }
}

function applyFilters() {
  const selectedType = document.querySelector('input[name="product-type"]:checked')?.value;
  const halalSelected = document.querySelector('input[name="halal"]:checked') !== null;
  const glutenFriendlySelected = document.querySelector('input[name="glutenFriendly"]:checked') !== null;

  return products.filter((product) => {
    const matchesType = !selectedType || product.type === selectedType;
    const matchesHalal = !halalSelected || product.halal === true;
    const matchesGlutenFriendly = !glutenFriendlySelected || product.glutenFriendly === true;
    return matchesType && matchesHalal && matchesGlutenFriendly;
  });
}

function renderProducts(productList, productArray) {
  productList.innerHTML = "";
  productArray.forEach((product) => productList.appendChild(createProductElement(product)));
}

document.getElementById("load-more").addEventListener("click", () => {
  isExpanded ? loadLessProducts() : loadProducts();
});

document.getElementById("apply-filters").addEventListener("click", () => {
  const productList = document.getElementById("product-list");
  const filteredProducts = applyFilters();
  renderProducts(productList, filteredProducts);
});

document.getElementById("clear-filters").addEventListener("click", () => {
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => (checkbox.checked = false));
  const productList = document.getElementById("product-list");
  renderProducts(productList, products);
});

document.getElementById("toggle-filters").addEventListener("click", () => {
  document.getElementById("filter-form").classList.toggle("hidden");
});

loadProducts();

