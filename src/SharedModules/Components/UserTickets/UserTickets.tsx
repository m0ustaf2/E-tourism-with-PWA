import axios from "axios";
import TicketCard from "../TicketCard/TicketCard";
import { baseUrl } from "../../../Utls/BaseUrl";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import NoData from "../NoData/NoData";
import { toast } from "react-toastify";

export default function UserTickets() {
  const { headers } = useSelector((state: any) => state.authReducer);
  const [userTickets, setUserTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserTickets = () => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}order/own/tickets`, headers)
      .then((res) => {
        console.log(res.data.orders);
        setUserTickets(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const cancelTicket = (Id: string) => {
    axios
      .patch(`${baseUrl}order/${Id}`, { reason: "123123" }, headers)
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message);
        getUserTickets();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    getUserTickets();
  }, []);

  return (
    <>
      <div>
        {userTickets?.length > 0 ? (
          !isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-3 grid-cols-1 pr-2">
              {userTickets?.map((ticket: any, idx: number) => (
                <div key={idx}>
                  <TicketCard
                    cancelTicket={() => cancelTicket(ticket._id)}
                    ticket={ticket}
                  />
                </div>
              ))}
            </div>
          ) : (
            <NoData />
          )
        ) : (
          <div className="w-full flex justify-center items-center">
            <div className="w-[40%]">
              <Loading />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
