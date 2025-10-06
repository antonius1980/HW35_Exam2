'use strict';
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


const host = article1;   
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
        //obs.disconnect();
        toggleClass(imgColLeft, 'anim-left');
        article1.classList.add('animate__animated', 'animate__fadeInLeftBig');
        toggleClass(imgColRight, 'anim-right');
         article2.classList.add('animate__animated', 'animate__fadeInRight');
        break;
      }
    }
  }, {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  });

  io.observe(triggerLine);

  function checkElem(el) {
  const node = (typeof el === 'string') ? document.querySelector(el) : el;
  if (!node) return;
  node;
  console.log(node);
}
//checkElem('.test');

  function animateOnScroll(targetBlock, repeat, fromTop, ...funcs) {
    const target = targetBlock;
    if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
    const triggerLine = document.createElement('span');
    Object.assign(triggerLine.style, {
      position: 'absolute',
      left: '0', top: `${fromTop}%`,
      width: '1px', height: '50px',
      pointerEvents: 'none', opacity: '0'
    });
    target.appendChild(triggerLine);

    const observer = new IntersectionObserver((entries, obs) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          if (repeat === 0) { obs.disconnect();}
          //func();
          funcs.forEach(f => f());
          break;
        }
      }
    }, {
      root: null,
      rootMargin: '-70% 0px -30% 0px',
      threshold: 0
    });

    observer.observe(triggerLine);
  }