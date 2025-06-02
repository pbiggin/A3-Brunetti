function loadSuggestions() {
  const suggestionList = document.getElementById("item-list");

  suggestions.forEach((suggestion) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product", "products__suggestion");

    productCard.innerHTML = `
        <a href="${suggestion.link}" class="product-link">
          <img src="${suggestion.image}" alt="${suggestion.name}" />
          <p>${suggestion.name}</p>
        </a>
      `;

    suggestionList.appendChild(productCard);
  });
}

loadSuggestions();
