import { ComponentPropsWithoutRef } from "react";

type ButtonType = ComponentPropsWithoutRef<"button">;

const Button = ({ children, ...rest }: ButtonType) => {
  return <button {...rest}>{children}</button>;
};
export default Button;
