var swiper = new Swiper(".product-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    speed: 500,
    navigation: {
        nextEl: ".product-swiper-next",
        prevEl: ".product-swiper-prev",
    },
    breakpoints: {
        100: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        575: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        990: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
    }
});





$(document).ready(function () {
    $(".vid-play-ovrlay").click(function () {
        $(".vid-play-ovrlay").hide(0);
    });
    $(".vid-holder video").click(function () {
        $(".vid-play-ovrlay").show(0);
    });
});
var myVideo = document.getElementById("myVid");
function playVideo() {
    myVideo.play();
}





$('.prod-toggler').click(function () {
    $(this).parent().toggleClass('active')
    $(this).parent().siblings().removeClass('active');
});






{
    $(".tooltip-ico").mouseover(function () {
        $(this).parent().css({ "pointer-events": "all", "z-index": "9" });
    });
    $(".tooltip").mouseover(function () {
        $(this).css({ "pointer-events": "all", "z-index": "9" });
    });
    $(".tooltip-ico").mouseout(function () {
        $(this).parent().css({ "pointer-events": "none", "z-index": "1" });
    });
    $(".tooltip").mouseout(function () {
        $(this).css({ "pointer-events": "none", "z-index": "1" });
    });
}



var swiper = new Swiper(".secondary-product-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    speed: 500,
    navigation: {
        nextEl: ".secondary-swiper-next",
        prevEl: ".secondary-swiper-prev",
    },
    breakpoints: {
        100: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        575: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        990: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
    }
});









function reveal() {
    var reveals = document.querySelectorAll(".confidence-step");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);




var swiper = new Swiper(".tst-slider", {
    slidesPerView: 2,
    spaceBetween: 20,
    speed: 500,
    loop: true,
    pagination: {
        el: ".tst-pagination",
        clickable: true,
    },
    breakpoints: {
        100: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        575: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 1,
        },
        1024: {
            slidesPerView: 2,
        },
    }
});


var swiper = new Swiper(".insta-slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    speed: 400,
    initialSlide: 1,
    loop: true,
    breakpoints: {
        100: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        500: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        768: {
            spaceBetween: 15,
        },
        1024: {
            slidesPerView: 4,
        },
    }
});












// SLLLLLLLICK

$(document).ready(function () {

    mobileOnlySlider(".mySlick", true, false, 1025);

    function mobileOnlySlider($slidername, $dots, $arrows, $breakpoint) {
        var slider = $($slidername);
        var settings = {
            mobileFirst: true,
            dots: true,
            arrows: false,
            speed: 600,
            touchThreshold: 100,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            focusOnSelect: true,
            centerPadding: '0px',
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: $breakpoint,
                    settings: "unslick"
                },
                {
                    breakpoint: 1025,
                    settings: "unslick",
                },
                {
                    breakpoint: 400,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 100,
                    settings: {
                        centerMode: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },

            ]
        };

        slider.slick(settings);

        $(window).on("resize", function () {
            if ($(window).width() > $breakpoint) {
                return;
            }
            if (!slider.hasClass("slick-initialized")) {
                return slider.slick(settings);
            }
        });
    } // Mobile Only Slider
}); 