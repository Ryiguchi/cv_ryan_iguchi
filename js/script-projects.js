"use strict";

//////////////////////////////////////////////
// SELECTORS /////////////////////////////////
//////////////////////////////////////////////

// --arrows / buttons
const leftArrow = document.querySelector(".arrow-left-icon");
const rightArrow = document.querySelector(".arrow-right-icon");
const learnMoreBtns = document.querySelectorAll(".more-btn");
const closeIcons = document.querySelectorAll(".close-icon");

// --elements
const slides = document.querySelectorAll(".project");
const pagList = document.querySelector(".pagination-list");
const slider = document.querySelector(".slider");
const learnMoreModals = document.querySelectorAll(".more-modal");

//////////////////////////////////////////////
// VARIABLE DECLARATIONS /////////////////////
//////////////////////////////////////////////

let curSlide = 1;
let modalOpen = false;
const maxSlide = slides.length;

//////////////////////////////////////////////
// FUNCTIONS /////////////////////////////////
//////////////////////////////////////////////

// SLIDER

const projectSlider = function () {
  // CHANGES SLIDE
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      // --calculates and changes slide position
      s.style.transform = `translateX(${100 * (i + 1 - slide)}%)`;
    });
  };

  // CREATES THE PAGINATION BASED ON NUMBER OF SLIDES
  const createPagination = function () {
    slides.forEach((slide, i) => {
      pagList.insertAdjacentHTML(
        "beforeend",
        `<li class="p-${i + 1} page-num" data-slide="${i + 1}">${i + 1}</li>`
      );
    });
  };

  // PAGINATION - CHANGES TO THE SPECIFIED PAGE NUMBER (ARGUMENT)
  const changePageNum = function (slide) {
    // --removes all active
    document.querySelectorAll(".page-num").forEach((num) => {
      num.classList.remove("active-page");
      //  --sets active based on parameters
      document
        .querySelector(`.page-num[data-slide='${slide}']`)
        .classList.add("active-page");
    });
  };

  const removeHidden = function () {
    slides.forEach((el) => el.classList.remove("hidden"));
  };

  // INITIALIZES AND NAVIGATES TO FIRST SLIDE
  const init = function () {
    createPagination();
    changePageNum(1);
    goToSlide(1);
    removeHidden();
  };

  //  GOES TO NEXT / PREVIOUS SLIDE OR TO BEGINNING / END
  const nextSlide = function () {
    fullScreen();
    curSlide === maxSlide ? (curSlide = 1) : curSlide++;
    goToSlide(curSlide);
    closeModals();
    changePageNum(curSlide);
  };

  const previousSlide = function () {
    fullScreen();
    curSlide === 1 ? (curSlide = maxSlide) : curSlide--;
    goToSlide(curSlide);
    closeModals();
    changePageNum(curSlide);
  };

  const fullScreen = function () {
    slider.scrollIntoView({ behavior: "smooth" });
  };

  const closeModals = function () {
    modalOpen = false;
    learnMoreModals.forEach((el) => {
      el.style.top = "-20rem";
    });
  };

  // EVENT LISTENERS

  rightArrow.addEventListener("click", nextSlide),
    leftArrow.addEventListener("click", previousSlide);

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowRight" && nextSlide();
    e.key === "ArrowLeft" && previousSlide();
  });

  pagList.addEventListener("click", function (e) {
    if (!e.target.classList.contains("page-num")) return;
    const { slide } = e.target.dataset;
    curSlide = slide;
    fullScreen();
    goToSlide(slide);
    changePageNum(slide);
    closeModals();
  });

  init();
};

projectSlider();

// MODAL POP-UP

learnMoreBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    modalOpen = true;
    document.querySelector(`.modal-${curSlide}`).style.top = "50%";
  });
});

closeIcons.forEach((icon) => {
  icon.addEventListener("click", function (e) {
    e.preventDefault();
    modalOpen = false;
    e.target.parentElement.style.top = "-20rem";
  });
});

slides.forEach((el) => {
  el.addEventListener("click", function (e) {
    if (!modalOpen || e.target.classList.contains("more-btn")) return;
    document.querySelector(`.modal-${curSlide}`).style.top = "-20rem";
  });
});
