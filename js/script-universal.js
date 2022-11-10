'use strict';

/////////////////////////////////////////
// SELECTORS ////////////////////////////
/////////////////////////////////////////

// Buttons
const darkBtn = document.querySelector('.dark-mode-outer');
const navBtn = document.querySelector('.mobile-nav--icon');

//  Elements

const body = document.querySelector('body');
const mobileNav = document.querySelector('.mobile-nav');

// /////////////////////////////////////
// EVENT LISTENERS /////////////////////
// /////////////////////////////////////

// handle dark mode button
darkBtn.addEventListener('click', function (e) {
  e.preventDefault();
  body.classList.toggle('dark');
});

// open/ close mobile navigation
navBtn.addEventListener('click', function (e) {
  e.preventDefault();
  mobileNav.classList.toggle('hidden');
});

mobileNav.addEventListener('click', function (e) {
  console.log(e.target);
  if (!e.target.classList.contains('mobile-nav--link')) return;
  mobileNav.classList.add('hidden');
});
