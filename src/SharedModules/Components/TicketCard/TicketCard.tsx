import { useState } from "react";
import { useSelector } from "react-redux";

interface Ticket {
  cancelTicket?: (Id: any) => void;
  ticket: {
    userId: {
      image: {
        secure_url: string;
      };
      lastName: string;
      firstName: string;
      country: string;
    };
    touristDestination: {
      name: string;
      quantity: number;
    };
    DateOfVisit: string;
    status: string;
  };
}

export default function TicketCard({ ticket, cancelTicket }: Ticket) {
  const { data } = useSelector((state: any) => state.authReducer);
  const [isCancel, setIsCancel] = useState(false);

  return (
    <div
      className={`rounded-xl border border-gray-700 p-4 ${
        ticket?.status == "placed"
          ? "bg-green-400"
          : ticket?.status == "waitPayment"
          ? "bg-yellow-200"
          : "bg-red-400"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          alt=""
          src={`${ticket?.userId?.image?.secure_url}`}
          className="size-16 rounded-full object-cover"
        />

        <div className="w-full">
          <div>
            <h2 className="text-lg font-bold text-main">{`${ticket?.userId?.firstName} ${ticket?.userId?.lastName}`}</h2>
            <div className="flow-root">
              <p className="text-main text-sm">
                <strong>Country: </strong>
                {`${ticket?.userId?.country}`}
              </p>
            </div>
          </div>
          {!isCancel ? (
            data?.role == "User" && ticket.status == "waitPayment" ? (
              <div className="my-2">
                <button
                  onClick={() => {
                    setIsCancel(true);
                  }}
                  className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                >
                  <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                  Cancel
                </button>
              </div>
            ) : (
              ""
            )
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-main" >Are You Sure?</span>
              <button
                onClick={cancelTicket}
                className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
                Yes
              </button>

              <button
                onClick={() => {
                  setIsCancel(false);
                }}
                className="inline-flex items-center ml-1 px-8 py-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
              >
               
                No
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="my-3">
        <div className="block h-full rounded-lg border border-gray-700 p-4 duration-300 hover:border-pink-600">
          <p className="font-bold text-main ">{`${ticket?.touristDestination?.name}`}</p>
          <div className="text-main text-sm my-1">
            <p>
              <strong>Ticket Status: </strong>
              {`${ticket?.status}`}
            </p>
            <p>
              <strong>No of Tickets: </strong>
              {`${ticket?.touristDestination?.quantity}`}
            </p>
            <p>
              <strong>Day of Visit: </strong>
              {ticket?.DateOfVisit?.split("T")[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
