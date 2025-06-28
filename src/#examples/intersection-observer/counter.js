const counterSection = document.querySelector("[data-counter-section]");
const counterNumberOne = document.querySelector("[data-counter-1]");
const counterNumberTwo = document.querySelector("[data-counter-2]");
const counterNumberThree = document.querySelector("[data-counter-3]");
const counterNumberFour = document.querySelector("[data-counter-4]");
let isCounterReproduced = false;

function counterAnimate(
  counterValueSelector,
  startCounterValue,
  endCounterValue,
  counterDuration,
) {
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;

    const progress = Math.min(
      (timestamp - startTimestamp) / counterDuration,
      1,
    );

    counterValueSelector.innerHTML = Math.floor(
      progress * (endCounterValue - startCounterValue) + startCounterValue,
    );

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
  isCounterReproduced = true;
}

const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0 && !isCounterReproduced) {
      counterAnimate(counterNumberOne, 0, 2000, 3000);
      counterAnimate(counterNumberTwo, 0, 2835, 3000);
      counterAnimate(counterNumberThree, 0, 2900, 3000);
      counterAnimate(counterNumberFour, 0, 2970, 3000);
    }
  });
});

intersectionObserver.observe(counterSection);
