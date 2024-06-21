import { useTranslation } from "react-i18next";
import Navbar from "../../../SharedModules/Components/Navbar/Navbar";
export default function Welcome() {
  const { t } = useTranslation();

  document.addEventListener("scroll",()=>{
    const welcome =document.getElementById("welcome");

    if (window.scrollY>10) {
      welcome?.classList.add("top-14");
      welcome?.classList.remove("top-0");
      }else{
        welcome?.classList.remove("top-14");
        welcome?.classList.add("top-0");
    }

  })
               
  return (
    <>
    <div id="welcome" className="absolute top-0 w-full z-10">
    <Navbar/>
      <div className=" h-[81vh] md:mx-10 mx-2 max-w-7xl pl-1 sm:px-6 lg:px-8 my-14 flex flex-col justify-between">
        <div>
          <h2 className="text-8xl font-bold text-yellow-400">
            {t("Explore")}
             <br/>
             {t("Egypt")}
          </h2>
          <p className="text-4xl font-semibold text-main my-8 mx-3">{t("Unlock the secrets of the Pharaohs")}</p>
        </div>
      </div>

    </div>
    </>
  );
}
