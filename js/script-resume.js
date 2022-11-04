"use strict";
// SELECTORS
const h1 = document.querySelector("h1");
const jobsContainer = document.querySelector(".experience");
const errorEl = document.querySelector(".error");
const containerInner = document.querySelector(".container-inner");

//////////////////////////////////////////////////////////
// PAGE FUNCTIONALITY  ///////////////////////////////////
//////////////////////////////////////////////////////////
const loadFunctionality = function () {
  // Seletors
  const jobSections = document.querySelectorAll(".section-job");
  // Functions

  // --reveals jobs
  const revealJob = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove("hidden-section");
    observer.unobserve(entry.target);
  };

  // --Intersection Observer
  const sectionObserver = new IntersectionObserver(revealJob, {
    root: null,
    threshold: 0.8,
  });
  // --set up reveal effect on newly created elements
  jobSections.forEach((job) => {
    !job.classList.contains("wine") && sectionObserver.observe(job);
  });
};

////////////////////////////////////////////////////////////
// FETCHING AND LOADING DATA ///////////////////////////////
////////////////////////////////////////////////////////////

const loadData = function () {
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
      <details>
        <h5 class="resume-h5">Responsibilities and Achievements</h5>
        <ul>
        ${res}
        </ul>
      </details>
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

  // Display error
  const errorMessage = function (err) {
    containerInner.classList.add("hidden");
    errorEl.classList.remove("hidden");
    errorEl.textContent = err.message;
  };

  // Get job data and set observer
  const fetchData = async function () {
    try {
      const res = await fetch("/json/work.json");
      if (!res.ok)
        throw new Error("💥 Sorry! There was a problem fetching the data! 💥");
      const { jobs: data } = await res.json();
      appendJobs(data);
      loadFunctionality();
    } catch (err) {
      errorMessage(err);
    }
  };

  fetchData();
};

loadData();
