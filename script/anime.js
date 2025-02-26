const heading = document.getElementById("heading");
const width = window.innerWidth;
const particlebg = document.getElementById("particles-js");


if (width > 1000) {
    particlesJS.load('particles-js', 'assets/particles.json', function() {
    
    })
    particlebg.style.display = "block";
    console.log(width);
    
}
else {
    particlebg.style.display = "none";
}


CustomEase.create("cubic", "0.83, 0, 0.17, 1");

let isAnimating = false;


gsap.registerPlugin("ScrollTrigger")

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#abouthead",
        start:"-340% top",
        end: "100% bottom",
        scrub: 5,
        
        
    }
});


let tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#skill-heading",
        start: "-20% top",
        end: "100% bottom",
        scrub: 5,
        
    }
})

tl.fromTo(
    "#abouthead",
    {
        display: "none",
        opacity: 0,
        x: -100,
    },
    {
        display: "block",
        opacity:1,
        x: 0,
        duration: 1,
        ease: "power4.out",
    }
)

tl.fromTo(
    ".box",
    {
        display: "none",
        opacity: 0,
        x: -100,
    },
    {
        display: "block",
        opacity:1,
        x: 0,
        duration: 1,
        ease: "power4.out",
    }
)

tl.fromTo(
    "#description",
    {
        display: "none",
        opacity: 0,
        x: -300,
    },
    {
        display: "block",
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out"
    }
)

tl.fromTo(
    ".card-container", 
    {
        display: "none",
        opacity: 0,
        x: 300,
    },
    {
        display: "flex",
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out"
    }
)

tl2.fromTo(
    "#skill-heading",
    {
        display: "none",
        opacity: 0,
        x: 300,
    },
    {
        display: "block",
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out",
    }
)
tl2.fromTo(
    ".skill-container",
    {
        display: "none",
        opacity: 0,
        x: 300,
    },
    {
        display: "flex",
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out",
    }
)



function initializeCards() {
    let cards = Array.from(document.querySelectorAll(".work-card"));
    gsap.to(cards, {
        y: (i) => -15 + 15 * i + "%",
        z: (i) => 15 * i,
        duration: 1,
        ease: "cubic",
        stagger: -0.1,

    });
}


document.addEventListener("DOMContentLoaded", function() {
    initializeCards();


    var typwriter = new Typewriter(heading, {
        loop: true,
        delay: 20,

    });
    typwriter
        .pauseFor(200)
        .typeString("Full Stack Developer")
        .pauseFor(1500)
        .deleteChars(20)
        .typeString("Programmer")
        .pauseFor(1500)
        .deleteChars(10)
        .typeString("After Effects Master")
        .pauseFor(1500)
        .deleteChars(20)
        .typeString("Chess Professional")
        .pauseFor(1500)
        .deleteChars(18)
        .typeString("Weeb")
        .pauseFor(1500)
        .start();
})

document.addEventListener("click", function() {
    if (isAnimating) return;

    isAnimating = true;

    let slider = document.querySelector(".work-slider");
    let cards = Array.from(slider.querySelectorAll(".work-card"));
    let lastCard = cards.pop();
    let nextCard = cards[cards.length - 1];

    gsap.to(lastCard, {
        y: "+=150%",
        duration: 0.75,
        ease: "cubic",
        onComplete: () => {
            slider.prepend(lastCard);
            initializeCards();
            setTimeout(() => {
                isAnimating = false;
            }, 1000);
    
        },

       
    });

    
});


