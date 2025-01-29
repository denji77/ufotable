'use-strict';
const thumbSwiperPC = new Swiper('.thumbswiper_pc', {
    slidesPerView: 5,
    centeredSlides: true,
    allowTouchMove: false,
});
const mainSwiper = new Swiper('.mainswiper', {
    speed: 200,
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    loopedSlides: 5,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});
var thumbSwiperSP;
$(window).on('load resize', function() {
    var w = $(window).width();
    if (w <= 768) {
        if (thumbSwiperSP) {
            return;
        } else {
            thumbSwiperSP = new Swiper('.thumbswiper_sp', {
                speed: 200,
                slidesPerView: 4.2,
                loopedSlides: 5,
                centeredSlides: true,
                loop: true,
                slideToClickedSlide: true,
                updateOnWindowResize: true,
                loopAdditionalSlides: 1,
                threshold: 8,
            });
            mainSwiper.controller.control = thumbSwiperSP;
            thumbSwiperSP.controller.control = mainSwiper;
        }
    } else {
        if (thumbSwiperSP) {
            thumbSwiperSP.destroy();
            thumbSwiperSP = undefined;
            mainSwiper.controller.control = undefined;
        }
    }
});
var slideNum;
$('.thumbPC').on('mousedown', (e) => {
    slideNum = $(e.currentTarget).attr('data-index') - 1;
    mainSwiper.slideToLoop(slideNum);
    return false;
});
mainSwiper.on('slideChange', () => {
    slideNum = mainSwiper.realIndex;
    thumbSwiperPC.slideToLoop(slideNum);
    return false;
});

const navswiper = new Swiper(".navswiper", {});
const comicswiper = new Swiper(".comicswiper", {
    preloadImages: false,
    lazy: {
        loadPrevNext: true,
    },
    loop: true,
    thumbs: {
        swiper: navswiper,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

$(function() {
    if ($("#news".length)) {
        $('li.news-list-item:nth-child(n+5)').addClass("hide_sp");
    }

    var pagescroll = $('#pagetopbtn');
    pagescroll.hide();
    $(window).scroll(function() {
        scrollHeight = $(document).height();
        scrollPosition = $(window).height() + $(window).scrollTop();
        stopHeight = 27;
        if ($("#banner").length) {
            footHeight = $("footer").innerHeight() + $("#banner").innerHeight() + $("#sns").innerHeight();
            stopHeight = $("#banner").innerHeight() + $("#sns").innerHeight() + 27;
        } else {
            footHeight = $("footer").innerHeight();
        }

        if ($(this).scrollTop() > 600) {
            pagescroll.fadeIn("fast");
        } else {
            pagescroll.fadeOut("fast");
        }

        if (scrollHeight - scrollPosition <= footHeight) {
            $("#pagetopbtn").css({
                position: "absolute",
                bottom: stopHeight,
            });
        } else {
            $("#pagetopbtn").css({
                position: "fixed",
                bottom: "27px"
            });
        }
    });
    pagescroll.click(function() {
        $('body, html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    var urlHash = location.hash;
    if (urlHash) {
        $('body,html').stop().scrollTop(0);
        setTimeout(function() {
            var headerHight = 0;
            var target = $(urlHash);
            var position = target.offset().top - headerHight;
            $('body,html').stop().animate({
                scrollTop: position
            }, 400);
        }, 100);
    }
    $('a[href^="#"]').click(function() {
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({
            scrollTop: position
        }, speed);
        return false;
    });


    //fade in tr
    var fadeCont = $('.fi');
    var active = 'active';
    scrollFadein();
    $(window).scroll(function() {
        scrollFadein();
    });

    function scrollFadein() {
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (window.matchMedia("(max-width: 768px)").matches) {
            fadeCont.each(function() {
                var position = $(this).offset().top;
                if (scroll > position - windowHeight + 20) {
                    $(this).addClass(active);
                }
            });
        } else {
            fadeCont.each(function() {
                var position = $(this).offset().top;
                if (scroll > position - windowHeight + 50) {
                    $(this).addClass(active);
                }
            });
        }
    }
});

