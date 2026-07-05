import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PROJECTS = [
  {
    id: 1,
    title: "Interior Design Studio Showcase",
    img: "/works/inte.png",
  },
  {
    id: 2,
    title: "Real Estate Website Showcase",
    img: "/works/real.png",
  },
  {
    id: 3,
    title: "Productivity Tool Daisy",
    img: "/works/daisy.png",
  },
  {
    id: 4,
    title: "Aces - Gamified Learning",
    img: "/works/aces.png",
  },
  {
    id: 5,
    title: "Ordinatrix 26.0 - Tech Fest",
    img: "/works/ordin.png",
  },
  {
    id: 6,
    title: "Crypt@trix - Cryptography Hunt",
    img: "/works/crypt.png",
  },
  {
    id: 7,
    title: "StarChessClub App",
    img: "/works/star.png",
  },
  {
    id: 8,
    title: "POLAR - Under Development",
    img: "/works/polar.jfif",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  // Track the scroll position via a proxy object
  const scrollProxy = useRef({ rotation: 0 });

  useGSAP(
    () => {
      const cards = cardsRef.current;
      const total = cards.length;

      const radius = 580; // Makes the overall spiral wider
      const angleStep = 0.55; // Puts more horizontal space between card centers
      const yStep = 140; // Puts more vertical space between the cards
      const halfTotal = total / 2;

      // Create quickSetters for high-performance updates
      const setters = cards.map((card) => ({
        x: gsap.quickSetter(card, "x", "px"),
        y: gsap.quickSetter(card, "y", "px"),
        z: gsap.quickSetter(card, "z", "px"),
        rotationY: gsap.quickSetter(card, "rotationY", "deg"),
        opacity: gsap.quickSetter(card, "opacity"),
        pointerEvents: gsap.quickSetter(card, "pointerEvents"),
      }));

      const updateSpiral = () => {
        const globalRotation = scrollProxy.current.rotation;

        // Convert current rotation progress into a card index offset shift
        const cardShift = globalRotation / angleStep;

        let closestCardIndex = 0;
        let minDistance = Infinity;

        cards.forEach((_, i) => {
          // 1. Calculate a raw virtual index position based on scroll movement
          const rawIndex = i + cardShift;

          // 2. INFINITE LOOP: Map indices seamlessly within [-halfTotal, halfTotal]
          const wrappedIndex = gsap.utils.wrap(-halfTotal, halfTotal, rawIndex);

          // 3. Compute spatial coordinates based on the wrapped layout positioning
          const angle = wrappedIndex * angleStep;
          const y = wrappedIndex * yStep;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const rotY = angle * (180 / Math.PI);

          // Track which card element sits closest to the front center camera view (wrappedIndex close to 0)
          const absWrapped = Math.abs(wrappedIndex);
          if (absWrapped < minDistance) {
            minDistance = absWrapped;
            closestCardIndex = i;
          }

          // 4. INVISIBLE SNAP: Fade cards out to 0 before they hit the snap thresholds at boundaries
          const opacityRange = gsap.utils.mapRange(
            2.2,
            halfTotal - 0.2,
            1,
            0,
            absWrapped,
          );
          const finalOpacity = gsap.utils.clamp(0, 1, opacityRange);

          // Apply transforms instantly
          setters[i].x(x);
          setters[i].y(y);
          setters[i].z(z);
          setters[i].rotationY(rotY);
          setters[i].opacity(finalOpacity);

          // Prevent clicking or hovering background/invisible cards
          if (z < -50 || finalOpacity < 0.1) {
            setters[i].pointerEvents("none");
          } else {
            setters[i].pointerEvents("auto");
          }
        });

        // 5. Dynamic Title Tracking: Directly push title updates to the DOM node
        if (titleTextRef.current) {
          titleTextRef.current.innerText = PROJECTS[closestCardIndex].title;
        }
      };

      // Initial layout pass
      updateSpiral();

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();

        // FIXED DIRECTION: Changed (+) to (-) so scrolling down brings subsequent cards forward
        const targetRotation = scrollProxy.current.rotation - e.deltaY * 0.0012;

        gsap.to(scrollProxy.current, {
          rotation: targetRotation,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: updateSpiral,
        });
      };

      const viewport = containerRef.current;
      if (!viewport) return;

      viewport.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        viewport.removeEventListener("wheel", handleWheel);
      };
    },
    { scope: containerRef },
  );

  return (
    <div className="spiral-viewport" ref={containerRef}>
      <div className="grid-bg" />
      <div className="spiral-stage">
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="spiral-card"
          >
            <div className="card-inner">
              <img src={project.img} alt={project.title} draggable="false" />
            </div>
          </div>
        ))}
      </div>

      {/* Title display block tracking active central items */}
      <div className="title-toast visible" ref={toastRef}>
        <span className="toast-icon">✨</span>
        <span ref={titleTextRef}></span>
      </div>
    </div>
  );
}
