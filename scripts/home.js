const btnhome1 = document.getElementById("nhome1");
const btnhome = document.getElementById("nhome");
const btn = document.getElementById("about");
const btn11 = document.getElementById("nabout1");
const btn1 = document.getElementById("nabout");
const home = document.getElementById("home");
const about = document.getElementById("aboutpage");
const skills = document.getElementById("skillpage");
const skillbtn = document.getElementById("Skills");
const skillbtn1 = document.getElementById("aSkills");
const skillbtn21 = document.getElementById("nSkills");
const skillbtn2 = document.getElementById("nSkills1");
const workbtn = document.getElementById("works");
const workbtn11 = document.getElementById("nworks");
const workbtn1 = document.getElementById("nworks1");
const works = document.getElementById("workspage");
const slider = document.querySelector('.slider');
const ham = document.getElementById('ham');
const navmobile = document.getElementById('navmobile');


ham.addEventListener("click", function() {
 if(navmobile.style.display == "block") {
  navmobile.style.display = "none";
 }
 else {
  navmobile.style.display = "block";
 }
 
});
/* Initial Page Load*/
anime.set('#main', { opacity: 0 });
anime.set('#sub', { opacity: 0 });

function fadeIn(element) {
  const timeline = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1000,
  });

  timeline.add({
    targets: element,
    opacity: [0, 1],
    translateY: [100, 0],
  });

  timeline.play();
}

setTimeout(() => {
  fadeIn('#main');
}, 1000);

setTimeout(() => {
  fadeIn('#sub');
}, 2000);

function showSection(section) {
  const sections = [home, about, skills, works];

  sections.forEach((s) => {
    if (s === section) {
      fadeIn(s);
      s.style.display = 'block';
    } else {
      s.style.display = 'none';
    }
  });
}

btnhome.addEventListener("click", function() {
  showSection(home);
});
btnhome1.addEventListener("click", function() {
  showSection(home);
});

btn.addEventListener("click", function() {
  showSection(about);
});
btn1.addEventListener("click", function() {
  showSection(about);
});
btn11.addEventListener("click", function() {
  showSection(about);
});

skillbtn.addEventListener("click", function() {
  showSection(skills);
});

skillbtn1.addEventListener("click", function() {
  showSection(skills);
});
skillbtn2.addEventListener("click", function() {
  showSection(skills);
});
skillbtn21.addEventListener("click", function() {
  showSection(skills);
});

workbtn.addEventListener("click", function() {
  showSection(works);
});
workbtn1.addEventListener("click", function() {
  showSection(works);
});
workbtn11.addEventListener("click", function() {
  showSection(works);
});


function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);

