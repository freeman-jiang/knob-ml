import React, { useEffect, useRef, useState } from "react";

interface KnobProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  size?: number;
  hint?: "increase" | "decrease" | "correct";
  label?: string;
  disabled?: boolean;
  activeInput?: boolean;
}

const Knob: React.FC<KnobProps> = ({
  value,
  min,
  max,
  onChange,
  size = 60,
  hint = "correct",
  label,
  disabled = false,
  activeInput = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number | null>(null);
  const startValueRef = useRef<number>(value);

  // Calculate rotation angle based on value
  const getRotationAngle = () => {
    const range = max - min;
    const percentage = (value - min) / range;
    // 135 degrees in each direction (270 total range)
    return -135 + percentage * 270;
  };

  // Handle mouse/touch down
  const handleDragStart = (clientY: number) => {
    if (disabled) return;

    setIsDragging(true);
    startYRef.current = clientY;
    startValueRef.current = value;
  };

  // Handle mouse/touch move
  const handleDrag = (clientY: number) => {
    if (!isDragging || startYRef.current === null) return;

    const sensitivity = 0.05; // Reduced sensitivity for finer control
    const deltaY = startYRef.current - clientY;
    const deltaValue = deltaY * sensitivity;

    // Calculate new value based on drag distance
    const range = max - min;
    const newValue = Math.max(
      min,
      Math.min(max, startValueRef.current + (deltaValue * range) / 100)
    );

    onChange(newValue);
  };

  // Handle mouse/touch up
  const handleDragEnd = () => {
    setIsDragging(false);
    startYRef.current = null;
  };

  // Add global event listeners for mouse/touch events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDrag(e.clientY);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleDrag(e.touches[0].clientY);
    };
    const handleTouchEnd = () => handleDragEnd();

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  // Get hint color
  const getHintColor = () => {
    if (hint === "increase") return "ring-green-500";
    if (hint === "decrease") return "ring-red-500";
    return "";
  };

  return (
    <div className="flex flex-col items-center select-none">
      <div
        ref={knobRef}
        className={`relative rounded-full bg-gray-800 border-2 ${
          activeInput ? "border-green-500" : "border-gray-700"
        } shadow-lg cursor-grab
          ${isDragging ? "cursor-grabbing" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${hint !== "correct" ? `ring-2 ${getHintColor()}` : ""}
          ${activeInput ? "glow-green-500" : ""}
        `}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        onMouseDown={(e) => handleDragStart(e.clientY)}
        onTouchStart={(e) =>
          e.touches[0] && handleDragStart(e.touches[0].clientY)
        }
      >
        {/* Knob indicator line */}
        <div
          className="absolute w-0.5 bg-white rounded-full transform -translate-x-1/2"
          style={{
            height: `${size * 0.4}px`,
            left: "50%",
            bottom: "50%",
            transformOrigin: "bottom center",
            transform: `translateX(-50%) rotate(${getRotationAngle()}deg)`,
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* Value indicator */}
      <div className="mt-1 font-mono text-xs text-center w-full">
        {label && <div className="text-gray-400">{label}</div>}
        <div className="text-white">{value.toFixed(1)}</div>
      </div>
    </div>
  );
};

export default Knob;
