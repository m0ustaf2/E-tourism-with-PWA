
import { useState } from "react";
import { useTranslation } from "react-i18next";
interface images {
  firstImagee: string;
  secImagee: string;
  thirdImagee: string;
}

export default function Highlights({
  firstImagee,
  secImagee,
  thirdImagee,
}: images) {
  const { t } = useTranslation();

  const [firstImage, setFirstImage] = useState<string>(firstImagee);
  const [secImage, setSecImage] = useState<string>(secImagee);
  const [thirdImage, setThirdImage] = useState<string>(thirdImagee);
  function swap(e: React.MouseEvent<HTMLImageElement>) {
    setThirdImage(String(e.currentTarget.src));
    setFirstImage(thirdImage);
  }
  function swap2(e: React.MouseEvent<HTMLImageElement>) {
    setThirdImage(String(e.currentTarget.src));
    setSecImage(thirdImage);
  }
  return (
      <div className="mx-auto max-w-7xl pl-1 sm:px-6 lg:px-8 mt-3 pb-5">
        <div className="Highlights text-center border-[12px] rounded-xl">
          <h2 className="text-main text-3xl md:text-6xl font-bold py-6 ">{t("Highlights")}</h2>
          <div className="my-3">
            <div className="cardfan ">
              <img
                src={firstImage}
                alt="Attraction-photo"
                id="roma"
                onClick={swap}
              />
              <img
                src={secImage}
                alt="Attraction-photo"
                id="aqueduct"
                onClick={swap2}
              />
              <img
                src={thirdImage}
                alt="Attraction-photo"
                id="bike"
              />
            </div>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
              <filter id="blur">
                <feGaussianBlur stdDeviation={3} />
              </filter>
            </svg>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
              <filter id="greyscale">
                <feColorMatrix
                  type="matrix"
                  values="0.3333 0.3333 0.3333 0 0
0.3333 0.3333 0.3333 0 0
0.3333 0.3333 0.3333 0 0
0 0 0 1 0"
                />
              </filter>
            </svg>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
              <filter id="sepia">
                <feColorMatrix
                  values="0.14 0.45 0.05 0 0
0.12 0.39 0.04 0 0
0.08 0.28 0.03 0 0
0 0 0 1 0"
                />
              </filter>
            </svg>
          </div>
        </div>
      </div>
   
  );
}
