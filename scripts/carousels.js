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



/** scrollable on desktop */

let outerContainer = document.querySelector(".products__outer-scroll");
let container = document.querySelector(".products__scroll");
let links = container.querySelectorAll("a");

container.style.left = "0px";

let pressed = false;
let startX;
let x;
let isDragging = false;
let dragThreshold = 5;
let velocity = 0; // Track the velocity of the drag
let lastX = 0; // Track the last mouse position
let momentumFrame; // Reference for the momentum animation

const disablePointerEvents = () => {
  links.forEach((link) => {
    link.style.pointerEvents = "none";
  });
};

const enablePointerEvents = () => {
  links.forEach((link) => {
    link.style.pointerEvents = "auto";
  });
};

let boundItems = () => {
  const outerWidth = outerContainer.offsetWidth;
  const innerWidth = container.offsetWidth;

  const left = parseInt(container.style.left, 10) || 0;

  if (left > 0) {
    container.style.left = "0px";
    velocity = 0; // Stop momentum if at the edge
  } else if (left < -(innerWidth - outerWidth)) {
    container.style.left = `-${innerWidth - outerWidth}px`;
    velocity = 0; // Stop momentum if at the edge
  }
};

const applyMomentum = () => {
  if (Math.abs(velocity) > 0.1) { // Stop momentum when velocity is low
    container.style.left = `${parseInt(container.style.left, 10) + velocity}px`;
    velocity *= 0.95; // Apply friction to reduce velocity
    boundItems();
    momentumFrame = requestAnimationFrame(applyMomentum);
  } else {
    cancelAnimationFrame(momentumFrame); // Stop animation
  }
};


outerContainer.addEventListener("mousedown", (e) => {
  e.preventDefault();
  pressed = true;
  startX = e.clientX - container.offsetLeft;
  container.style.cursor = "grabbing";
});

outerContainer.addEventListener("mousemove", (e) => {
  if (!pressed) return;
  e.preventDefault();

  x = e.clientX;
  const movement = Math.abs(x - startX);
  if (movement > dragThreshold) {
    isDragging = true;
    disablePointerEvents(); // Disable links during drag
  }

  velocity = x - lastX; // Calculate velocity based on mouse movement
  lastX = x; // Update lastX for the next frame

  container.style.left = `${x - startX}px`;
  boundItems();
});

outerContainer.addEventListener("mouseup", (e) => {
  pressed = false;
  container.style.cursor = "grab";
  enablePointerEvents(); // Re-enable links after mouseup

  if (isDragging) {
    e.preventDefault(); // Prevent click if dragging occurred
    applyMomentum(); // Start momentum scrolling
  }

  isDragging = false; // Reset dragging state
});

container.addEventListener("click", (e) => {
  console.log("Click event triggered");
  console.log("Is dragging:", isDragging);

  if (e.target.tagName === "A" && !isDragging) {
    console.log("Link clicked:", e.target.href);
  }
});