import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

export default function VisitorLayout() {
  const {  i18n } = useTranslation();
  return (
    <div dir={i18n.language == "ar" ? "rtl" : "ltr"}>
        <Outlet/>
    </div>
  )
}
