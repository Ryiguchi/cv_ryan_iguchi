'use strict';

const slider = document.querySelector('.slider');

const loadFunctionality = function () {
  //////////////////////////////////////////////
  // SELECTORS /////////////////////////////////
  //////////////////////////////////////////////

  // --arrows / buttons
  const leftArrow = document.querySelector('.arrow-left-icon');
  const rightArrow = document.querySelector('.arrow-right-icon');
  const learnMoreBtns = document.querySelectorAll('.more-btn');
  const closeIcons = document.querySelectorAll('.close-icon');

  // --elements
  const slides = document.querySelectorAll('.project');
  const pagList = document.querySelector('.pagination-list');
  const learnMoreModals = document.querySelectorAll('.more-modal');
  const overlay = document.querySelector('.overlay');

  //////////////////////////////////////////////
  // VARIABLE DECLARATIONS /////////////////////
  //////////////////////////////////////////////

  let curSlide = 1,
    start,
    end;
  const maxSlide = slides.length;

  //////////////////////////////////////////////
  // FUNCTIONS /////////////////////////////////
  //////////////////////////////////////////////

  // SLIDER

  const projectSlider = function () {
    // CHANGES SLIDE
    const goToSlide = function (slide) {
      slides.forEach((s, i) => {
        // --calculates and changes slide position
        s.style.transform = `translateX(${100 * (i + 1 - slide)}%)`;
      });
    };

    // CREATES THE PAGINATION BASED ON NUMBER OF SLIDES
    const createPagination = function () {
      console.log(slides);
      slides.forEach((slide, i) => {
        pagList.insertAdjacentHTML(
          'beforeend',
          `<li class="p-${i + 1} page-num" data-slide="${i + 1}">${i + 1}</li>`
        );
      });
    };

    // PAGINATION - CHANGES TO THE SPECIFIED PAGE NUMBER (ARGUMENT)
    const changePageNum = function (slide) {
      // --removes all active
      document.querySelectorAll('.page-num').forEach(num => {
        num.classList.remove('active-page');
        //  --sets active based on parameters
        document
          .querySelector(`.page-num[data-slide='${slide}']`)
          .classList.add('active-page');
      });
    };

    const removeHidden = function () {
      slides.forEach(el => el.classList.remove('hidden'));
    };

    // INITIALIZES AND NAVIGATES TO FIRST SLIDE
    const init = function () {
      createPagination();
      changePageNum(1);
      goToSlide(1);
      removeHidden();
      console.log('hi');
    };

    //  GOES TO NEXT / PREVIOUS SLIDE OR TO BEGINNING / END
    const nextSlide = function () {
      fullScreen();
      curSlide === maxSlide ? (curSlide = 1) : curSlide++;
      goToSlide(curSlide);
      changePageNum(curSlide);
    };

    const previousSlide = function () {
      fullScreen();
      curSlide === 1 ? (curSlide = maxSlide) : curSlide--;
      goToSlide(curSlide);
      changePageNum(curSlide);
    };

    const fullScreen = function () {
      slider.scrollIntoView({ behavior: 'smooth' });
    };

    const calcSwipe = function (start, end) {
      console.log(start, end);
      if (start - end > 10) nextSlide();
      if (start - end < -10) previousSlide();
      start = end = 0;
    };

    // EVENT LISTENERS

    rightArrow.addEventListener('click', nextSlide),
      leftArrow.addEventListener('click', previousSlide);

    document.addEventListener('keydown', e => {
      e.key === 'ArrowRight' && nextSlide();
      e.key === 'ArrowLeft' && previousSlide();
    });

    pagList.addEventListener('click', e => {
      if (!e.target.classList.contains('page-num')) return;
      const { slide } = e.target.dataset;
      curSlide = slide;
      fullScreen();
      goToSlide(slide);
      changePageNum(slide);
    });

    slider.addEventListener('touchstart', e => {
      start = end = 0;
      start = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
      if (start === 0) return;
      end = e.changedTouches[0].screenX;
      calcSwipe(start, end);
    });

    init();
  };

  projectSlider();

  // MODAL POP-UP

  const openModal = function () {
    document.querySelector(`.modal-${curSlide}`).style.top = '50%';
    overlay.classList.remove('hidden');
  };

  const closeModal = function () {
    document.querySelector(`.modal-${curSlide}`).style.top = '-30rem';
    overlay.classList.add('hidden');
  };

  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openModal();
    });
  });

  closeIcons.forEach(icon => {
    icon.addEventListener('click', e => {
      e.preventDefault();
      closeModal();
    });
  });

  overlay.addEventListener('click', e => {
    e.preventDefault();
    closeModal();
  });
};

const loadData = function () {
  /////////////////////////////////////////////////
  // Insert Data into DOM /////////////////////////
  /////////////////////////////////////////////////

  const createSlides = function (projects) {
    let htmlSlide = '';
    let htmlModal = '';
    projects.forEach((project, i) => {
      htmlSlide += `
      <article
        class="project project-${project.type} project-${project.className}"
      >
        <div class="project-card-text-box">
          <!-- text -->
          <h1 class="projects-h1">${project.title}</h1>
          <p class="project-card-description">
            ${project.titleText}
          </p>
          <!-- learn more button -->

          <button class="more-btn btn">
            Learn More
          </button>
        </div>
        <!-- image -->
        <div class="img-box">
          <img
            src="${project.img}"
            alt="${project.alt}"
            class="project-img"
          />
          <div class="img-overlay"></div>
        </div>
      </article>
    `;

      htmlModal += `
    <aside class="more-modal modal-${i + 1}">
          <div class="modal-content">
            <h2>${project.modalTitle}</h2>
            <ion-icon
              name="close-outline"
              class="close-icon"
              data-slide="${i + 1}"
            ></ion-icon>

            <h4>Categogry: &nbsp &nbsp ${project.category}</h4>

            <h4>Tech used: &nbsp &nbsp ${project.tech}</h4>

            <p>
              ${project.modalText}
            </p>
            <button class="btn btn-modal btn-${project.className}">
              <a
                href="${project.link}"
                target="_blank"
                >${project.type === 'Game' ? 'Play' : 'Visit'}</a
              >
              </button>
              <button class="btn btn-modal btn-${project.className}">
              <a
              href="${project.gitHub}"
              target="_blank"
              >GitHub</a
              >
              </button>
              </div>
              </aside>
              `;
    });
    slider.insertAdjacentHTML('beforeend', htmlSlide);
    slider.insertAdjacentHTML('afterend', htmlModal);
  };

  /////////////////////////////////////////////////
  // Get Data /////////////////////////////////////
  /////////////////////////////////////////////////

  // General function to get data via github.api
  const fetchData = async function (url) {
    try {
      const res = await fetch(url);
      const dataEncrypted = await res.json();
      const dataDecrypted = atob(dataEncrypted.content);
      const projectData = JSON.parse(dataDecrypted);
      return projectData;
    } catch (err) {
      errorMessage(err);
    }
  };

  // get all project data
  const getAllData = async function () {
    try {
      const allData = await Promise.all([
        fetchData(
          'https://api.github.com/repos/Ryiguchi/blackjack-game/contents/json/cv-data.json?ref=main'
        ),
        fetchData(
          'https://api.github.com/repos/Ryiguchi/bankist-website/contents/json/cv-data.json?ref=main'
        ),
        fetchData(
          'https://api.github.com/repos/Ryiguchi/my-cv/contents/json/cv-data.json?ref=main'
        ),
        fetchData(
          'https://api.github.com/repos/Ryiguchi/omnifood-website/contents/json/cv-data.json?ref=main'
        ),
        fetchData(
          'https://api.github.com/repos/Ryiguchi/guess-a-number-game/contents/json/cv-data.json?ref=main'
        ),
      ]);
      const orderedData = allData.flat().sort((a, b) => a.num - b.num);
      createSlides(orderedData);
      loadFunctionality();
    } catch (err) {
      console.log(err);
    }
  };

  getAllData();
};

loadData();
