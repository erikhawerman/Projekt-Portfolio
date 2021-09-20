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

//Hamburgermeny
let hamburgerMenyUppe = false;

function hamburgerMenuOpenClose() {
  console.log("hej");
  $(".mobile-menu").slideToggle(100, function () {
    if (!hamburgerMenyUppe) {
      $(".page-to-dim").fadeTo(100, 0.1);
      hamburgerMenyUppe = true;
    } else {
      $(".page-to-dim").fadeTo(100, 1);
      hamburgerMenyUppe = false;
    }
    $(".menu-list").toggle();
  });
}
$(".burger-icon").click(function () {
  hamburgerMenuOpenClose();
});

//Smooth-scrolls mobile

$(".logo").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#first-page").offset().top,
    },
    1000
  );
});

$("#startsida").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#first-page").offset().top,
    },
    1000,
    hamburgerMenuOpenClose()
  );
});
$("#om-oss").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#second-page").offset().top,
    },
    1000,
    hamburgerMenuOpenClose()
  );
});
$("#vi-jobbar-inom").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#third-page").offset().top,
    },
    1000,
    hamburgerMenuOpenClose()
  );
});
$("#kontakta-oss").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#fourth-page").offset().top,
    },
    1000,
    hamburgerMenuOpenClose()
  );
});

//Smooth scrolls browser

$(".logo").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#first-page").offset().top,
    },
    1000
  );
});

$("#startsida-browser").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#first-page").offset().top,
    },
    1000
  );
});
$("#om-oss-browser").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#second-page").offset().top,
    },
    1000
  );
});
$("#vi-jobbar-inom-browser").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#third-page").offset().top,
    },
    1000
  );
});
$("#kontakta-oss-browser").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#fourth-page").offset().top,
    },
    1000
  );
});

//deklarera staplarna som ska fyllas
const staplar = $(".skillbox-to-fill");
const procentStapel = function (stapel, procent) {
  staplar[stapel - 1].procent = procent;
};

procentStapel(1, 75);
procentStapel(2, 45);
procentStapel(3, 95);
procentStapel(4, 25);

//funktion för att fylla staplarna
const fyllstapel = function (stapel) {
  let i = 0;
  setInterval(function () {
    if (i >= stapel.procent) return;
    i++;
    stapel.style.width = `${i}%`;
  }, 30);
};

//Skapa en observer
const obsCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    fyllstapel(entry.target);
    this.unobserve(entry.target);
  }
};

// Observera 2 olika punkter vid samma ställe, med en pixels skillnad för att båda ska köras samtidigt
const egenskapsObserver = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0.15,
});
const egenskapsObserver2 = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0.14,
});

// Fyll staplarna
Array.from(staplar).forEach(function (egenskap, i) {
  if (i % 2 === 0) egenskapsObserver.observe(egenskap);
  else {
    egenskapsObserver2.observe(egenskap);
  }
});
