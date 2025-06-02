function toggleOverlay() {
    const overlay = document.querySelector(".overlay");
    overlay.classList.toggle("hidden");
  }
  
  /** used copiliot here to add the momentum feature to  */


let outerContainer = document.querySelector(".products__outer-scroll");
let container = document.querySelector(".products__scroll");
let links = container.querySelectorAll("a");

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
