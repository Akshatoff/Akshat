import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navbar({ isOpen, onClose }: NavbarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const { contextSafe } = useGSAP(
    () => {
      if (isOpen) {
        gsap.set(containerRef.current, { xPercent: 100, display: "flex" });
        gsap.set(linksRef.current, { opacity: 0, y: 40 });
        gsap.set(closeBtnRef.current, { opacity: 0, scale: 0.8 });

        const tl = gsap.timeline();

        tl.to(containerRef.current, {
          xPercent: 0,
          duration: 0.7,
          ease: "power3.inOut",
        })
          .to(
            linksRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.2",
          )
          .to(
            closeBtnRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "back.out(1.7)",
            },
            "-=0.4",
          );
      }
    },
    { dependencies: [isOpen], scope: containerRef },
  );

  const handleClose = contextSafe((e?: React.MouseEvent, targetPath?: string) => {
    if (e) e.preventDefault();

    // 1. SPECIAL TRANSITION FOR CONTACT PAGE
    if (targetPath === "/contact") {
      const contactEl = linksRef.current[2]; // "CONTACT" is index 2
      const otherElements = [
        linksRef.current[0],
        linksRef.current[1],
        closeBtnRef.current,
      ];

      const tl = gsap.timeline({
        onComplete: () => {
          navigate(targetPath);
        },
      });

      // Fade out "HOME", "ABOUT", and "X"
      tl.to(otherElements, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      });

      // Animate "CONTACT" up to exact match the new page layout
      if (contactEl) {
        const currentRect = contactEl.getBoundingClientRect();
        const targetTop = window.innerHeight * 0.1; // 10vh from top
        const yMove = targetTop - currentRect.top;

        tl.to(
          contactEl,
          {
            y: yMove,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "-=0.1",
        );
      }
      return; // Exit here so we don't run the slide-out animation below
    }

    // 2. DEFAULT TRANSITION (Slide out to the right)
    const tl = gsap.timeline({
      onComplete: () => {
        if (targetPath) {
          navigate(targetPath);
        } else {
          gsap.set(containerRef.current, { display: "none" });
          onClose();
        }
      },
    });

    tl.to([linksRef.current, closeBtnRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
    }).to(
      containerRef.current,
      {
        xPercent: 100,
        duration: 0.6,
        ease: "power3.inOut",
      },
      "-=0.1",
    );
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 hidden h-screen w-full bg-white flex-col items-center justify-center gap-6"
    >
      <button
        ref={closeBtnRef}
        onClick={() => handleClose()}
        className="absolute top-8 right-8 text-black text-4xl font-bold hover:opacity-70 transition-opacity cursor-pointer"
      >
        ✕
      </button>

      {[
        { label: "HOME", href: "/" },
        { label: "ABOUT", href: "/about" },
        { label: "CONTACT", href: "/contact" },
      ].map((link, index) => (
        <a
          key={link.label}
          ref={(el) => {
            linksRef.current[index] = el;
          }}
          href={link.href}
          onClick={(e) => handleClose(e, link.href)}
          className="navtext hover:opacity-70 transition-opacity cursor-pointer block leading-none"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
