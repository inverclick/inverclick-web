import { useEffect, useState } from "react";
import "@/app/styles/typewriter.css";

type TypewriterProps = {
  texts: { title: string; subtitle: string }[];
};

export const Typewriter = ({ texts }: TypewriterProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subtitleText, setSubtitleText] = useState("");
  const [_isTyping, setIsTyping] = useState(true); // To manage typing state

  useEffect(() => {
    const { subtitle } = texts[currentIndex];
    const typingSpeed = 50; // Speed of typing effect in milliseconds
    const pauseDuration = 2000; // Pause duration before switching texts
    const fadeInDuration = 1000; // Fade-in duration in milliseconds

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
          setIsTyping(false);
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
    <div key={currentIndex} className="fade-in-up mr-6 text-center md:text-left">
      {/* Static Title */}
      <h1 className="font-semibold text-3xl pb-2">{texts[currentIndex].title}</h1>
      <div className="typewriter-container">
        <h2 className="typewriter-text text-xl">
          {subtitleText}
          <span className="cursor"></span> {/* Circular Cursor */}
        </h2>
      </div>
    </div>
  );
};
