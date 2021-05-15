// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const allNavLinks = document.querySelector(".nav__links");

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
