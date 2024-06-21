import { useTranslation } from "react-i18next";
import Header from "../SharedModules/Components/Header/Header";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminHome() {
  const { t, i18n } = useTranslation();
  const { data } = useSelector((state: any) => state.authReducer);
  return (
    <>

      <Header />
      {data.role == "Admin" ? (
        <div
          dir={i18n.language == "ar" ? "rtl" : "ltr"}
          className="home-container mx-2 p-4 rounded-lg grid grid-cols-1 gap-4 lg:grid-cols-4 
          lg:gap-8 align-items-center "
        >
          <div className="lg:col-span-3 ">
            <h4 className="text-2xl font-medium text-main">
              {t("Fill your destinations")} !
            </h4>
            <p>
              {t(
                "you can now fill your monuments easily using the table and form"
              )}
              ,
              <br />
              {t("click here and sill it with the table")}!
            </p>
          </div>

          <div className="text-end">
            <Link
              to="/dashboard/AdminMonuments"
              type="button"
              className="text-white bg-main hover:bg-blue-950 focus:ring-4   font-medium rounded-lg 
              text-sm px-5 py-2.5 text-center inline-flex items-center duration-500"
            >
              {t("Fill Destinations")}
              <span className="mx-2">
                <FaLongArrowAltRight />
              </span>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
    
  );
}
