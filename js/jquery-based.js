        $(document).ready(function(){

			const anim = 'animate__animated animate__fadeInUp';
			const anim2 = 'animate__animated -animate__delay-1s animate__slow animate__fadeInUpBig';
			//const anim  = 'animate__animated animate__lightSpeedInLeft';

			$('.hero-slider')
			.on('init', function (e, slick) {
				const $slides = $(slick.$slides);

				$slides.find('.heading').addClass(anim  + ' is-prep is-paused');
				$slides.find('.slide__text').addClass(anim2 + ' is-prep is-paused');
				//console.log('Init');

				const $cur = $slides.eq(slick.currentSlide);
				requestAnimationFrame(() => {
				// void $cur[0].offsetWidth;
				$cur.find('.heading').removeClass('is-prep is-paused');
				$cur.find('.slide__text').removeClass('is-prep is-paused');
				});
			})
			.on('beforeChange', function (e, slick, current, next) {
				const $slides = $(slick.$slides);

				$slides.filter('[data-slick-index="'+current+'"]').find('.heading')
				.removeClass(anim + ' is-prep is-paused');
				$slides.filter('[data-slick-index="'+current+'"]').find('.slide__text')
				.removeClass(anim2 + ' is-prep is-paused');


				$slides.filter('[data-slick-index="'+next+'"]').find('.heading')
				.addClass(anim + ' is-prep is-paused');
				$slides.filter('[data-slick-index="'+next+'"]').find('.slide__text')
				.addClass(anim2 + ' is-prep is-paused');
			})
			.on('afterChange', function (e, slick, current) {
				const $slides = $(slick.$slides);
				$slides.filter('[data-slick-index="'+current+'"]').find('.heading')
				.removeClass('is-prep is-paused');
				$slides.filter('[data-slick-index="'+current+'"]').find('.slide__text')
				.removeClass('is-prep is-paused');
			});



          $('.hero-slider').slick({
            arrows: false,
            dots: true,

            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1500,
            infinite: true,
            fade: true,
			slidesPerRow: 3,

            responsive: [
                    {
                        breakpoint: 991,
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



          $('.news-slider').slick({
            arrows: true,
            dots: true,

            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1500,
            infinite: true,
            fade: false,
			//slidesPerRow: 2,
			slidesToShow: 3,
  			slidesToScroll: 1,

            responsive: [
                    {
                        breakpoint: 991,
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

		