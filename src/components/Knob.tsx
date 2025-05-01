import { Redo, Undo } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

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

  return (
    <div className="flex flex-col items-center select-none">
      {/* Label above the knob */}
      {label && (
        <div className="mb-1 text-xs text-gray-400 font-mono">{label}</div>
      )}

      <div
        ref={knobRef}
        className={cn(
          "relative rounded-full bg-gray-800 border-2 shadow-lg cursor-grab",
          "flex items-center justify-center", // Added for centering content if needed
          activeInput ? "border-green-500" : "border-gray-700",
          isDragging && "cursor-grabbing",
          disabled && "opacity-50 cursor-not-allowed",
          // hint !== "correct" && `${getHintColor()}`,
          activeInput && "glow-green-500"
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        onMouseDown={(e) => handleDragStart(e.clientY)}
        onTouchStart={(e) =>
          e.touches[0] && handleDragStart(e.touches[0].clientY)
        }
      >
        {/* Direction hint icon */}
        {hint !== "correct" && (
          <div
            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full p-1"
            style={{ zIndex: 20 }}
          >
            {hint === "increase" ? (
              <Redo size={16} className="text-green-500" />
            ) : (
              <Undo size={16} className="text-red-500" />
            )}
          </div>
        )}

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
            zIndex: 10, // Ensure indicator is above value
          }}
        />

        {/* Value indicator - Now absolutely positioned inside */}
        <div
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 font-mono text-[0.60rem] text-white/60"
          style={{ zIndex: 5 }} // Ensure value is below indicator
        >
          {value.toFixed(1)}
        </div>
      </div>
    </div>
  );
};

export default Knob;
