const intro = document.getElementById("intro");
const home = document.getElementById("home");
const background = document.getElementById("bg");
const about = document.getElementById("about");
const works = document.getElementById("works");
const skill = document.getElementById("skills");
const aboutheading = document.getElementById("about-title");
const aboutdescription = document.getElementById("about-description");
const heading = document.getElementById("heading");
const subhead = document.getElementById("subhead");
const subhead2 = document.getElementById("subhead2");
const subhead3 = document.getElementById("subhead3");
const subhead4 = document.getElementById("subhead4");
const loader = document.getElementById("loader");
const width = window.innerWidth;
const height = window.innerHeight;


loader.addEventListener("ended", function () {

  setTimeout(() => {

    background.style.display = "block";
  }, 1500);

  //Typewriter effect

  var typewriter = new Typewriter(subhead, {
    loop: true,
    delay: 50,
  });

  typewriter
    .pauseFor(2500)
    .typeString("Front End Developer")
    .pauseFor(1500)
    .deleteChars(20)
    .typeString("Programmer")
    .pauseFor(1500)
    .deleteChars(10)
    .typeString("Video Editor")
    .pauseFor(1500)
    .deleteChars(12)
    .typeString("Chess Professional")
    .pauseFor(1500)
    .deleteChars(18)
    .typeString("Weeb")
    .pauseFor(1500)
    .start();


  function fadeIn(element) {
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000,
    });
    timeline.add({
      targets: element,
      opacity: [0, 1],
      translateY: [-100, 0]
    });

    timeline.play();

  }

  function textFade(element) {
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000,
    });
    timeline.add({
      targets: element,
      opacity: [0, 1],
      translateX: [100, 0]
    });

    timeline.play();
  }



  setTimeout(() => {
    fadeIn(heading);
    fadeIn(subhead);
    fadeIn(intro);
  }, 500);

  home.style.background = "#010b12"
  loader.style.display = "none";

 

});


document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".image",
      start: '60% center',
      end: "200% center",
      scrub: 1,


    }
  })

  if (width >= 1900) {
    tl.to(".image", {
      x: -600,
      y: 1000,
      scale:0.75,
    })
  }
  else if (width >= 1300) {
    tl.to(".image", {
      x: -400,
      y: 800,
      scale: 0.75,
    })
  }
  else {

  tl.to(".image", {
    x: -390,
    y: 550,
    scale: 0.75,

  })
}
});



//Lenis 
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)