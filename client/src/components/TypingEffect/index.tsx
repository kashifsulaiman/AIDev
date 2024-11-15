import React, { useState, useEffect, ReactNode } from 'react';

interface TypingEffectProps {
  children: ReactNode;
  speed?: number;
  onComplete?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  children,
  speed = 100,
  onComplete,
}) => {
  const text = String(children);
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, speed, onComplete]);

  return (
    <div>
      <span>{displayedText}</span>
    </div>
  );
};

export default TypingEffect;
