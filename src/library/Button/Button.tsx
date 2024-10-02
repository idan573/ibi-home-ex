import React from "react";
import "./Button.scss"

interface Props {
  fill: "primary" | "secondary" ;
  onClick?: () => void;
  size: "small" | "extra-small" | "medium" | "big";
  disabled?: boolean;
  children: JSX.Element | string;
}

const Button: React.FC<Props> = ({
  fill,
  onClick,
  size,
  disabled = false,
  children,
}: Props) => {
  return (
    <button className="custom-button" onClick={onClick} data-fill={fill} data-size={size} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;