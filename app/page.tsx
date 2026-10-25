"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { config } from "./config";

type Screen =
  | { kind: "message"; index: number }
  | { kind: "question" }
  | { kind: "success" }
  | { kind: "maybe" };

const firstScreen: Screen = config.screens.length
  ? { kind: "message", index: 0 }
  : { kind: "question" };

export default function Home() {
  const [screen, setScreen] = useState<Screen>(firstScreen);
  const [isTransitioning, setIsTransitioning] = useState(true);
  // A ref also blocks repeated clicks before React has rendered the disabled button.
  const transitionLock = useRef(true);
  const shouldFocusHeading = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();

  const message = screen.kind === "message" ? config.screens[screen.index] : undefined;
  const isOutcome = screen.kind === "success" || screen.kind === "maybe";
  const progress = screen.kind === "message" ? screen.index : config.screens.length;
  const screenKey = screen.kind === "message" ? `message-${screen.index}` : screen.kind;
  const title = message?.text ?? (
    screen.kind === "success" ? config.successMessage :
    screen.kind === "maybe" ? config.maybeMessage : config.finalQuestion
  );

  const fadeUp: Variants = {
    initial: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 15 },
    animate: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" } },
    exit: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -15, transition: { duration: reduceMotion ? 0 : 0.25, ease: "easeIn" } },
  };

  function navigate(next: Screen) {
    if (transitionLock.current) return;
    transitionLock.current = true;
    shouldFocusHeading.current = true;
    setIsTransitioning(true);
    setScreen(next);
  }

  function nextMessage() {
    if (screen.kind !== "message") return;
    const nextIndex = screen.index + 1;
    navigate(nextIndex < config.screens.length
      ? { kind: "message", index: nextIndex }
      : { kind: "question" });
  }

  function goBack() {
    if (isOutcome) navigate({ kind: "question" });
    else if (screen.kind === "question" && config.screens.length) {
      navigate({ kind: "message", index: config.screens.length - 1 });
    } else if (screen.kind === "message" && screen.index > 0) {
      navigate({ kind: "message", index: screen.index - 1 });
    }
  }

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[url('/patrick-shaun-eAaPL2j8ygw-unsplash.jpg')] bg-cover bg-center bg-no-repeat p-4 sm:p-12">
      <div aria-hidden="true" className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
      <section aria-label="A letter for you" className={`relative z-10 flex min-h-[400px] w-full max-w-lg flex-col items-center justify-center rounded-3xl border border-white/50 bg-white/85 p-6 shadow-2xl backdrop-blur-md sm:p-12 ${config.colors.text}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={screenKey}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationComplete={(definition) => {
              if (definition !== "animate") return;
              transitionLock.current = false;
              setIsTransitioning(false);
              if (shouldFocusHeading.current) {
                headingRef.current?.focus({ preventScroll: true });
                shouldFocusHeading.current = false;
              }
            }}
            className="flex w-full flex-col items-center text-center"
          >
            <h1 ref={headingRef} tabIndex={-1} className="mb-6 font-serif text-3xl leading-tight font-medium outline-none sm:text-4xl">
              {title}
            </h1>
            {message && (
              <>
                {message.subtext && <p className="mb-8 max-w-sm text-sm leading-relaxed text-stone-600 sm:text-base">{message.subtext}</p>}
                <button type="button" disabled={isTransitioning} onClick={nextMessage} className={`letter-button ${config.colors.primaryButton}`}>
                  <span className="relative z-10">{message.buttonText}</span>
                </button>
              </>
            )}
            {screen.kind === "question" && (
              <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                <button type="button" disabled={isTransitioning} onClick={() => navigate({ kind: "success" })} className={`letter-button ${config.colors.primaryButton}`}>
                  <span className="relative z-10">{config.yesButton}</span>
                </button>
                <button type="button" disabled={isTransitioning} onClick={() => navigate({ kind: "maybe" })} className={`letter-button ${config.colors.secondaryButton}`}>
                  <span className="relative z-10">{config.maybeButton}</span>
                </button>
              </div>
            )}
            {screen.kind === "success" && config.successLink && (
              <>
                <a href={config.successLink} target="_blank" rel="noopener noreferrer" className={`letter-button ${config.colors.primaryButton}`}>
                  <span className="relative z-10">{config.successButton}<span className="sr-only"> (opens WhatsApp in a new tab)</span></span>
                </a>
                <p className="mt-4 text-sm text-stone-600">Send your reply on WhatsApp when you’re ready.</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <p role="status" aria-atomic="true" className="sr-only">
          {isTransitioning ? "" : isOutcome ? "End of letter" : `Step ${progress + 1} of ${config.screens.length + 1}`}
        </p>
        <div className="mt-8 flex w-full items-center justify-center gap-6">
          {(screen.kind !== "message" || screen.index > 0) && !(screen.kind === "question" && !config.screens.length) && (
            <button type="button" disabled={isTransitioning} onClick={goBack} className="letter-nav">Back</button>
          )}
          {isOutcome && <button type="button" disabled={isTransitioning} onClick={() => navigate(firstScreen)} className="letter-nav">Read again</button>}
        </div>
        {!isOutcome && (
          <div aria-hidden="true" className="mt-6 flex gap-2">
            {Array.from({ length: config.screens.length + 1 }, (_, index) => (
              <div key={index} className={`h-2 w-2 rounded-full ${index === progress ? "scale-125 bg-stone-600" : "bg-stone-300"}`} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
