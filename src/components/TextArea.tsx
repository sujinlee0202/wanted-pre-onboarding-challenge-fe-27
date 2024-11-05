import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type TextAreaType = ComponentPropsWithoutRef<"textarea">;

const TextArea = ({ className, ...rest }: TextAreaType) => {
  return (
    <textarea
      className={twMerge(
        "w-full border border-gray-200 py-1 px-2 resize-none",
        className
      )}
      {...rest}
    />
  );
};
export default TextArea;
