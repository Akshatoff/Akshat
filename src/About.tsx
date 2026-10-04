import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import Skills from "./components/Skills";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const text =
    "I am Akshat Hatwal, a web developer and programmer in India. I have been doing web development for over 6 years, and specialise in making modern websites for design businesses. I specialise in making animations using HTML, CSS, React, and Next.js.";
  const wordArray = text.split(" ");

  // Converted to objects to hold both the image and the specific tooltip text
  const leftCards = [
    { src: "/me.jpg", text: "Hi, I'm Akshat." },
    { src: "/code.jpg", text: "This guy builds things." },
    { src: "pyro.jpg", text: "Pyaarutech My Love" },
  ];

  const rightCards = [
    {
      src: "/chess.png",
      text: "Thinking 7 parallel Universe Ahead",
    },
    { src: "/books.png", text: "Just one more chapter" },
    { src: "/awards.png", text: "Winning like a wow." },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
        },
      });

      const staggerTime = 0.1;
      const baseWordDuration = 0.5;
      const syncDuration = wordArray.length * staggerTime + baseWordDuration;

      tl.to(
        ".word",
        {
          color: "rgba(255, 255, 255, 1)",
          stagger: staggerTime,
          duration: baseWordDuration,
        },
        0,
      );

      tl.fromTo(
        ".lc-1",
        { rotation: 0 },
        { rotation: -120, ease: "none", duration: syncDuration },
        0,
      );
      tl.fromTo(
        ".lc-2",
        { rotation: 60 },
        { rotation: -60, ease: "none", duration: syncDuration },
        0,
      );
      tl.fromTo(
        ".lc-3",
        { rotation: 120 },
        { rotation: 0, ease: "none", duration: syncDuration },
        0,
      );

      tl.fromTo(
        ".rc-1",
        { rotation: 0 },
        { rotation: 120, ease: "none", duration: syncDuration },
        0,
      );
      tl.fromTo(
        ".rc-2",
        { rotation: -60 },
        { rotation: 60, ease: "none", duration: syncDuration },
        0,
      );
      tl.fromTo(
        ".rc-3",
        { rotation: -120 },
        { rotation: 0, ease: "none", duration: syncDuration },
        0,
      );
    }, containerRef);

    return () => ctx.revert();
  }, [wordArray.length]);

  return (
    <>
      <div className="about-viewport" ref={containerRef}>
        <div className="side-cards-container left-side">
          {leftCards.map((card, i) => (
            <div key={i} className={`card left-card lc-${i + 1}`}>
              <img src={card.src} alt={`Work ${i + 1}`} />
              <div className="card-tooltip">{card.text}</div>
            </div>
          ))}
        </div>

        <div className="side-cards-container right-side">
          {rightCards.map((card, i) => (
            <div key={i} className={`card right-card rc-${i + 1}`}>
              <img src={card.src} alt={`Work ${i + 4}`} />
              <div className="card-tooltip">{card.text}</div>
            </div>
          ))}
        </div>

        <div className="grid-bg-about">
          <h1 className="text about-text">
            {text.split(" ").map((word, index) => (
              <span key={index} className="word">
                {word}{" "}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <Skills />
    </>
  );
}
