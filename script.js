var base = document.getElementById("base")
var clip = document.getElementById("clip")
var bg = document.getElementById("bg");
var feFlood = document.getElementById("feFlood");

var mouseHover;
var raf;
var j = 0;
var opacityValue = 1;
var opacityStop;


base.addEventListener("mouseenter", function () {
    mouseHover = true;
    opacityStop = false;
}, false);

base.addEventListener("mouseleave", function () {
    mouseHover = false;
    window.setTimeout(function () {
        cancelAnimationFrame(raf);
        j = 0;
    }, 600);
}, false);

clip.addEventListener('transitionstart', function () {
    if (mouseHover) {
        solidColorOpacity(); 
        raf = window.requestAnimationFrame(bgAnimate);
    }
}, false);

clip.addEventListener('transitionend', function () {
    if (!mouseHover) {
        opacityValue = 1;
        feFlood.setAttribute("flood-opacity", 1);
        opacityStop = true;
    }
}, false);

function bgAnimate() {
    j = j - .2;
    if (j < -200) j = 0;
    bg.setAttribute("x", j + "%");
    raf = window.requestAnimationFrame(bgAnimate);
}

function solidColorOpacity() {
    opacityValue = opacityValue - 0.015;
    if (opacityValue < 0) return;
    if(opacityStop) return;
    feFlood.setAttribute("flood-opacity", opacityValue);
    window.requestAnimationFrame(solidColorOpacity);
}