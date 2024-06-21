import { useTranslation } from "react-i18next";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import amoon from "../../../assets/Amoon.png";
export default function Museums() {
  const { t } = useTranslation();
  const { monuments } = useSelector((state: any) => state.MonumentsReducer);
  const { cities } = useSelector((state: any) => state.CitiesReducer);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    cssEase: "linear",
    arrows: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const monumentImage = {
    backgroundImage: `url(${monuments[0]?.image.secure_url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

 

  return (
    <div className="Museums">
      <div className="h-full w-full bg-white bg-opacity-40 py-16">
        <div className="mx-auto max-w-7xl pl-1 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2">
            <div className="border-y-[4vh] w-10/12 border-t-main rounded-[28%] mx-6 border-b-gray-400 px-8 my-3">
              <div className="w-1/2 md:w-3/4  lg:w-1/2 flex items-center amoon-image">
                <img src={amoon} alt="avatar" />
                <div>
                  <div className="flex flex-col justify-between h-[25vh]">
                    <p></p>
                    <h2 className="text-main text-5xl font-semibold">
                      {t("Museums")}
                    </h2>
                    <Link
                      to="/museums"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                      className="text-lg text-main flex items-center bg-main hover:text-white group hover:border-2 hover:border-white border-2 border-main rounded-3xl duration-500"
                    >
                      <span className="mx-2 text-gray-300 group-hover:text-white group-hover:duration-500">
                        {t("Explore All Museums")}
                      </span>
                      <IoMdArrowDroprightCircle className="text-gray-300 group-hover:text-white group-hover:duration-500" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={monumentImage}
              className=" rounded-lg group md:h-[100%] h-[35vh]  duration-500 m-3 "
            >
              <div className="museum-details flex items-center justify-center w-full h-full text-white px-3 overflow-hidden">
                <div className="text-center">
                  <h2 className="text-xl block group-hover:translate-x-[110%] py-3 group-hover:duration-500 rounded-xl bg-black bg-opacity-40 translate-y-2/3">
                    {monuments[0]?.name}
                  </h2>
                  <p className="py-3 translate-y-96 group-hover:translate-y-[-30px] rounded-xl bg-black bg-opacity-60 text-center group-hover:duration-500">
                    {monuments[0]?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="slider-container bg-transparent mt-8">
            <Slider autoplaySpeed={2500} {...settings}>
              {cities.map((city: any, idx: number) => (
                <div key={idx} className="h-[30vh]">
                  <div
                    style={{
                      backgroundImage: `url(${city?.image?.secure_url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "100%",
                      margin: "0 6px",
                    }}
                    className="rounded-3xl"
                  >
                    <div className="bg-black bg-opacity-30 rounded-3xl text-gray-300 font-extrabold group-hover:bg-black  group-hover:bg-opacity-50 group-hover:duration-700 h-full flex items-center justify-center">
                      <Link
                        to={`museums/${city?.id}`}
                        className="text-5xl group overflow-hidden h-full w-full text-center flex items-center mx-8"
                      >
                        {city?.name}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
