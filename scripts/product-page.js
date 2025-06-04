function loadAlternatives() {
  const alternativesList = document.getElementById("alternatives-list");

  alternatives.forEach((alternative) => {
    const altCard = document.createElement("div");
    altCard.classList.add("product", "products__suggestion");

    altCard.innerHTML = `
          <a href="${alternative.link}" class="product-link">
            <img src="${alternative.image}" alt="${alternative.name}" />
            <p>${alternative.name}</p>
          </a>
        `;

    alternativesList.appendChild(altCard);
  });
}

loadAlternatives();

document.querySelectorAll(".item__thumbnail img").forEach((thumbnail) => {
    thumbnail.addEventListener("click", (event) => {
      const mainImage = document.getElementById("main-product-image");
      const clickedThumbnail = event.target;
  
      const tempSrc = mainImage.getAttribute("src");
      mainImage.setAttribute("src", clickedThumbnail.getAttribute("src"));
    });
  });

  document.querySelectorAll(".info-box__tab").forEach((button) => {
    button.addEventListener("click", (event) => {
      const tabId = event.target.getAttribute("data-tab") || event.target.id; 
      const sections = document.querySelectorAll(".info-box__section"); 
      const tabs = document.querySelectorAll(".info-box__tab"); 
  

      sections.forEach((section) => {
        section.classList.remove("active");
      });
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
  

      const activeSection = document.getElementById(tabId);
      if (activeSection) {
        activeSection.classList.add("active");
      }
      event.target.classList.add("active"); 
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const dropdownButton = document.getElementById("portion-size");
    const dropdownMenu = document.querySelector(".dropdown-input");
    const dropdownItems = document.querySelectorAll(".dropdown-item");
  
    dropdownButton.addEventListener("click", () => {
      dropdownMenu.classList.toggle("hidden");
    });
  
    dropdownItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        const selectedSize = event.target.textContent; 
        dropdownButton.textContent = selectedSize; 
        dropdownMenu.classList.add("hidden"); 
      });
    });
  
    document.addEventListener("click", (event) => {
      if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add("hidden");
      }
    });
  });