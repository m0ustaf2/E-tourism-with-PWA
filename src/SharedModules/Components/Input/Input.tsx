import { ForwardedRef, ReactNode, forwardRef } from "react";

export interface input {
  placeholder: string;
  type?: string;
  children?: ReactNode;
}
const Input = forwardRef(
  (
    { placeholder, type, children, ...delegate }: input,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <div className=" my-1">
          <div className=" mt-2 text-lg border-b-2 flex border-gray-50">
            <label className="pointer-events-none flex items-center pr-2">
              {children}
            </label>
            <input
              ref={ref}
              {...delegate}
              type={type}
              className="block w-full focus:border-none  outline-none py-1 px-2 bg-transparent"
              placeholder={placeholder}
            />
          </div>
        </div>
      </>
    );
  }
);
export default Input;
