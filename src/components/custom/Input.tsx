import React, { InputHTMLAttributes, useState } from "react";
import { Icon } from '@iconify/react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  icon?: boolean;
}

const Input: React.FC<InputProps> = ({
  error,
  label,
  className,
  type = "text",
  icon,
  disabled,
  placeholder,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm text-[#090A04] block mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && !isPassword && (
          <div className="absolute inset-y-0 left-0 flex items-center px-2">
            <Icon
              icon="lucide:search"
              width="20"
              height="20"
              color="#C4C4C4"
            />
          </div>
        )}

        <input
          className={className}
          type={inputType}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            disabled={disabled}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-[#464646] cursor-pointer"
            tabIndex={-1}
          >
            <Icon
              icon={showPassword ? "ion:eye-off" : "ion:eye"}
              color="#C4C4C4"
              height="20"
              width="20"
            />
          </button>
        )}
      </div>

      {error && (
        <div className="mt-1">
          <span className="text-red-500 text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;