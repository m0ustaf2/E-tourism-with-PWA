import { FaHotel } from "react-icons/fa";
import { GiCommercialAirplane } from "react-icons/gi";

export default function BookingHeader() {
  return (
    <>
      <div className="text-center  sm:flex justify-between items-center sm:flex-col lg:flex-row  rounded-lg border-b-2 my-1 mx-auto  px-1">
        <div className="website-name">
          <h1 className="text-main  font-semibold  text-xl md:text-2xl">
            Search Flights and Hotels
          </h1>
        </div>

        <div className="book-buttons  flex items-center justify-between">
          <button className="bg-main text-center flex items-center justify-center text-white    text-sm md:text-xl p-2  my-1 md:p-2 rounded-3xl  mx-2">
            <a
              className="text-center flex items-center justify-center"
              target="_blank"
              href="https://www.booking.com/index.en-gb.html?label=gen173nr-1BCAEoggI46AdIM1gEaEOIAQGYAQm4ARfIAQzYAQHoAQGIAgGoAgO4ApK-k7MGwAIB0gIkYTFmMDI1YjMtNGE2ZS00OGIyLWEwZWEtOTRmMGNlODExZGQ52AIF4AIB&sid=89bffece0f8954dcc797c99a4f39e332&keep_landing=1&sb_price_type=total&"
            >
              <span className="flex items-center mx-auto w-full">
                Search Hotels
                <FaHotel className="ml-1" />
              </span>
            </a>
          </button>
          <button className="bg-red-500 text-center flex items-center justify-center text-white   text-sm md:text-xl p-2 my-1  md:p-2 rounded-3xl  mx-2">
            <a
              className="text-center flex items-center justify-center"
              target="_blank"
              href="https://eg.flyin.com/en/flights?dxid=CjwKCAjwgpCzBhBhEiwAOSQWQcrAIGbDMmYOPYxGFbDP9ccRczkcoq22hvXQ4S-HyBmoEzHd_FToeBoCUaMQAvD_BwE&gad_source=1&gclid=CjwKCAjwgpCzBhBhEiwAOSQWQcrAIGbDMmYOPYxGFbDP9ccRczkcoq22hvXQ4S-HyBmoEzHd_FToeBoCUaMQAvD_BwE"
            >
              <span className="flex items-center mx-auto w-full">
                Search Flights <GiCommercialAirplane />
              </span>
            </a>
          </button>
        </div>
      </div>
    </>
  );
}
