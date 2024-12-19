import { useEffect, useState } from "react";

import "@/app/styles/typewriter.css";

const typingSpeed = 50; // Speed of typing effect in milliseconds
const pauseDuration = 2000; // Pause duration before switching texts
const fadeInDuration = 1000; // Fade-in duration in milliseconds

export type TypewriterProps = {
  texts: { title: string; subtitle: string }[];
};

export const Typewriter = ({ texts }: TypewriterProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subtitleText, setSubtitleText] = useState("");
  const [isTyping, setIsTyping] = useState(true); // To manage typing state

  useEffect(() => {
    const { subtitle } = texts[currentIndex];

    let typingInterval: NodeJS.Timeout;
    let typingTimeout: NodeJS.Timeout;
    let fadeInTimeout: NodeJS.Timeout;

    const typeText = (
      text: string,
      setter: (text: string) => void,
      callback: Function
    ) => {
      let index = 0;
      setIsTyping(true);
      typingInterval = setInterval(() => {
        setter(text.slice(0, index + 1));
        index += 1;
        if (index > text.length) {
          clearInterval(typingInterval);
          setTimeout(() => setIsTyping(false), 700);
          if (callback) callback();
        }
      }, typingSpeed);
    };

    const handleFadeIn = () => {
      // Trigger fade-in effect
      fadeInTimeout = setTimeout(() => {
        typeText(subtitle, setSubtitleText, () => {
          typingTimeout = setTimeout(() => {
            setSubtitleText("");
            // Move to the next index
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }, pauseDuration);
        });
      }, fadeInDuration);
    };

    handleFadeIn();

    return () => {
      clearInterval(typingInterval);
      clearTimeout(typingTimeout);
      clearTimeout(fadeInTimeout);
    };
  }, [currentIndex, texts]);

  return (
    <div
      key={currentIndex}
      className="fade-in-up mx-6 md:ml-0 text-center lg:text-left min-h-60 md:min-h-40 lg:min-h-32"
    >
      {/* Static Title */}
      <h1 className="font-semibold text-4xl mb-2">
        {texts[currentIndex].title}
      </h1>
      <div className="typewriter-container min-w-full">
        <h2 className="typewriter-text text-2xl">
          {subtitleText}
          {isTyping ? <span className="cursor"></span> : null}{" "}
          {/* Circular Cursor */}
        </h2>
      </div>
    </div>
  );
};
