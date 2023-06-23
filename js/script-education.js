'use strict';
const tabContainers = document.querySelectorAll('.tabs-container');
const navSection = document.querySelector('.nav-section');
const certificatesTab = document.querySelector('.tab-4-ed');
const tabsContainerSkill = document.querySelector('.tabs-container-skill');
const skillsSection = document.querySelector('.skills');
const tabsContainerOuter = document.querySelector('.tabs-container-outer');
const tabContentUdemy = document.querySelector('.tab-content-header-udemy');
const errorText = document.querySelector('.error-text');
const errorEl = document.querySelector('.error-container');
const spinner = document.querySelector('.spinner');
const main = document.querySelector('main');

//////////////////////////////////////////////////////////
// PAGE FUNCTIONALITY  ///////////////////////////////////
//////////////////////////////////////////////////////////
const loadFunctionality = function () {
  // TABBED COMPONENT //
  const changeActiveTab = function (clicked, section) {
    // deselect all tabs
    document.querySelectorAll(`.tab-${section}`).forEach(tab => {
      tab.classList.remove('tab-active');
    });
    // select clicked tab
    clicked.classList.add('tab-active');
    // deselect all content
    document.querySelectorAll(`.tab-content-${section}`).forEach(tab => {
      tab.classList.add('hidden');
    });
    // select clicked content
    document
      .querySelector(`.tab-content-${section}-${clicked.dataset.num}`)
      .classList.remove('hidden');
  };

  // jump to section
  const jumpToSection = function () {
    const id = e.target.closest('a').getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  };

  // Event Handlers /////////////////////////////////
  // handle tab click
  tabContainers.forEach(el => {
    el.addEventListener('click', e => {
      const clicked = e.target.closest('.tab');
      if (!clicked || clicked.classList.contains('tab-active')) return;
      const section = clicked.classList.contains('tab-ed') ? 'ed' : 'skill';
      changeActiveTab(clicked, section);
    });
  });

  // handle jump to section buttons
  navSection.addEventListener('click', jumpToSection);

  // show page after loading data
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
  // markup for the education section
  const createHtmlEd = function (schools) {
    let tabsMarkup = '';
    let contentMarkup = '';

    // create markup for the list of subjects studied
    const subjectMarkupEd = function (sub, i, subjects) {
      // after half of list, starts a new list
      return i === Math.round(subjects.length / 2)
        ? `
          </ul>
          <ul>
            <li>${sub}</li>
        `
        : ` 
            <li>${sub}</li>
        `;
    };

    schools.forEach((school, i) => {
      tabsMarkup += `
        <div class="tab tab-ed tab-${i + 1}-ed ${
        i === 0 ? 'tab-active' : ''
      }" data-num="${i + 1}"
        >
          <div class="tab-pointer"></div>
          <p class="tab-ed-name">${school.name.nameTab}</p>
          <p class="tab-ed-date">${school.date}</p>
        </div>
      `;

      contentMarkup += `
        <div class="tab-content-ed tab-content tab-content-ed-${i + 1} ${
        i === 0 ? '' : 'hidden'
      }"
        >
          <div class="tab-content-header">
            <div class="tab-content-header-text">
              <h2>${school.name.nameFull}</h2>
              <h4>${school.location}</h4>
              <h4 class="tab-content-date">${school.date}</h4>
              <p>Major: ${school.major}</p>
            </div>
            <img
              src="${school.img.src}"
              alt="${school.img.alt}"
              class="logo-${school.img.class} logo"
            />
          </div>
          <div class="tab-content-description">${school.description}</div>
          <div class="tab-content-subjects">
            <h4>Subjects Studied</h4>
            <ul class="education-ul">
              ${school.subjects.map(subjectMarkupEd).join('')}
            </ul>
          </div>
        </div>
    `;
    });
    certificatesTab.insertAdjacentHTML('beforebegin', tabsMarkup);
    tabsContainerOuter.insertAdjacentHTML('afterend', contentMarkup);
  };

  // markup for the certificates
  const createHtmlCer = function (certificates) {
    let contentMarkup = '';

    certificates.forEach(cert => {
      contentMarkup += `
        <div class="tab-content-header-text">
          <h4>${cert.courseName}</h4>
          <h4>${cert.hours} hours</h4>
          <p>${cert.certificateType}</p>
        </div>
    `;
    });
    tabContentUdemy.insertAdjacentHTML('beforeend', contentMarkup);
  };

  // markup for the skills section
  const createHtmlSkills = function (categories) {
    let tabsMarkups = '';
    let contentMarkup = '';

    //
    const subjectMarkupSkills = function (sub) {
      return `
        <li>
          <span class="skills-list--skill">${sub.name}</span
          ><span class="education-print">${sub.print}</span>
          <div class="skills-list-background">
            <div class="skills-${sub.name.toLowerCase()} skills-bar"></div>
          </div>
        </li>
      `;
    };

    categories.forEach((cat, i) => {
      contentMarkup += `
        <div class="tab-content tab-content-skill tab-content-skill-${i + 1} ${
        i === 0 ? '' : 'hidden'
      }"
        >
          <ul class="skills-list education-ul">
            ${cat.subjects.map(subjectMarkupSkills).join('')}
          </ul>
        </div>
      `;

      // tabs skills
      tabsMarkups += `
        <div class="tab tab-skill tab-${i + 1}-ed ${
        i === 0 ? 'tab-active' : ''
      }" data-num="${i + 1}"
        >
          <div class="tab-pointer"></div>
          <p class="tab-ed-name">${cat.category}</p>
        </div>
      `;
    });
    tabsContainerSkill.insertAdjacentHTML('beforeend', tabsMarkups);
    skillsSection.insertAdjacentHTML('beforeend', contentMarkup);
  };

  const errorMessage = function (err) {
    spinner.classList.add('hidden');
    errorEl.textContent = err.message;
  };

  const fetchData = async function () {
    try {
      const res = await fetch('cv_ryan_iguchi/json/education.json');
      if (!res.ok)
        throw new Error('💥 There was a problem retrieving the data 💥');
      const [{ education }, { certificates }, { skills }] = await res.json();
      createHtmlEd(education);
      createHtmlCer(certificates);
      createHtmlSkills(skills);
      loadFunctionality();
    } catch (err) {
      errorMessage(err);
    }
  };

  fetchData();
};

loadData();
