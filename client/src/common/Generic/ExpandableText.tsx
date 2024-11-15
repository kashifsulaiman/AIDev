import { useState, useRef, useEffect } from 'react';
import Text from '../text/Index';

const ExpandableText = ({
  text,
  maxLines = 3,
  className,
  hideSeeMore = true,
  isText,
}: {
  text: string;
  isText?: boolean;
  hideSeeMore?: boolean;
  maxLines?: number;
  className: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [collapsedHeight, setCollapsedHeight] = useState<any>(null);
  const [expandedHeight, setExpandedHeight] = useState<string | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(textRef.current).lineHeight
      );
      const heightForMaxLines = lineHeight * maxLines;

      setCollapsedHeight(
        isText ? `${heightForMaxLines + 5}px` : `${heightForMaxLines + 10}px`
      );
      setExpandedHeight(
        isText
          ? `${textRef.current.scrollHeight + 5}px`
          : `${textRef.current.scrollHeight + 10}px`
      );

      setIsOverflowing(textRef.current.scrollHeight > heightForMaxLines);
    }
  }, [maxLines, text, isText]);

  return (
    <div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out`}
        style={{
          maxHeight: isExpanded
            ? expandedHeight
            : collapsedHeight ||
              (isText ? `${maxLines * 1.4}rem` : `${maxLines * 1.8}rem`),
        }}
      >
        <Text ref={textRef} className={className}>
          {text}
        </Text>
      </div>

      {isOverflowing && !hideSeeMore && (
        <div className="flex justify-end">
          <button
            className="font-Noto text-sm font-normal text-gray-600"
            onClick={toggleExpand}
          >
            {isExpanded ? 'see less' : 'see more'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpandableText;
