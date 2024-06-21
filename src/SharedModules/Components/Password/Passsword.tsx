import { ForwardedRef, forwardRef, useState } from "react";
import { IoKeyOutline } from "react-icons/io5";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Input, { input } from "../Input/Input";

 const Passsword=forwardRef(({ placeholder, ...delegate }: input,ref:ForwardedRef<HTMLInputElement>)=> {
  const [isShown, setIsShown] = useState(false);
  const type = isShown ? "text" : "password";
  return (

    <div className="password-input flex items-center">
      <div className="w-[100%]">
        <Input placeholder={placeholder} ref={ref} type={type} {...delegate}>
          <IoKeyOutline />
        </Input>
      </div>

      <span
        className="w-[1%] ml-[-5%]"
        onClick={() => setIsShown((prev) => !prev)}
      >
        {!isShown ? (
          <LuEye className="text-slate-600" />
        ) : (
          <LuEyeOff className="text-slate-600" />
        )}
      </span>
    </div>
  );
})
export default Passsword;