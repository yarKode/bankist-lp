// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const allNavLinks = document.querySelector(".nav__links");

const header = document.querySelector(".header");

const navContainer = document.querySelector(".nav");

const operationTabsContainer = document.querySelector(
  ".operations__tab-container"
);
const operationTabs = document.querySelectorAll(".operations__tab");
const operationContents = document.querySelectorAll(".operations__content");

const sections = document.querySelectorAll(".section");

const imgTargets = document.querySelectorAll("img[data-src]");

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");

const btnSliderRight = document.querySelector(".slider__btn--right");
const btnSliderLeft = document.querySelector(".slider__btn--left");

const dotsContainer = document.querySelector(".dots");

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

function opacityHandler(e) {
  if (e.target.classList.contains("nav__links")) return;
  const hoveredLink = e.target;
  const logo = hoveredLink.closest(".nav").querySelector("img");

  const siblings = [...hoveredLink.closest(".nav__links").children];

  siblings.forEach((el) => {
    if (el.querySelector("a") !== hoveredLink) el.style.opacity = this;
  });
  logo.style.opacity = this;
}

allNavLinks.addEventListener("mouseover", opacityHandler.bind(0.5));

allNavLinks.addEventListener("mouseout", opacityHandler.bind(1));

const obsCallback = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navContainer.classList.add("sticky");
  } else {
    navContainer.classList.remove("sticky");
  }
};

const navHeight = navContainer.getBoundingClientRect().height;

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(obsCallback, obsOptions);

headerObserver.observe(header);

const sectionsObsOptions = {
  root: null,
  threshold: 0.15,
};

const sectionsCallback = (entries, observer) => {
  const [entry] = entries;
  const sectionId = entry.target.id;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(
  sectionsCallback,
  sectionsObsOptions
);

sections.forEach((s) => {
  sectionObserver.observe(s);
  /* s.classList.add("section--hidden"); */
});

const imgObsCallback = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  if (!entry.target.classList.contains("lazy-img")) return;
  const srcUrl = entry.target.dataset.src;

  entry.target.src = `${srcUrl}`;
  entry.target.classList.remove("lazy-img");

  observer.unobserve(entry.target);
};

const imgObsOptions = {
  root: null,
  threshold: 0,
};
const imgObserver = new IntersectionObserver(imgObsCallback, imgObsOptions);

imgTargets.forEach((img) => {
  imgObserver.observe(img);
});

let currentSlide = 0;

/* slider.style.transform = `scale(0.4) translateX(-600px)`;
slider.style.overflow = "visible";
 */

function sliderCall() {
  function goToSlide(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }

  goToSlide(0);

  function slideRight() {
    currentSlide++;

    if (currentSlide === slides.length) currentSlide = 0;

    goToSlide(currentSlide);
    activeDot(currentSlide);
  }

  function slideLeft() {
    currentSlide--;

    if (currentSlide < 0) currentSlide = slides.length - 1;

    goToSlide(currentSlide);
    activeDot(currentSlide);
  }

  btnSliderRight.addEventListener("click", slideRight);

  btnSliderLeft.addEventListener("click", slideLeft);

  document.addEventListener("keydown", (e) => {
    const { key } = e;

    key === "ArrowRight" && slideRight();
    key === "ArrowLeft" && slideLeft();
  });

  function createDots() {
    slides.forEach((s, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  createDots();
  activeDot(currentSlide);

  dotsContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("dots__dot")) return;
    const { slide } = e.target.dataset;

    goToSlide(slide);
    activeDot(slide);
  });

  function activeDot(slide) {
    const dots = document.querySelectorAll(".dots__dot");

    dots.forEach((dot, i) => {
      dot.classList.remove("dots__dot--active");
    });

    dots[slide].classList.add("dots__dot--active");
  }
}

sliderCall();
