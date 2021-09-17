"use strict";
// Slider
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnPause = document.querySelector(".btn-pause");
let currentSlide = 0;
const maxSlides = slides.length;
let sliderRunning = true;
let run;
const pausePlayDelay = 500;
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

// Next slide
const nextSlide = function () {
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
};

slider.addEventListener("click", function () {
  if (sliderRunning) {
    btnPause.style.display = "block";
    sliderRunning = false;
    clearInterval(run);
    btnPause.classList.contains("play")
      ? btnPause.classList.remove("play")
      : "";
    console.log("hej");
    btnPause.classList.add("paused");
    setTimeout(function () {
      btnPause.style.display = "none";
    }, pausePlayDelay);
  } else {
    btnPause.style.display = "block";
    setTimeout(function () {
      btnPause.style.display = "none";
    }, pausePlayDelay);
    sliderRunning = true;
    btnPause.classList.contains("paused")
      ? btnPause.classList.remove("paused")
      : "";
    console.log("test");
    btnPause.classList.add("play");
    nextSlide();
    run = setInterval(nextSlide, 2000);
  }
});
const startTimer = function () {
  run = setInterval(nextSlide, 2000);
};
startTimer();
