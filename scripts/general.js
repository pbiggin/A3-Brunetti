//** used Copiliot to reorganise functions (via initialization) to work on all pages */

document.addEventListener("DOMContentLoaded", () => {
  initializeCart();
  initializeProductScroll();
  initializeOverlayToggle();
  initializeCartSummary();
  initializeSlidingAnimations();
});

function initializeCart() {
  const cartButton = document.getElementById("cart-icon");
  const cartContainer = document.querySelector(".cart-container");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const orderButton = document.querySelector(".standard-btn.center.headspace");

  if (!cartButton || !cartContainer || !cartItems || !cartTotal || !orderButton) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      if (index < 3) {
        const li = document.createElement("li");
        li.classList.add("cart--preview", "cart-item");

        li.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart--preview cart-item-image" />
          <div class="cart-item-details">
            <strong><p>${item.name}</p></strong>
            <p>${item.portion}</p>
            <p>$${item.price.toFixed(2)}</p>
          </div>
          <button class="remove-btn">Remove</button>
        `;

        li.querySelector(".remove-btn").addEventListener("click", () => {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCart();
        });

        cartItems.appendChild(li);
        total += item.price;
      }
    });

    cartTotal.classList.add("cart-message");
    cartTotal.textContent = `Please note, Your order will be ready on our next business day`;

    if (cart.length > 3) {
      const remainingItems = cart.length - 3;
      const seeMore = document.createElement("p");
      seeMore.textContent = `+${remainingItems} more items...`;
      seeMore.classList.add("see-more");
      cartItems.appendChild(seeMore);
    }
  }

  updateCart();

  orderButton.addEventListener("click", () => {
    const productName = document.querySelector(".content__text h2").textContent;
    const productPrice = 65.0;
    const portionSizeInput = document.getElementById("portion-size");
    const portionSize = portionSizeInput.textContent;

    let errorMessage = document.getElementById("portion-error-message");
    if (!errorMessage) {
      errorMessage = document.createElement("p");
      errorMessage.id = "portion-error-message";
      errorMessage.style.color = "red";
      errorMessage.style.fontSize = "0.9rem";
      errorMessage.style.marginTop = "5px";
      errorMessage.classList.add("center");
      portionSizeInput.parentNode.appendChild(errorMessage);
    }

    if (!["6 Portions", "8 Portions", "10 Portions"].includes(portionSize)) {
      errorMessage.textContent = "Please select a portion size";
      return;
    } else {
      errorMessage.textContent = "";
    }

    const cartItem = {
      name: productName,
      price: productPrice,
      portion: portionSize,
      image: productImages[productName] || "../images/placeholder.webp",
    };

    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();

    orderButton.textContent = "Item Added to Cart";
    orderButton.style.backgroundColor = "var(--secondary-colour)";
    orderButton.style.color = "white";

    setTimeout(() => {
      orderButton.textContent = "Add to Cart";
      orderButton.style.backgroundColor = "";
      orderButton.style.color = "";
    }, 2000);
  });

  cartButton.addEventListener("mouseenter", () => cartContainer.classList.remove("hidden"));
  cartContainer.addEventListener("mouseenter", () => cartContainer.classList.remove("hidden"));
  cartContainer.addEventListener("mouseleave", () => cartContainer.classList.add("hidden"));
}

function initializeProductScroll() {
  const outerContainer = document.querySelector(".products__outer-scroll");
  const container = document.querySelector(".products__scroll");

  if (!outerContainer || !container) return;

  const links = container.querySelectorAll("a");
  container.style.left = "0px";

  let pressed = false, startX, x, isDragging = false, velocity = 0, lastX = 0, momentumFrame;

  const disablePointerEvents = () => links.forEach(link => link.style.pointerEvents = "none");
  const enablePointerEvents = () => links.forEach(link => link.style.pointerEvents = "auto");

  const boundItems = () => {
    const outerWidth = outerContainer.offsetWidth;
    const innerWidth = container.offsetWidth;
    const left = parseInt(container.style.left, 10) || 0;

    if (left > 0) {
      container.style.left = "0px";
      velocity = 0;
    } else if (left < -(innerWidth - outerWidth)) {
      container.style.left = `-${innerWidth - outerWidth}px`;
      velocity = 0;
    }
  };

  const applyMomentum = () => {
    if (Math.abs(velocity) > 0.1) {
      container.style.left = `${parseInt(container.style.left, 10) + velocity}px`;
      velocity *= 0.95;
      boundItems();
      momentumFrame = requestAnimationFrame(applyMomentum);
    } else {
      cancelAnimationFrame(momentumFrame);
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
    if (Math.abs(x - startX) > 5) {
      isDragging = true;
      disablePointerEvents();
    }

    velocity = x - lastX;
    lastX = x;

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

function initializeOverlayToggle() {
  const overlay = document.querySelector(".overlay");
  const hamburgerButton = document.querySelector(".hamburger");

  if (!overlay || !hamburgerButton) return;

  hamburgerButton.addEventListener("click", () => overlay.classList.toggle("hidden"));
}

function initializeCartSummary() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartCount || !cartTotal) {
    console.error("Cart elements not found!");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.length;

  function updateCart() {
    cartItemsContainer.innerHTML = "";
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

      cartItemDiv.querySelector(".remove-btn").addEventListener("click", () => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
      });

      cartItemsContainer.appendChild(cartItemDiv);
      total += item.price;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.length;
  }

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: $0.00";
  } else {
    updateCart();
  }
}

function initializeSlidingAnimations() {
  const slidingElements = document.querySelectorAll(".slide-in-left, .slide-in-right");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const duration = entry.target.dataset.duration || "1s";
          entry.target.style.setProperty("--animation-duration", duration);
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    { threshold: 0.10 }
  );

  slidingElements.forEach((element) => observer.observe(element));
}

