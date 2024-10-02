import React from 'react';
import './Input.scss';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: "small" | "medium" | "large";
  borderColor?: string;
  disabled?: boolean;
  children?: string | JSX.Element;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  size = 'medium',
  borderColor = '#007bff',
  disabled = false
}) => {
  return (
    <input
      className="custom-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      data-size={size}
      disabled={disabled}
      style={{ borderColor: borderColor }}
    />
  );
};

export default Input;