"use strict";

// SELECTORS /////////////////////////////////

const jobsContainer = document.querySelector(".experience");
const h1 = document.querySelector("h1");

// FUNCTIONS ////////////////////////////////

// reveals jobs
const revealJob = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("hidden-section");
  observer.unobserve(entry.target);
};

// Intersection Observer
const sectionObserver = new IntersectionObserver(revealJob, {
  root: null,
  threshold: 0.8,
});

// Build and insert HTML for jobs
const appendJobs = function (data) {
  data.forEach((job) => {
    let res = "";
    job.responsibilities.forEach((r) => (res += `<li>${r}</li>`));

    let html = `
    <section class="${job.className} job job-${job.side} section-job ${
      job.className === "wine" ? "" : "hidden-section"
    }">
      <h4 class="date">${job.date}</h4>
      <h3 class="company">${job.name}</h3>
      <h2 class="job-title">${job.title}</h2>
      <p class="job-description">${job.description}</p>

      <!-- DETAILS -->

      <details>
        <h5 class="resume-h5">Responsibilities and Achievements</h5>
        <ul>
        ${res}
        </ul>
      </details>

      <!-- PRINT FORMAT -->

      <div class="print">
        <h5 class="resume-h5">Responsibilities and Achievements</h5>
        <ul>
          ${res}
        </ul>
      </div>
    </section>
    `;
    jobsContainer.insertAdjacentHTML("beforeend", html);
  });
};

// Get job data and set observer
const getJobs = async function () {
  try {
    const res = await fetch("/json/work.json");
    if (!res.ok)
      throw new Error("💥 There was a problem loading the resume 💥");
    const { jobs: data } = await res.json();
    appendJobs(data);

    // set up reveal effect on newly created elements
    const jobSections = document.querySelectorAll(".section-job");
    jobSections.forEach((job) => {
      !job.classList.contains("wine") && sectionObserver.observe(job);
    });
  } catch (err) {
    h1.textContent = err.message;
  }
};

getJobs();
