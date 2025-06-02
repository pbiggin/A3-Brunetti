let productsPerPage = 12;
let currentPage = 0;
let isExpanded = false;


function loadProducts() {
  const productList = document.getElementById("product-list");
  const start = currentPage * productsPerPage;
  const end = start + productsPerPage;
  const productsToLoad = products.slice(start, end);

  productsToLoad.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <a href="${product.link}" class="product-link"> 
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.price}</p>
      </a>
    `;

    productList.appendChild(productDiv);
  });

  currentPage++;

  if (currentPage * productsPerPage >= products.length) {
    document.getElementById("load-more").style.display = "none";
    isExpanded = true;
  }
}


document.getElementById("load-more").addEventListener("click", () => {
  if (isExpanded) {
    loadLessProducts();
  } else {
    loadProducts();
  }
});


loadProducts();

// USED COPILOT TO ASSIST WITH THIS CODE.

document.getElementById("apply-filters").addEventListener("click", () => {
  const selectedType = document.querySelector(
    'input[name="product-type"]:checked'
  )?.value;

  const halalSelected =
    document.querySelector('input[name="halal"]:checked') !== null;
  const glutenFriendlySelected =
    document.querySelector('input[name="glutenFriendly"]:checked') !== null;

  const filteredProducts = products.filter((product) => {
    const matchesType = !selectedType || product.type === selectedType;
    const matchesHalal = !halalSelected || product.halal === true;
    const matchesGlutenFriendly =
      !glutenFriendlySelected || product.glutenFriendly === true;

    return matchesType && matchesHalal && matchesGlutenFriendly;
  });

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  filteredProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
        <a href="${product.link}" class="product-link"> 
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.price}</p>
        </a>
      `;

    productList.appendChild(productDiv);
  });
});

document.getElementById("clear-filters").addEventListener("click", () => {
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
        <a href="${product.link}" class="product-link"> 
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.price}</p>
        </a>
      `;

    productList.appendChild(productDiv);
  });
});

// end of generated code


document.getElementById("toggle-filters").addEventListener("click", () => {
  const filterForm = document.getElementById("filter-form");
  filterForm.classList.toggle("hidden");
});
