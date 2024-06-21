import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../../../SharedModules/Components/Card/Card";
import Loading from "../../../SharedModules/Components/Loading/Loading";
import Navbar from "../../../SharedModules/Components/Navbar/Navbar";
import { baseUrl } from "../../../Utls/BaseUrl";

export default function AllMuseums() {
  const [destinations, setDestinations] = useState([]);
  const { cities } = useSelector((state: any) => state.CitiesReducer);
  let { cityId } = useParams();
  const getByCityId = (para?: String) => {
    axios
      .get(`${baseUrl}city/${para || cityId}/destination`)
      .then((res) => {
        setDestinations(res?.data?.touristDestinations);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAll = () => {
    axios
      .get(`${baseUrl}destinations`)
      .then((res) => {
        setDestinations(res?.data?.touristDestinations);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCityValue = (select: any) => {
    getByCityId(select.target.value);
  };

  useEffect(() => {
    if (cityId) {
      return getByCityId();
    }
    return getAll();
  }, []);

  return (
    <div className="Museums m-0 p-0">
      <Navbar />
      <div className="bg-white bg-opacity-40 h-full w-full">
        <div className="my-2">
          <div className="flex justify-center">
            <div className="w-full flex justify-center">
              <label
                className=" p-2 rounded-l-lg border-y-2 border-l-2 border-main  font-medium"
                htmlFor="citty"
              >
                Select The City:
              </label>
              <select
                className="w-[50%] bg-transparent rounded-r-lg border-main  border-y-2 border-r-2"
                onChange={getCityValue}
                name="cities"
                id="citty"
              >
                {cities.map((city: any) => (
                  <option key={city?._id} value={city?.id}>
                    {city?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {destinations.length > 0 ? (
          <div className=" mx-5 px-2 md:p-5 grid lg:grid-cols-3 md:grid-cols-2">
            {destinations.map((monument: any) => (
              <div className="md:p-6 p-2" key={monument?.id}>
                <Card monument={monument} />
              </div>
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
