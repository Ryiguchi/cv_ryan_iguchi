"use strict";

//////////////////////////////////////////////
// SELECTORS /////////////////////////////////
//////////////////////////////////////////////

// Elements
const tabsContainerEd = document.querySelector(".tabs-container-ed");
const tabsContainerSkill = document.querySelector(".tabs-container-skill");
const tabContainers = document.querySelectorAll(".tabs-container");
const tabsEd = document.querySelectorAll(".tab-ed");
const tabsSkill = document.querySelectorAll(".tab-skill");
const tabsContentEd = document.querySelectorAll(".tab-content-ed");
const tabsContentSkill = document.querySelectorAll(".tab-content-skill");
const navSection = document.querySelector(".nav-section");

// TABBED COMPONENT //

// FUNCTIONS /////////////////////////////////

const changeActiveTab = function (clicked, section) {
  document.querySelectorAll(`.tab-${section}`).forEach((tab) => {
    tab.classList.remove("tab-active");
  });
  clicked.classList.add("tab-active");

  document.querySelectorAll(`.tab-content-${section}`).forEach((tab) => {
    tab.classList.add("hidden");
  });
  document
    .querySelector(`.tab-content-${section}-${clicked.dataset.num}`)
    .classList.remove("hidden");
};

// Event Handlers /////////////////////////////////
tabContainers.forEach((el) => {
  el.addEventListener("click", (e) => {
    const clicked = e.target.closest(".tab");
    if (!clicked || clicked.classList.contains("tab-active")) return;
    console.log("hi");
    const section = clicked.classList.contains("tab-ed") ? "ed" : "skill";
    changeActiveTab(clicked, section);
  });
});

navSection.addEventListener("click", (e) => {
  e.preventDefault();
  const id = e.target.closest("a").getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});
