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


  const test = document.querySelector('.content-section__container .content-article');  
//checkElem('.article');
//checkElem(test);

  function listItems(el) {
  console.log(el);
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
      console.log('clicked:', li);
      console.log(a);
      console.log(aText);
      console.log(anchorId);
      e.preventDefault();
      let target = checkElem(anchorId);
      if (!target) return;
      scrollIntoView(target);
    });
  console.log(ul.children);
  console.log(ul);
  }



listItems('.nav-menu');

 //togglesAnim('.test', 'animate__fadeInLeftBig');



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
    width: '1px', height: '50px',
    pointerEvents: 'none', opacity: '0'
  });
  target.appendChild(triggerLine);

  const root = null;
  const rootMargin = '-80% 0px -20% 0px';

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

  const heroSection = document.querySelector('.hero-section');
  const aboutSection = document.querySelector('.about-section');
  const newsSection = document.querySelector('.news-section');
  const gallerySection = document.querySelector('.gallery-section');
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








});





