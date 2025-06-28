const targetSection = document.querySelector(".register");
const targetSelector = document.querySelector(".banner");

const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      targetSelector.classList.add("hidden");
    } else {
      targetSelector.classList.remove("hidden");
    }
  });
});

intersectionObserver.observe(targetSection);
