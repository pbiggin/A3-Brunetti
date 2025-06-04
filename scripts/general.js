//** used Copiliot to reorganise functions to work on all pages */

document.addEventListener("DOMContentLoaded", () => {
  initializeCart();

  initializeProductScroll();

  initializeOverlayToggle();
});

/**
 * Initializes the cart functionality.
 */

function initializeCart() {
  const cartButton = document.getElementById("cart-icon");
  const cartContainer = document.querySelector(".cart-container");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const orderButton = document.querySelector(".standard-btn.center.headspace");

  if (!cartButton || !cartContainer || !cartItems || !cartTotal || !orderButton) {
    return; // Exit if cart elements are not present
  }

  const cart = [];
  const confirmationTextId = "confirmation-text";

  // Add item to cart
  orderButton.addEventListener("click", () => {
    const productName = document.querySelector(".content__text h2").textContent;
    const productPrice = 65.0;
    const portionSize = document.getElementById("portion-size").textContent;

    if (portionSize === "Select Portion Size") {
      alert("Please select a portion size before adding to the cart.");
      return;
    }

    const cartItem = {
      name: productName,
      price: productPrice,
      portion: portionSize,
    };

    cart.push(cartItem);
    updateCart();

    // Display confirmation text below the "ORDER NOW" button
    let confirmationText = document.getElementById(confirmationTextId);
    if (!confirmationText) {
      confirmationText = document.createElement("p");
      confirmationText.id = confirmationTextId;
      confirmationText.style.color = "green";
      confirmationText.style.marginTop = "1rem";
      confirmationText.style.transition = "opacity 2s ease";
      orderButton.parentElement.appendChild(confirmationText);
    }
    confirmationText.textContent = `Item added to cart`;

    confirmationText.style.opacity = "1";
    setTimeout(() => {
      confirmationText.style.opacity = "0";
      setTimeout(() => {
        confirmationText.remove();
      }, 2000);
    }, 3000);
  });

  // Update cart display
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.portion} - $${item.price.toFixed(2)}`;
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");
      removeBtn.addEventListener("click", () => {
        cart.splice(index, 1);
        updateCart();
      });
      li.appendChild(removeBtn);
      cartItems.appendChild(li);
      total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Show cart on hover
  cartButton.addEventListener("mouseenter", () => {
    cartContainer.classList.remove("hidden");
  });

  cartContainer.addEventListener("mouseenter", () => {
    cartContainer.classList.remove("hidden");
  });

  cartContainer.addEventListener("mouseleave", () => {
    cartContainer.classList.add("hidden");
  });
}

/**
 * Initializes the product scroll functionality.
 */
function initializeProductScroll() {
  const outerContainer = document.querySelector(".products__outer-scroll");
  const container = document.querySelector(".products__scroll");

  if (!outerContainer || !container) {
    return; // Exit if product scroll elements are not present
  }

  const links = container.querySelectorAll("a");
  container.style.left = "0px";

  let pressed = false;
  let startX;
  let x;
  let isDragging = false;
  let dragThreshold = 5;
  let velocity = 0;
  let lastX = 0;
  let momentumFrame;

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

  const boundItems = () => {
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
    if (Math.abs(velocity) > 0.1) {
      // Stop momentum when velocity is low
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
      disablePointerEvents();
    }

    velocity = x - lastX; // Calculate velocity based on mouse movement
    lastX = x; // Update lastX for the next frame

    container.style.left = `${x - startX}px`;
    boundItems();
  });

  outerContainer.addEventListener("mouseup", (e) => {
    pressed = false;
    container.style.cursor = "grab";
    enablePointerEvents();
    if (isDragging) {
      e.preventDefault();
      applyMomentum();
    }

    isDragging = false;
  });
}

/**
 * Initializes the overlay toggle functionality.
 */
function initializeOverlayToggle() {
  const overlay = document.querySelector(".overlay");
  const hamburgerButton = document.querySelector(".hamburger");

  if (!overlay || !hamburgerButton) {
    return; // Exit if overlay elements are not present
  }

  hamburgerButton.addEventListener("click", () => {
    overlay.classList.toggle("hidden");
  });
}