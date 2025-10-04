'use strict';

				const pushedBtn1 = document.querySelector("#push1");
				function push1() {pushedBtn1.classList.toggle("out")};
				pushedBtn1.addEventListener("mouseover", push1);

				const pushedBtn2 = document.querySelector("#push2");
				function push2() {pushedBtn2.classList.toggle("pushed")};
				pushedBtn2.addEventListener("click", push2);

$(document).ready(function(){
  $('.slider').slick({
    arrows: false,
    dots: true,

    autoplay: true,
    autoplaySpeed: 4500,
    speed: 1500,
    infinite: true,
     fade: true,

     responsive: [
            {
                breakpoint: 998,
                settings: {
                    dots: false,
                    arrows: true,
                    slidesToShow: 1,
                }
            },
            {breakpoint: 768,
                settings: {
                    dots: false,
                    arrows: false,
                    autoplaySpeed: 3000,
                    speed: 800,
                }  
            },
        ]

  });
});

