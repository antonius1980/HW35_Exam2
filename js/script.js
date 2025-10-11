'use strict';

function createSlider(id, slides) {

  const sliderContainer = document.getElementById(id);
  if (!sliderContainer) throw new Error(`#${id} not found`);
  sliderContainer.innerHTML = '';

  slides.forEach(({ heading = '', text = '' }, i) => {
    const slide = document.createElement('div');
    slide.className = `slider-slide slide-${i + 1}`;
    let headingNum;
    i == 0 ? headingNum = 1 : headingNum = 2;
    
    slide.innerHTML = `
    <div class="container section__container">  
      <div class="slider__content sl-content">  
        <h${headingNum} class="heading heading-1">${heading}</h${headingNum}>
        <p class="slide__text">${text}</p>
      </div>
    </div>`;
    sliderContainer.appendChild(slide);
  });
}

function scrollIntoView(target, block = 'start', behavior = 'smooth') {
  target.scrollIntoView({ block: block, behavior: behavior });
}

function scrollButtonClick(el, target) {
  el.addEventListener("click",  () => {scrollIntoView(target);});
}

function createDownArrow(parent, target) {
    const downArrow = document.createElement('span');
    downArrow.classList.add('fa-solid', 'fa-angle-down', 'down-arrow');
    parent.appendChild(downArrow);
    scrollButtonClick(downArrow, target);
}


//Can set predefined element or '.class' or '#id' as el
  function togglesAnim(el, classname) {
    let animatedClass = 'animate__animated';
    if (el && typeof el === 'object') {
      el.classList.add(animatedClass);
      el.classList.toggle(classname);
    } 
    else if (el) {
      el = document.querySelector(el);
      el ? (el.classList.add(animatedClass), el.classList.toggle(classname)) : console.log('No such element');
    } 
    else {console.log('No value set')};
  }

  //Can check if element predefined as const/let/var or if we have element with '.class' or '#id' as el
  function checkElem(el) {
     // console.log(`0 object: ${el}`);
      //console.log(el);    
    if (el && typeof el === 'object') {
      //console.log(`1 object: ${el}`);
      //console.log(el);
        return el;
    } 
    else if (el) {
      el = document.querySelector(el);
      //console.log(`2 querySelector: ${el}`);
      //console.log(el);
      if(el && typeof el === 'object'){
        return el;
      }
      else {
        console.log('No such element');
        return false;
      }
    } 
    else {console.log('No value set')};
  }

  function listItems(el) {
  let ul = checkElem(el);
  if (!ul) return console.log(`No items found for element`);
    ul.addEventListener('click', (e) => {
      let li = e.target.closest('.nav-menu__item');
      let a = e.target.closest('.nav-menu__item a');
      let aText = a.innerText;
      let anchor = aText.toLowerCase();
      anchor = anchor.split(' ').join('');
      let anchorId = `#${anchor}`;
      if (!li || !ul.contains(li)) return;
      e.preventDefault();
      let target = checkElem(anchorId);
      if (!target) return;
      scrollIntoView(target);
    });
  //console.log(ul.children);
  }

listItems('.nav-menu');

function toggleEachClass(el, ...classes) {
  const node = (typeof el === 'string') ? document.querySelector(el) : el;
  if (!node) return;
  classes.flat().filter(Boolean).forEach(c => node.classList.toggle(c));
}

//toggleEachClass(article1, 'animate__animated', 'animate__fadeInLeftBig');

  function animateOnScroll(targetBlock, repeat = 0, fromTop = 0, ...funcs) {
  const target = (typeof targetBlock === 'string') ? document.querySelector(targetBlock) : targetBlock;
  if (!target) return;

  if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
  const triggerLine = document.createElement('span');
  Object.assign(triggerLine.style, {
    position: 'absolute',
    left: '0', top: `${fromTop}%`,
    width: '1px', height: '100px',
    pointerEvents: 'none', opacity: '0'
  });
  target.appendChild(triggerLine);

  const root = null;
  const rootMargin = '-40% 0px -40% 0px';

  const fire = () => {
    funcs.forEach(f => { if (typeof f === 'function') f(); });
  };

  const vh = window.innerHeight || document.documentElement.clientHeight;
  const lineY = 0.80 * vh;
  const r = triggerLine.getBoundingClientRect();
  const intersectsNow = (r.top <= lineY && r.bottom >= lineY);

  if (intersectsNow) {
    fire();
    if (repeat === 0) return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        fire();
        if (repeat === 0) { obs.disconnect(); }
        break;
      }
    }
  }, { root, rootMargin, threshold: 0 });

  observer.observe(triggerLine);

  requestAnimationFrame(() => {
    const rr = triggerLine.getBoundingClientRect();
    if (rr.top <= lineY && rr.bottom >= lineY) {
      fire();
      if (repeat === 0) observer.disconnect();
    }
  });
  window.addEventListener('load', () => {
    const rr = triggerLine.getBoundingClientRect();
    if (rr.top <= lineY && rr.bottom >= lineY) {
      fire();
      if (repeat === 0) observer.disconnect();
    }
  }, { once: true });
}

  function toggleClass(el, classname) {el.classList.toggle(classname)}; 
    
  function makeTransparent(...els) {
    const transparentClass = 'transparent';
    els.forEach(a => { a.classList.add(transparentClass);});
  };

  const galleryEl = document.getElementById('gallery');
  const moreBtn = document.getElementById('galleryLoadMoreBtn');
  const batch = 4;

  const gallerySection = galleryEl.closest('.gallery-section');
  
  function revealNextBatch() {
  const hiddenItems = galleryEl.querySelectorAll('.image-gallery__item.is-hidden');

  const gallerySectionHeight = gallerySection.offsetHeight;
  gallerySection.style.height = gallerySectionHeight+'px';

  const initialGalHeight = galleryEl.offsetHeight;
  let gallerySectionHeightNew;
  //console.log(`initialGalHeight:${initialGalHeight}`);

  hiddenItems.forEach((li, i) => {
      if (i < batch) {
      li.classList.add('is-invisible-a');
      li.classList.remove('is-hidden');
      setTimeout(()=> {
        li.classList.remove('is-invisible-a');
        let updatedGalHeight = galleryEl.offsetHeight;
        let galHeightDiff = updatedGalHeight - initialGalHeight;
        gallerySectionHeightNew = gallerySectionHeight + galHeightDiff;
        //console.log(`updatedGalHeight in func 1:${updatedGalHeight}`);
        gallerySection.style.height = gallerySectionHeightNew + 'px';
      }, 500);
    }
  });

  if (!galleryEl.querySelector('.image-gallery__item.is-hidden')) {
    setTimeout(()=> {moreBtn.remove(); gallerySection.style.height = gallerySectionHeightNew - 110 + 'px';}, 600);
    setTimeout(()=> {gallerySection.style.height = 'auto';}, 1600);   
  } else {
    setTimeout(()=> {gallerySection.style.height = gallerySectionHeightNew + 'px';}, 600);
    setTimeout(()=> {gallerySection.style.height = 'auto';}, 1600);
  };
}

  //----------------After DOM Loaded-----------------
  document.addEventListener('DOMContentLoaded', () => { 
    //-------Создаю слайдер с текстами---------
  const heroSlider = createSlider('topSlider', [
    { heading: 'Simple & Modern', text: 'We make the world beautiful everyday' },
    { heading: 'Smart & Functional', text: 'Designs that inspire and serve every purpose' },
    { heading: 'Green & Sustainable', text: 'Building today with care for tomorrow' },
    { heading: 'Elegant & Timeless', text: 'Architecture that never goes out of style' },
    { heading: 'Visionary & Bold', text: 'Turning ambitious ideas into living landmarks' }
  ]);

  const topMenu = document.querySelector(".nav-menu");
  const targetsList =[];
  function addClickTargets(parent) {
    targetsList.push();
  }

  addClickTargets(topMenu);

  const toggleNavBtn = checkElem('.hamburger-toggle');
  const toggleNav = toggleNavBtn?.addEventListener('click', function() {
    toggleClass(toggleNavBtn, 'is-clicked');
    toggleClass(topMenu, 'nav-menu--mob-visible');
  })

  const heroSection = document.querySelector('.hero-section');
  const aboutSection = document.querySelector('.about-section');
  const newsSection = document.querySelector('.news-section');
  //const gallerySection = document.querySelector('.gallery-section');
  const contactSection = document.querySelector('.contact-section');
  createDownArrow(heroSection, aboutSection);

  const article1 = document.querySelector('.content-section__container .content-article:nth-of-type(1)');  
  const article2 = document.querySelector('.content-section__container .content-article:nth-of-type(2)');  
  const article1ImgCol = article1?.querySelector('.img-col');  
  const article2ImgCol = article2?.querySelector('.img-col');

  makeTransparent(article2)

  // const animateArticle1 = () => toggleEachClass(article1, 'animate__animated', 'animate__fadeInLeftBig');
  // const animateArticle2 = () => toggleEachClass(article2, 'animate__animated', 'animate__fadeInRightBig');

  const animateArticle1 = () => togglesAnim(article1, 'animate__fadeInLeftBig');
  const animateArticle2 = () => togglesAnim(article2, 'animate__fadeInRightBig');

  const animateArticle1Img = () => togglesAnim(article1ImgCol, 'anim-left');
  const animateArticle2Img = () => togglesAnim(article2ImgCol, 'anim-right');
  

  // animateOnScroll(article1, 0, animateArticle1);
  // animateOnScroll(article2, 0, animateArticle2);

  //---------Вызываю анимацию во второй секции----------
  //animateOnScroll(article1, 0, 0, animateArticle1);
  animateOnScroll(article1, 0, 50, animateArticle1Img);
  animateOnScroll(article2, 0, 0, animateArticle2);
  animateOnScroll(article2, 0, 30, animateArticle2Img);


    lightGallery(galleryEl, {
        plugins: [lgZoom, lgThumbnail],
		thumbnail: true,
    	zoom: true,
		selector: '.image-gallery__link',
    	download: false,
        speed: 500,
        //backdropDuration: 500
    });

  document.querySelectorAll('.image-gallery__img').forEach(img => {
    img.loading = img.loading || 'lazy';
    if (!img.alt || img.alt === '..') img.alt = 'Architecture photo';
  });

moreBtn?.addEventListener('click', revealNextBatch);

const contactFormSubmitBtn = checkElem('#contactFormSubmitBtn');
const userMessage = checkElem('#userMessage');
const showTextarea = contactFormSubmitBtn.addEventListener('click', function() {
    userMessage.classList.remove('is-invisible');
    console.log(`Clicked submit! Looks like designer forgot textfield for the user message, Ivan!`);
},{once:true})

var map = L.map('map', {
  scrollWheelZoom: false
}).setView([50.020966, 36.31741], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
    
}).addTo(map);

var marker = L.marker([50.022966, 36.32741]).addTo(map);

});