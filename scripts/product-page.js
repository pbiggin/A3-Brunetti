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
  
  