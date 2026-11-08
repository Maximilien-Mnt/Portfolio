"use client";

import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

export interface ToggleOption {
  value: string;
  label: string;
}

export interface ToggleProps {
  options: ToggleOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  ariaLabel?: string;
}

export function Toggle({
  options,
  value,
  defaultValue,
  onChange,
  className,
  ariaLabel,
}: ToggleProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? options[0]?.value ?? "",
  );
  const [focusIndex, setFocusIndex] = useState(0);
  const currentValue = value ?? internalValue;

  const handleChange = useCallback(
    (val: string) => {
      if (value === undefined) {
        setInternalValue(val);
      }
      onChange?.(val);
    },
    [value, onChange, setInternalValue],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          setFocusIndex((i) => (i + 1) % options.length);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          setFocusIndex((i) => (i - 1 + options.length) % options.length);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          handleChange(options[index]!.value);
          break;
        case "Home":
          e.preventDefault();
          setFocusIndex(0);
          break;
        case "End":
          e.preventDefault();
          setFocusIndex(options.length - 1);
          break;
      }
    },
    [options, handleChange],
  );

  if (!options.length) return null;

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn("inline-flex rounded-md border border-line bg-bg-2", className)}
    >
      {options.map((option, index) => {
        const isSelected = currentValue === option.value;
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isSelected}
            tabIndex={focusIndex === index ? 0 : -1}
            onClick={() => {
              setFocusIndex(index);
              handleChange(option.value);
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "flex-1 min-h-[44px] text-center text-fg-2 font-mono text-[0.72rem] uppercase tracking-wider transition-colors duration-120 ease-snap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-3",
              isSelected ? "bg-fg text-bg" : "bg-transparent hover:bg-bg",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}