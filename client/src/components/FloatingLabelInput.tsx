import { useState, useRef, useEffect } from "react";

interface FloatingLabelInputProps {
  type?: string;
  name: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  rows?: number;
  className?: string;
  error?: string;
}

function FloatingLabelInput({
  type = "text",
  name,
  label,
  value,
  onChange,
  required = false,
  rows,
  className = "",
  error,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setHasValue(value.length > 0);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isFloating = isFocused || hasValue;

  const baseClasses = `
    relative w-full bg-transparent border rounded-lg
    focus:outline-none focus:ring-2 focus:border-transparent
    transition-all duration-200
    ${
      error
        ? "border-red-500 focus:ring-red-500"
        : isFloating
        ? "border-green-500 focus:ring-green-500"
        : "border-gray-300 focus:border-green-500 focus:ring-green-500"
    }
    ${className}
  `;

  const inputClasses = `
    ${baseClasses}
    px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base
    ${isFloating ? "pt-6 pb-2" : ""}
  `;

  const textareaClasses = `
    ${baseClasses}
    px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base resize-y
    ${isFloating ? "pt-6 pb-2" : ""}
  `;

  const labelClasses = `
    absolute left-3 sm:left-4 transition-all duration-300 ease-in-out pointer-events-none
    transform origin-left z-10
    ${
      isFloating
        ? `-top-2 text-sm font-medium scale-90 bg-gray-200 px-1 -translate-y-0.5 ${
            error ? "text-red-600" : "text-green-600"
          }`
        : `top-2.5 sm:top-3 text-sm sm:text-base scale-100 ${
            error ? "text-red-500" : "text-gray-500"
          }`
    }
  `;

  return (
    <div className="relative">
      {type === "textarea" ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          rows={rows || 4}
          className={textareaClasses}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={inputClasses}
        />
      )}
      <label
        htmlFor={name}
        className={labelClasses}
        onClick={() => inputRef.current?.focus()}
      >
        {label}
      </label>
    </div>
  );
}

export default FloatingLabelInput;
