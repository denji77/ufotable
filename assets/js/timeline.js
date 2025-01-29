$(function() {
    var scroll;
    var badgeOld;
    var badgeNew;
    var positionOld;
    var positionNew;
    var contents;
    var positionCon
    var modalHeight;
    var modalEnd;
    var modalInner;
    var scrollBottom;
    var modalOpen;
    contents = $('#contents');
    badgeOld = $('#old .badge_wrapper');
    badgeNew = $('#new .badge_wrapper');
    positionOld = badgeOld.offset().top;
    positionNew = badgeNew.offset().top;
    positionCon = contents.offset().top;

    function positionBG() {
        if ($(window).width() <= 768) {
            positionOld = contents.offset().top;
            positionNew = badgeNew.offset().top;
        } else {
            if ($(window).width() >= 1920) {
                positionOld = contents.offset().top;
                positionNew = badgeNew.offset().top - 80;

            } else {
                positionOld = contents.offset().top;
                positionNew = badgeNew.offset().top - ($(window).width() * 0.041666);
            }
        };
    };

    function scrollFixed() {
        scroll = $(window).scrollTop();
        if (scroll >= positionOld) {
            badgeOld.addClass("fixed");

        } else if (scroll < positionOld) {
            badgeOld.removeClass("fixed");
        }
        if (scroll >= positionNew) {
            badgeNew.addClass("fixed");
            badgeOld.hide();
        } else if (scroll < positionNew) {
            badgeNew.removeClass("fixed");
            badgeOld.show();
        }
    };
    
    positionBG();
    $(window).resize(positionBG);
    $(window).scroll(scrollFixed);


    // Display
    var body = $("body");
    var modalBtn = $(".modal_btn");
    var modal = $(".modal");
    var noscroll = "noscroll";
    var open = "open";
    var closebtn = $(".close_btn");

    function bgLock() {
        $(body).css({
            'position': 'fixed',
            'top': '-' + $(window).scrollTop() + 'px',
        });
    }

    function removeLock() {
        let scrollY = body.offset().top;
        $(body).css({
            'position': '',
            'top': '',
        });
        $(window).scrollTop(-scrollY);
    }
    $(document).click(function(event) {
        var target = $(event.target);
        if (target.hasClass('modal')) {
            target.removeClass(open);
            removeLock();
        }
    });

});

