import { Footer } from "flowbite-react";
import { useTranslation } from "react-i18next";

export default function Footerr() {
  const { t, i18n } = useTranslation();

  return (
    <>
    <div className="bg-main py-[2px]">
      <Footer container className="bg-main text-white">
        <div className="w-full text-center">
          <Footer.Copyright className="text-white" by={t("Egypt Here")} year={2024} />
        </div>
      </Footer>
    </div>
    </>
  );
}
