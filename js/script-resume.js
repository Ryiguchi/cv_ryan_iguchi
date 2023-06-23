'use strict';
// SELECTORS
const title = document.querySelector('.resume-title');
const errorEl = document.querySelector('.error-container');
const errorText = document.querySelector('.error-text');
const spinner = document.querySelector('.spinner');
const main = document.querySelector('main');

//////////////////////////////////////////////////////////
// PAGE FUNCTIONALITY  ///////////////////////////////////
//////////////////////////////////////////////////////////
const loadFunctionality = function () {
  // Seletors
  const jobSections = document.querySelectorAll('.section-job');
  // Functions

  // --reveals jobs
  const revealJob = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('hidden-section');
    observer.unobserve(entry.target);
  };

  // --Intersection Observer
  const sectionObserver = new IntersectionObserver(revealJob, {
    root: null,
    threshold: 1,
  });

  // --set up reveal effect on newly created elements
  jobSections.forEach(job => {
    !job.classList.contains('wine') && sectionObserver.observe(job);
  });

  const showPage = function () {
    errorEl.classList.add('hidden');
    main.classList.remove('hidden');
  };

  showPage();
};

////////////////////////////////////////////////////////////
// FETCHING AND LOADING DATA ///////////////////////////////
////////////////////////////////////////////////////////////

const loadData = function () {
  // Build and insert HTML for jobs
  const appendJobs = function (jobs) {
    jobs.forEach(job => {
      let markup = `
    <section class="${job.className} job job-${job.side} section-job ${
        job.className === 'wine' ? '' : 'hidden-section'
      }">
      <h4 class="date">${job.date}</h4>
      <h3 class="company">${job.name}</h3>
      <h2 class="job-title">${job.title}</h2>
      <p class="job-description">${job.description}</p>
      <details>
        <h5 class="resume-h5">Responsibilities and Achievements</h5>
        <ul>
        ${job.responsibilities.map(res => `<li>${res}</li>`).join('')}
        </ul>
      </details>
      <div class="print">
        <h5 class="resume-h5">Responsibilities and Achievements</h5>
        <ul>
          ${job.responsibilities.map(res => `<li>${res}</li>`).join('')}
        </ul>
      </div>
    </section>
    `;
      title.insertAdjacentHTML('afterend', markup);
    });
  };

  // Display error
  const errorMessage = function (err) {
    spinner.classList.add('hidden');
    errorText.textContent = err.message;
  };

  // Get job data and set observer
  const fetchData = async function () {
    try {
      const res = await fetch('/cv-js/json/work.json');
      if (!res.ok)
        throw new Error('💥 There was a problem fetching the data! 💥');
      const { jobs } = await res.json();
      appendJobs(jobs);
      loadFunctionality();
    } catch (err) {
      errorMessage(err);
    }
  };

  fetchData();
};

loadData();
