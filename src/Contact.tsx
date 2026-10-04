import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FORM_STEPS = [
  {
    id: "name",
    label: "Let's start with your name",
    type: "text",
    placeholder: "John Doe",
  },
  {
    id: "email",
    label: "What's your email address?",
    type: "email",
    placeholder: "john@example.com",
  },
  {
    id: "message",
    label: "Tell us about your project",
    type: "textarea",
    placeholder: "Hello! I'd like to work with you on...",
  },
];

export default function ContactOS() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const formAreaRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  // Entrance animation whenever the step changes
  useGSAP(
    () => {
      if (formAreaRef.current) {
        // Roll in from the bottom
        gsap.fromTo(
          formAreaRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );

        // Auto-focus the new input
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    },
    { dependencies: [step], scope: containerRef }
  );

  const handleNext = contextSafe((e: React.FormEvent) => {
    e.preventDefault();

    // Prevent proceeding if empty
    if (!formData[FORM_STEPS[step]?.id as keyof typeof formData] && step < 3) {
      return;
    }

    // Roll out to the top
    gsap.to(formAreaRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setStep((prev) => prev + 1);
      },
    });
  });

  const currentField = FORM_STEPS[step];
  const isFinished = step === FORM_STEPS.length;

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-white flex flex-col items-center relative overflow-hidden"
    >
      {/*
        The top "CONTACT" text perfectly matches the end-state of the navbar animation
        so the transition feels seamless.
      */}
      <h1
        className="navtext leading-none absolute"
        style={{ top: "10vh" }}
      >
        CONTACT
      </h1>

      {/* Centered Form Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl px-6 pt-20">
        {!isFinished ? (
          <form
            ref={formAreaRef}
            onSubmit={handleNext}
            className="flex flex-col items-center w-full"
          >
            {/* Step Counter */}
            <span className="text-gray-400 font-mono mb-4 text-sm tracking-widest">
              STEP 0{step + 1} / 0{FORM_STEPS.length}
            </span>

            {/* Dynamic Label */}
            <label
              htmlFor={currentField.id}
              className="text-2xl md:text-3xl font-medium text-gray-800 mb-10"
            >
              {currentField.label}
            </label>

            {/* Dynamic Input (Swaps between input and textarea) */}
            {currentField.type === "textarea" ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                id={currentField.id}
                placeholder={currentField.placeholder}
                value={formData[currentField.id as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [currentField.id]: e.target.value })
                }
                className="w-full text-3xl md:text-5xl text-center font-bold bg-transparent border-b-4 border-black focus:outline-none pb-4 resize-none placeholder-gray-200"
                rows={2}
                onKeyDown={(e) => {
                  // Allow submitting the textarea with Cmd/Ctrl + Enter
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleNext(e);
                  }
                }}
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                id={currentField.id}
                type={currentField.type}
                placeholder={currentField.placeholder}
                value={formData[currentField.id as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [currentField.id]: e.target.value })
                }
                className="w-full text-3xl md:text-5xl text-center font-bold bg-transparent border-b-4 border-black focus:outline-none pb-4 placeholder-gray-200"
              />
            )}

            {/* Next / Submit Button */}
            <button
              type="submit"
              className="mt-12 px-8 py-4 bg-black text-white text-xl font-medium tracking-wide hover:bg-gray-800 transition-colors rounded-full"
            >
              {step === FORM_STEPS.length - 1 ? "Submit Request" : "Next (Press Enter)"}
            </button>
          </form>
        ) : (
          /* Success State */
          <div ref={formAreaRef} className="flex flex-col items-center">
            <span className="text-6xl mb-6">✨</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Thanks, {formData.name.split(" ")[0]}!
            </h2>
            <p className="text-xl text-gray-500">
              We've received your message and will reach out soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
