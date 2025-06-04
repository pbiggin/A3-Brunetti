//** used Copiliot to reorganise functions (via initialization) to work on all pages */

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

  // Retrieve cart data from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

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
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        updateCart();
      });
      li.appendChild(removeBtn);
      cartItems.appendChild(li);
      total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Initialize cart display
  updateCart();

  // Add item to cart
  orderButton.addEventListener("click", () => {
    const productName = document.querySelector(".content__text h2").textContent;
    const productPrice = 65.0; // Example price, replace with dynamic value if needed
    const portionSize = document.getElementById("portion-size").textContent;

    if (portionSize === "Select Portion Size") {
      alert("Please select a portion size before adding to the cart.");
      return;
    }

    const cartItem = {
      name: productName,
      price: productPrice,
      portion: portionSize,
      image: "../images/placeholder.webp", // Replace with dynamic image URL if needed
    };

    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
    updateCart();

    // Display confirmation text below the "ORDER NOW" button
    const confirmationTextId = "confirmation-text";
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

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartCount || !cartTotal) {
    console.error("Cart elements not found!");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart count
  cartCount.textContent = cart.length;

  // Display cart items
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: $0.00";
  } else {
    cartItemsContainer.innerHTML = ""; // Clear container
    let total = 0;

    cart.forEach((item, index) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

      cartItemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Portion: ${item.portion}</p>
          <p>Price: $${item.price.toFixed(2)}</p>
        </div>
        <button class="remove-btn">Remove</button>
      `;

      const removeBtn = cartItemDiv.querySelector(".remove-btn");
      removeBtn.addEventListener("click", () => {
        cart.splice(index, 1); // Remove item from cart array
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        updateCart(); // Refresh cart display
      });

      cartItemsContainer.appendChild(cartItemDiv);
      total += item.price;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  // Function to refresh cart display
  function updateCart() {
    cartItemsContainer.innerHTML = ""; // Clear container
    let total = 0;

    cart.forEach((item, index) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item");

      cartItemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Portion: ${item.portion}</p>
          <p>Price: $${item.price.toFixed(2)}</p>
        </div>
        <button class="remove-btn">Remove</button>
      `;

      const removeBtn = cartItemDiv.querySelector(".remove-btn");
      removeBtn.addEventListener("click", () => {
        cart.splice(index, 1); // Remove item from cart array
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        updateCart(); // Refresh cart display
      });

      cartItemsContainer.appendChild(cartItemDiv);
      total += item.price;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.length; // Update cart count
  }
});