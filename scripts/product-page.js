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

function initializeThumbnailSwitcher() {
  const mainImage = document.getElementById("main-product-image");
  document.querySelectorAll(".item__thumbnail img").forEach((thumbnail) => {
    thumbnail.addEventListener("click", (event) => {
      const clickedThumbnail = event.target;
      const tempSrc = mainImage.getAttribute("src");
      mainImage.setAttribute("src", clickedThumbnail.getAttribute("src"));
    });
  });
}

function initializeTabSwitcher() {
  const tabs = document.querySelectorAll(".info-box__tab");
  const sections = document.querySelectorAll(".info-box__section");

  tabs.forEach((button) => {
    button.addEventListener("click", (event) => {
      const tabId = event.target.getAttribute("data-tab") || event.target.id;

      sections.forEach((section) => section.classList.remove("active"));
      tabs.forEach((tab) => tab.classList.remove("active"));

      const activeSection = document.getElementById(tabId);
      if (activeSection) activeSection.classList.add("active");
      event.target.classList.add("active");
    });
  });
}

function initializeDropdown() {
  const dropdownButton = document.getElementById("portion-size");
  const dropdownMenu = document.querySelector(".dropdown-input");
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      dropdownButton.textContent = event.target.textContent;
      dropdownMenu.classList.add("hidden");
    });
  });

  document.addEventListener("click", (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.add("hidden");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadAlternatives();
  initializeThumbnailSwitcher();
  initializeTabSwitcher();
  initializeDropdown();
});