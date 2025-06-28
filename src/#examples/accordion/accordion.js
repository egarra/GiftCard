// faq accordion
createAccordion(".faq__question", ".faq__answer");

function createAccordion(question, answer) {
  document
    .querySelectorAll(question)
    .forEach((item) => item.addEventListener("click", toggleAccordion));

  function toggleAccordion(e) {
    const currentTarget = e.currentTarget;
    const target = e.target;
    const ariaExpanded = currentTarget.getAttribute("aria-expanded");
    const accordionAnswer = currentTarget.querySelector(answer);

    if (target.closest(answer)) {
      return;
    }

    if (ariaExpanded === "false") {
      currentTarget.setAttribute("aria-expanded", "true");
      accordionAnswer.style.maxHeight = accordionAnswer.scrollHeight + "px";
    } else {
      currentTarget.setAttribute("aria-expanded", "false");
      accordionAnswer.style.maxHeight = 0;
    }
  }
}
