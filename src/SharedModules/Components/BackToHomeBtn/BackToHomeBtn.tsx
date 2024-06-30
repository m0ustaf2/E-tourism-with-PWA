import { Link } from "react-router-dom";
import style from "./BackToHomeBtn.module.css";
import { useTranslation } from "react-i18next";
export default function BackToHomeBtn() {
  const { t, i18n } = useTranslation();

  return (
    <div>
        <Link to={'/'}>
      <button className={style.gg}>{t("Back to Home")}</button>
        </Link>
    </div>
  );
}
