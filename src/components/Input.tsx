import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputType extends ComponentPropsWithoutRef<"input"> {
  type: "text" | "password" | "email" | "number" | "date";
}

const Input = ({ className, ...rest }: InputType) => {
  return (
    <input
      className={twMerge("border border-gray-200 py-1 px-2", className)}
      {...rest}
    />
  );
};
export default Input;
