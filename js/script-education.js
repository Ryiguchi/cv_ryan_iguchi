"use strict";

const loadFunctionality = function () {
  // SELECTORS /////////////////////////////////
  const tabsContainerEd = document.querySelector(".tabs-container-ed");
  const tabContainers = document.querySelectorAll(".tabs-container");
  const tabsEd = document.querySelectorAll(".tab-ed");
  const tabsSkill = document.querySelectorAll(".tab-skill");
  const tabsContentEd = document.querySelectorAll(".tab-content-ed");
  const tabsContentSkill = document.querySelectorAll(".tab-content-skill");
  const navSection = document.querySelector(".nav-section");

  // FUNCTIONS /////////////////////////////////
  // TABBED COMPONENT //
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
      const section = clicked.classList.contains("tab-ed") ? "ed" : "skill";
      changeActiveTab(clicked, section);
    });
  });

  navSection.addEventListener("click", (e) => {
    e.preventDefault();
    const id = e.target.closest("a").getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
};

const certificatesTab = document.querySelector(".tab-4-ed");
const tabsContainerSkill = document.querySelector(".tabs-container-skill");
const skillsSection = document.querySelector(".skills");
const tabsContainerOuter = document.querySelector(".tabs-container-outer");
const tabContentUdemy = document.querySelector(".tab-content-header-udemy");

const createHtmlEd = function (schools) {
  let htmlTab = "";
  let htmlContent = "";
  let htmlSubjects1;
  let htmlSubjects2;
  schools.forEach((school, i) => {
    htmlSubjects1 = "";
    htmlSubjects2 = "";
    school.subjects.forEach((sub, i) => {
      i <= school.subjects.length / 2
        ? (htmlSubjects1 += `<li>${sub}</li>`)
        : (htmlSubjects2 += `<li>${sub}</li>`);
    });

    htmlTab += `
    <div class="tab tab-ed tab-${i + 1}-ed ${
      i === 0 ? "tab-active" : ""
    }" data-num="${i + 1}">
    <div class="tab-pointer"></div>
    <p class="tab-ed-name">${school.name.nameTab}</p>
    <p class="tab-ed-date">${school.date}</p>
    </div>
    `;

    htmlContent += `
    <div class="tab-content-ed tab-content tab-content-ed-${i + 1} ${
      i === 0 ? "" : "hidden"
    }">
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
          ${htmlSubjects1}
        </ul>
        <ul>
          ${htmlSubjects2}
        </ul>
      </div>
    </div>
    `;
  });
  certificatesTab.insertAdjacentHTML("beforebegin", htmlTab);
  tabsContainerOuter.insertAdjacentHTML("afterend", htmlContent);
};

const createHtmlCer = function (certificates) {
  let htmlContent = "";

  certificates.forEach((cert) => {
    htmlContent += `
        <div class="tab-content-header-text">
          <h4>${cert.courseName}</h4>
          <h4>${cert.hours} hours</h4>
          <p>${cert.certificateType}</p>
        </div>
    `;
  });
  tabContentUdemy.insertAdjacentHTML("beforeend", htmlContent);
};

const createHtmlSkills = function (cats) {
  let htmlTabs = "";
  let htmlContent = "";
  let htmlSkill;
  cats.forEach((cat, i) => {
    htmlSkill = "";
    // content skills
    cat.subjects.forEach((sub) => {
      htmlSkill += `
      <li>
      <span class="skills-list--skill">${sub.name}</span
      ><span class="education-print">${sub.print}</span>
      <div class="skills-list-background">
      <div class="skills-${sub.name.toLowerCase()} skills-bar"></div>
      </div>
      </li>
      `;
    });

    htmlContent += `
    <div class="tab-content tab-content-skill tab-content-skill-${i + 1} ${
      i === 0 ? "" : "hidden"
    }">
      <ul class="skills-list education-ul">
        ${htmlSkill}
      </ul>
    </div>
    `;

    // tabs skills
    htmlTabs += `
    <div class="tab tab-skill tab-${i + 1}-ed ${
      i === 0 ? "tab-active" : ""
    }" data-num="${i + 1}">
      <div class="tab-pointer"></div>
      <p class="tab-ed-name">${cat.category}</p>
    </div>
    `;
  });
  tabsContainerSkill.insertAdjacentHTML("beforeend", htmlTabs);
  skillsSection.insertAdjacentHTML("beforeend", htmlContent);
};

const errorLoading = function (err) {
  document.querySelector(".schools").classList.add("hidden");
  document.querySelector(".skills").classList.add("hidden");
  const errorEl = document.querySelector(".error");
  errorEl.classList.remove("hidden");
  errorEl.textContent = err.message;
};

const loadData = async function () {
  try {
    const res = await fetch("/json/education.json");
    if (!res.ok)
      throw new Error("💥 There was a problem retrieving the data 💥");
    const [{ education: edu }, { certificates: cert }, { skills }] =
      await res.json();
    createHtmlEd(edu);
    createHtmlCer(cert);
    createHtmlSkills(skills);
    loadFunctionality();
  } catch (err) {
    errorLoading(err);
  }
};

loadData();
