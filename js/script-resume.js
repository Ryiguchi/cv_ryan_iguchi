"use strict";

// SELECTORS /////////////////////////////////

const jobSections = document.querySelectorAll(".section-job");

// FUNCTIONS ////////////////////////////////

const revealJob = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("hidden-section");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealJob, {
  root: null,
  threshold: 0.8,
});

jobSections.forEach((job) => {
  !job.classList.contains("wine") && sectionObserver.observe(job);
});
