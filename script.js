// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const allNavLinks = document.querySelector(".nav__links");

const operationTabsContainer = document.querySelector(
  ".operations__tab-container"
);
const operationTabs = document.querySelectorAll(".operations__tab");
const operationContents = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnLearnMore.addEventListener("click", () => {
  section1.scrollIntoView({ behavior: "smooth" });
});

allNavLinks.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.className === "nav__link") {
    const id = e.target.getAttribute("href");
    const requiredSection = document.querySelector(`${id}`);

    requiredSection.scrollIntoView({ behavior: "smooth" });
  }
});

operationTabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  operationTabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  const clickedId = clicked.dataset.tab;

  operationContents.forEach((c) =>
    c.classList.remove("operations__content--active")
  );
  const appropriateContent = [...operationContents].find((c) =>
    c.classList.contains(`operations__content--${clickedId}`)
  );

  appropriateContent.classList.add("operations__content--active");
});
