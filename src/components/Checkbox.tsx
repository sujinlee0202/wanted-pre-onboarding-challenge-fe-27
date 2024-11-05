import { useId } from "react";
import { twMerge } from "tailwind-merge";

interface CheckboxType
  extends Omit<React.ComponentPropsWithoutRef<"input">, "id"> {
  type: "checkbox";
}

const Checkbox = ({ children, className, ...rest }: CheckboxType) => {
  const uid = useId();

  return (
    <div className='flex items-center gap-2 relative'>
      <input
        id={uid}
        className={twMerge(
          "appearance-none w-5 h-5 border border-gray-500 rounded-lg checked:bg-gray-500 checked:bg-[url('/icons.svg')] checked:bg-no-repeat checked:bg-center",
          className
        )}
        {...rest}
      />
      <label htmlFor={uid}>{children}</label>
    </div>
  );
};
export default Checkbox;
