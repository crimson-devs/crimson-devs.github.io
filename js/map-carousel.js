$('.carousel').carousel({
    pause: true,
    interval: false
});

$('.poster').hover(function() {
    var sharkId = $(this).data("shark");
    sharkId = parseInt(sharkId);
    $(this).addClass("shadowOn");

    // turn off shadow for all other posters
    $('.poster').not(this).removeClass("shadowOn");
    clicked(sharkId, mapVis1);
})