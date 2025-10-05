'use strict';

function createSlider(id, slides) {

  const sliderContainer = document.getElementById(id);
  if (!sliderContainer) throw new Error(`#${id} not found`);
  sliderContainer.innerHTML = '';

  slides.forEach(({ heading = '', text = '' }, i) => {
    const slide = document.createElement('div');
    slide.className = `slider-slide slide-${i + 1}`;
    let headingNum;
    i = 0 ? headingNum = 1 : headingNum = 2;
    
    slide.innerHTML = `
    <div class="container section__container">  
      <div class="slider__content sl-content">  
        <h${headingNum} class="heading heading-1">${heading}</h${headingNum}>
        <p class="slide__text">${text}</p>
      </div>
    </div>`;
    sliderContainer.appendChild(slide);
  });

// function testCreateSlider(id, slides) {
// const sliderData = {};
// sliderData.id = id.id;
// sliderData.tagName = id.nodeName;
//sliderData.slidesQuantity = slidesNumb;

//let slidesData = createSlidesData(slidesNumb);
  //sliderConfig.slides = slides;
  //let slidesNames = sliderConfig.slides;

//sliderData.slidesArray = slidesData;

// console.log(sliderData);
}
//let heroSlider = createSlider(topSlider, 5);


// function createSlidesData(slidesNumb, slideCode) {
//   let slidesData = [];

//   for (let sl = 0; sl < slidesNumb; sl++) {
//     let slideInfo = {};
//     let slideClass = `slide-${sl + 1}`;
//     slideInfo.class = slideClass;
//     //let slideBg = ;
//     slidesData.push(slideInfo);
//   }
//   return slidesData;
// }

let heroSlider = createSlider('topSlider', [
  { heading: 'Simple & Modern', text: 'We make the world beautiful everyday' },
  { heading: 'Simple & Modern 2', text: 'Increasing prosperity in our lives' },
  { heading: 'Simple & Modern 3', text: 'Successful businesses have many things in common' },
  { heading: 'Simple & Modern 4', text: 'We make the world beautiful everyday' },
  { heading: 'Simple & Modern 5', text: 'We make the world beautiful everyday' }
]);




				const pushedBtn1 = document.querySelector("#push1");
				function push1() {pushedBtn1.classList.toggle("out")};
				//pushedBtn1.addEventListener("mouseover", push1);

				const pushedBtn2 = document.querySelector("#push2");
				function push2() {pushedBtn2.classList.toggle("pushed")};
				//pushedBtn2.addEventListener("click", push2);


  const host = document.querySelector('.content-article');   
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';

  const triggerLine = document.createElement('span');
  Object.assign(triggerLine.style, {
    position: 'absolute',
    left: '0', top: '50%',
    width: '1px', height: '50px',
    pointerEvents: 'none', opacity: '0'
  });
  host.appendChild(triggerLine);

  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        obs.disconnect();
        push1();
        push2();
        break;
      }
    }
  }, {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  });

  io.observe(triggerLine);