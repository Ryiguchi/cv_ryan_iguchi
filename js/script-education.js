"use strict";

//////////////////////////////////////////////
// SELECTORS /////////////////////////////////
//////////////////////////////////////////////

// Elements
const tabsContainer = document.querySelector(".tabs-labels-container");
const tabs = document.querySelectorAll(".tab-ed");
const tabsContent = document.querySelectorAll(".tab-content-ed");
const educationTab = document.querySelector(".educaton-tab");
const categoryTabsContainer = document.querySelector(".category-tabs");
const categoryTabs = document.querySelectorAll(".category-tab");
const secondaryTabsContainers = document.querySelectorAll(".tabs-container-ed");
const langTab = document.querySelector(".tab-5-ed");

//////////////////////////////////////////////
// FUNCTIONS /////////////////////////////////
//////////////////////////////////////////////

// TABBED COMPONENT //

tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".tab-ed");
  if (!clicked) return;

  tabs.forEach((el) => el.classList.remove("tab-ed-active"));

  clicked.classList.add("tab-ed-active");

  tabsContent.forEach((el) => el.classList.add("hidden"));

  document
    .querySelector(`.tab-content-ed-${clicked.dataset.num}`)
    .classList.remove("hidden");
});

categoryTabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".category-tab");
  if (!clicked || clicked.classList.contains("category-active")) return;

  categoryTabs.forEach((el) => el.classList.toggle("category-active"));
  secondaryTabsContainers.forEach((el) => el.classList.toggle("hidden"));

  tabs.forEach((el) => el.classList.remove("tab-ed-active"));
  document
    .querySelector(`.tab-${clicked.dataset.tab}-ed`)
    .classList.add("tab-ed-active");

  tabsContent.forEach((el) => el.classList.add("hidden"));
  document
    .querySelector(`.tab-content-ed-${clicked.dataset.tab}`)
    .classList.remove("hidden");
});
