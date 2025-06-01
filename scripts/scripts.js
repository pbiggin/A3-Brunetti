let productsPerPage = 12;
let currentPage = 0;
let isExpanded = false

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
      document.getElementById("load-more").innerText = "Load Less";
      isExpanded = true;
    }
  }

  // USED COPILOT TO ASSIST WITH THIS CODE. 

  document.getElementById("apply-filters").addEventListener("click", () => {
    // Get selected product types
    const selectedTypes = Array.from(
      document.querySelectorAll('input[name="product-type"]:checked')
    ).map((checkbox) => checkbox.value);
  
    // Get selected additional categories
    const halalSelected = document.querySelector('input[name="halal"]:checked') !== null;
    const glutenFriendlySelected = document.querySelector('input[name="glutenFriendly"]:checked') !== null;
  
    // Filter products based on selected criteria
    const filteredProducts = products.filter((product) => {
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      const matchesHalal = !halalSelected || product.halal === true;
      const matchesGlutenFriendly = !glutenFriendlySelected || product.glutenFriendly === true;
  
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


function loadLessProducts() {
    const productList = document.getElementById("product-list");
    const allProducts = Array.from(productList.children);
  
    const productsToRemove = allProducts.slice(productsPerPage);
    productsToRemove.forEach((product) => product.remove());
  
    currentPage = 1; 
    document.getElementById("load-more").innerText = "Load More";
    isExpanded = false;
  }
  

document.getElementById("load-more").addEventListener("click", () => {
    if (isExpanded) {
      loadLessProducts(); 
    } else {
      loadProducts(); 
    }
  });

loadProducts();


function toggleOverlay() {
  const overlay = document.querySelector(".overlay");
  overlay.classList.toggle("hidden");
}
