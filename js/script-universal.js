"use strict";

/////////////////////////////////////////
// SELECTORS ////////////////////////////
/////////////////////////////////////////

// Buttons
const darkBtn = document.querySelector(".dark-mode-outer");
const navBtn = document.querySelector(".mobile-nav--icon");

//  Elements

const body = document.querySelector("body");
const mobileNav = document.querySelector(".mobile-nav");

// /////////////////////////////////////
// EVENT LISTENERS /////////////////////
// /////////////////////////////////////

darkBtn.addEventListener("click", function (e) {
  e.preventDefault();
  body.classList.toggle("dark");
});

navBtn.addEventListener("click", function (e) {
  e.preventDefault();
  mobileNav.classList.toggle("hidden");
});
