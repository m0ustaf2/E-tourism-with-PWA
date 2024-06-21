import { Outlet } from "react-router-dom";
import Navbar from "../../SharedModules/Components/Navbar/Navbar";
import SideBar from "../../SharedModules/Components/SideBar/SideBar";
import { useTranslation } from "react-i18next";

export default function MasterLayout() {
  const {  i18n } = useTranslation();
  return (
    <>
    <div dir={i18n.language == "ar" ? "rtl" : "ltr"}>
        <div className="flex">
          <div className="side-bg side">
          <SideBar />
          </div>
          <div className="w-full">
            <div className="ml-3">
            <Navbar/>
            <Outlet />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
