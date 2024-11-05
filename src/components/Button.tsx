import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonType = ComponentPropsWithoutRef<"button">;

const Button = ({ className, children, ...rest }: ButtonType) => {
  return (
    <button className={twMerge("w-full h-11", className)} {...rest}>
      {children}
    </button>
  );
};
export default Button;
