import React, { useState, useRef, useEffect, useCallback } from "react";
import type { SpinnerWheelProps } from "./types";

const DEFAULT_COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A",
  "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2",
  "#F8B739", "#52B788", "#E76F51", "#2A9D8F",
];

export const SpinnerWheel: React.FC<SpinnerWheelProps> = ({
  items,
  onSpinComplete,
  onButtonClick,
  spinning: externalSpinning,
  duration = 5000,
  size = 500,
  fontSize = 16,
  borderWidth = 8,
  borderColor = "#333",
  buttonText = "SPIN",
  buttonColor = "#333",
  buttonTextColor = "#fff",
  buttonIcon,
  buttonSize,
  buttonBorderColor = "#333",
  buttonBorderWidth = 4,
  disabled = false,
  winningIndex,
  autoSpinTrigger,
}) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const isSpinning = externalSpinning !== undefined ? externalSpinning : spinning;
  const radius = size / 2;
  const centerX = radius;
  const centerY = radius;
  const wheelRadius = radius - borderWidth;
  const buttonRadius = buttonSize !== undefined ? buttonSize : radius * 0.25;
  const segmentAngle = 360 / items.length;

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const spin = useCallback(() => {
    if (spinning || items.length === 0) return;

    setSpinning(true);

    const targetIdx = winningIndex !== undefined ? winningIndex : Math.floor(Math.random() * items.length);

    // FIXED CALCULATION:
    // The wheel has segments starting at 0° (right/3 o'clock) going counter-clockwise
    // But we draw them starting at -90° (top/12 o'clock) going clockwise
    // The pointer is at the top (-90° in drawing space, which is 12 o'clock)
    //
    // At rotation = 0:
    //   - Segment 0 spans from -90° to -90° + segmentAngle
    //   - Segment 0's center is at: -90° + segmentAngle/2
    //   - Pointer is at: -90°
    //   - Offset between them: segmentAngle/2
    //
    // To align segment i with pointer:
    //   - Segment i's center is at: -90° + i * segmentAngle + segmentAngle/2
    //   - Need to rotate so this equals -90° (pointer position)
    //   - Rotation needed: -90° - (-90° + i * segmentAngle + segmentAngle/2)
    //   - Simplifies to: -(i * segmentAngle + segmentAngle/2)
    //   - = -(i + 0.5) * segmentAngle

    const rotations = 20 + Math.floor(Math.random() * 10); // 20-30 full rotations for much faster spinning
    const targetRotation = -(targetIdx + 0.5) * segmentAngle;

    const startRotation = rotation;
    const currentNormalized = ((startRotation % 360) + 360) % 360;
    const targetNormalized = ((targetRotation % 360) + 360) % 360;
    const deltaRotation = targetNormalized - currentNormalized;
    const totalRotation = 360 * rotations + deltaRotation;
    const endRotation = startRotation + totalRotation;

    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current!;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + totalRotation * eased;

      setRotation(currentRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);

        if (onSpinComplete) {
          onSpinComplete(items[targetIdx]);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [spinning, items, winningIndex, segmentAngle, rotation, duration, onSpinComplete]);

  const autoSpinTriggerRef = useRef<SpinnerWheelProps["autoSpinTrigger"]>();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (autoSpinTrigger === undefined) {
      autoSpinTriggerRef.current = autoSpinTrigger;
      return;
    }

    // Skip initial mount - don't spin when component first renders
    if (isInitialMount.current) {
      isInitialMount.current = false;
      autoSpinTriggerRef.current = autoSpinTrigger;
      return;
    }

    if (autoSpinTriggerRef.current === autoSpinTrigger) {
      return;
    }

    autoSpinTriggerRef.current = autoSpinTrigger;
    spin();
  }, [autoSpinTrigger]);

  const getColor = (index: number): string => {
    return items[index].color || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
  };

  const getTextColor = (index: number): string => {
    return items[index].textColor || "#fff";
  };

  // Dynamic font size for many items
  const dynamicFontSize = items.length > 20
    ? Math.max(8, fontSize - Math.floor((items.length - 20) / 10) * 2)
    : items.length > 12
    ? Math.max(10, fontSize - 2)
    : fontSize;

  const renderSegments = () => {
    return items.map((item, index) => {
      // Draw segments starting from top (-90°) going clockwise
      const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
      const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
      const midAngle = (startAngle + endAngle) / 2;

      const x1 = centerX + wheelRadius * Math.cos(startAngle);
      const y1 = centerY + wheelRadius * Math.sin(startAngle);
      const x2 = centerX + wheelRadius * Math.cos(endAngle);
      const y2 = centerY + wheelRadius * Math.sin(endAngle);

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${wheelRadius} ${wheelRadius} 0 0 1 ${x2} ${y2}`,
        "Z",
      ].join(" ");

      // Text position
      const textRadius = items.length > 30 ? wheelRadius * 0.65
        : items.length > 20 ? wheelRadius * 0.68
        : wheelRadius * 0.7;

      const textX = centerX + textRadius * Math.cos(midAngle);
      const textY = centerY + textRadius * Math.sin(midAngle);
      const textAngle = (midAngle * 180) / Math.PI + 90;

      // Truncate long labels
      let displayLabel = item.label;
      if (items.length > 30 && displayLabel.length > 8) {
        displayLabel = displayLabel.substring(0, 7) + "...";
      } else if (items.length > 20 && displayLabel.length > 12) {
        displayLabel = displayLabel.substring(0, 11) + "...";
      } else if (items.length > 12 && displayLabel.length > 15) {
        displayLabel = displayLabel.substring(0, 14) + "...";
      }

      return (
        <g key={item.id}>
          <path d={pathData} fill={getColor(index)} stroke={borderColor} strokeWidth={1} />
          <text
            x={textX}
            y={textY}
            fill={getTextColor(index)}
            fontSize={dynamicFontSize}
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${textAngle} ${textX} ${textY})`}
            style={{ userSelect: "none", pointerEvents: "none" }}
          >
            {displayLabel}
          </text>
        </g>
      );
    });
  };

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      {/* Rotating wheel */}
      <svg
        width={size}
        height={size}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? "none" : "transform 0.3s ease-out",
        }}
      >
        <circle
          cx={centerX}
          cy={centerY}
          r={radius - borderWidth / 2}
          fill="none"
          stroke={borderColor}
          strokeWidth={borderWidth}
        />
        {renderSegments()}
        {/* Center button background with border */}
        {buttonBorderWidth > 0 && (
          <circle
            cx={centerX}
            cy={centerY}
            r={buttonRadius + buttonBorderWidth / 2}
            fill="none"
            stroke={buttonBorderColor}
            strokeWidth={buttonBorderWidth}
          />
        )}
        <circle cx={centerX} cy={centerY} r={buttonRadius} fill={buttonColor} />
      </svg>

      {/* Fixed pointer at top */}
      <svg
        width={size}
        height={size}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <polygon
          points={`${centerX},${borderWidth + 30} ${centerX - 15},${borderWidth} ${centerX + 15},${borderWidth}`}
          fill="#FF3B3B"
          stroke="#fff"
          strokeWidth={2}
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
        />
      </svg>

      {/* Center button */}
      <button
        onClick={() => {
          if (onButtonClick) {
            onButtonClick();
          } else {
            spin();
          }
        }}
        disabled={disabled || isSpinning}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: buttonRadius * 2,
          height: buttonRadius * 2,
          borderRadius: "50%",
          backgroundColor: buttonColor,
          color: buttonTextColor,
          border: "none",
          fontSize: buttonIcon ? "inherit" : fontSize * 1.2,
          fontWeight: buttonIcon ? "normal" : "bold",
          cursor: disabled || isSpinning ? "not-allowed" : "pointer",
          opacity: disabled || isSpinning ? 0.6 : 1,
          transition: "all 0.2s ease",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => {
          if (!disabled && !isSpinning) {
            e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.05)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
        }}
      >
        {buttonIcon || buttonText}
      </button>
    </div>
  );
};
