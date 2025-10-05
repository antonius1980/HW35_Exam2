        $(document).ready(function(){
          $('.slider').slick({
            arrows: false,
            dots: true,

            autoplay: true,
            autoplaySpeed: 1500,
            speed: 2500,
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