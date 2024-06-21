import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Typed from "typed.js";
export default function AuthLayout() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Discover the ancient wonders of Egypt...',"Unlock the secrets of the Pharaohs..."],
      typeSpeed:100,
      backSpeed:100,
      loop:true,
      loopCount:Infinity,
      cursorChar:'☥',
    });
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div  className="grid h-[100vh] lg:grid-cols-2 bg-auth grid-cols-1">
      <div  className="user-data auth-layout">
        <Outlet />
      </div>

      <div className="auth-image rounded-l-3xl  md:flex w-full hidden items-end justify-center">
        <h2 className="mb-8 mx-2 text-2xl text-white font-semibold">
          <label ref={el}></label>
        </h2>
      </div>

    </div>
  );
}
