document.addEventListener("DOMContentLoaded", function () {
  initializeButtonEffects();
  initializeAnimations();
  initializeIconAnimations();
});

function initializeButtonEffects() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      createRippleEffect(e, this);
    });

    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Material Design ripple effect
function createRippleEffect(event, button) {
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  Object.assign(ripple.style, {
    width: size + "px",
    height: size + "px",
    left: x + "px",
    top: y + "px",
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.6)",
    transform: "scale(0)",
    animation: "ripple 0.6s linear",
    pointerEvents: "none",
  });

  button.style.position = "relative";
  button.style.overflow = "hidden";
  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

function initializeAnimations() {
  addAnimationStyles();
  initializeEntranceAnimations();
}

function addAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes floating {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-10px) rotate(2deg);
            }
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-delay-1 { animation-delay: 0.2s; opacity: 0; }
        .animate-delay-2 { animation-delay: 0.4s; opacity: 0; }
        .animate-delay-3 { animation-delay: 0.6s; opacity: 0; }
        
        .floating-icon {
            animation: floating 3s ease-in-out infinite;
        }
    `;
  document.head.appendChild(style);
}

function initializeEntranceAnimations() {
  const heroTitle = document.querySelector(".hero-section__title");
  const heroSubtitle = document.querySelector(".hero-section__subtitle");
  const heroButton = document.querySelector(".hero-section__cta");

  if (heroTitle) heroTitle.classList.add("animate-fade-in-up");
  if (heroSubtitle)
    heroSubtitle.classList.add("animate-fade-in-up", "animate-delay-1");
  if (heroButton)
    heroButton.classList.add("animate-fade-in-up", "animate-delay-2");
}

function initializeIconAnimations() {
  const iconContainer = document.querySelector(".hero-section__icons");
  if (!iconContainer) return;

  const icons = iconContainer.querySelectorAll(".floating-icon");
  icons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`;
    icon.classList.add("floating-icon");
  });
}

function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function createFloatingIcon(iconSrc, position) {
  const icon = document.createElement("img");
  icon.src = iconSrc;
  icon.classList.add("floating-icon");

  Object.assign(icon.style, {
    position: "absolute",
    width: "48px",
    height: "48px",
    left: position.x,
    top: position.y,
  });

  return icon;
}
