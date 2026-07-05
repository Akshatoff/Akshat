import { useEffect } from "react";
import gsap from "gsap";
import "../App.css";

export default function Skills() {
  const row1Skills = ["REACT.JS", "NEXT.JS", "TYPESCRIPT", "THREE.JS", "GSAP"];
  const row2Skills = [
    "C++",
    "PYTHON",
    "MYSQL",
    "HTML",
    "CSS",
    "JAVA",
    "JAVASCRIPT",
  ];

  // FIXED: Ensure identical arrays are spread so the math lines up perfectly for the loop
  const content1 = [...row1Skills, ...row1Skills, ...row1Skills];
  const content2 = [...row2Skills, ...row2Skills, ...row2Skills];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track-1", {
        xPercent: -33.33,
        repeat: -1,
        duration: 15,
        ease: "none",
      });

      gsap.fromTo(
        ".marquee-track-2",
        { xPercent: -33.33 },
        {
          xPercent: 0,
          repeat: -1,
          duration: 20,
          ease: "none",
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="skills-viewport">
        <div className="grid-bg-skills">
          <div className="marquee-container">
            <div className="marquee-track marquee-track-1">
              {content1.map((skill, index) => (
                <span key={index} className="skill-item">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="marquee-container">
            <div className="marquee-track marquee-track-2">
              {content2.map((skill, index) => (
                <span key={index} className="skill-item">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
