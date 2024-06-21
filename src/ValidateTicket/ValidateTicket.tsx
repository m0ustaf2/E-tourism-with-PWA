import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import { baseUrl } from "../Utls/BaseUrl";
import { Stepper } from "react-form-stepper";
import TicketCard from "../SharedModules/Components/TicketCard/TicketCard";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Loading from "../SharedModules/Components/Loading/Loading";

interface TokenData {
  orderId: string;
  faceId: string;
  status: string;
}

export default function ValidateTicket() {
  const { token } = useParams();
  const tokenData: TokenData = jwtDecode(String(token));
  const [ticket, setTicket] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [newTicket, setNewTicket] = useState<any>();
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const steps: object[] = [
    { label: "Step 1" },
    { label: "Step 2" },
    { label: "Step 3" },
  ];

  const { headers } = useSelector((state: any) => state.authReducer);

  const getTicket = () => {
    setIsLoading(true)
    axios
      .get(`${baseUrl}order/filter-by-id/${tokenData.orderId}`, headers)
      .then((res) => {
        setTicket(res.data.orders);
        setIsLoading(false)
        if (isAccepted) {
          setNewTicket(res.data.orders);
        }
      })
      .catch(() => {
        toast.error("network error");
        setIsLoading(false)
      });
  };

  const updateTicket = () => {
    setIsLoading(true);
    axios
      .patch(
        `${baseUrl}order/update-by-inspector/${tokenData.orderId}`,
        { status: "delivered" },
        headers
      )
      .then((res) => {
        getTicket();
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleNextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep((prev) => prev + 1);
      if (isAccepted) {
        updateTicket();
      }
    }
  };
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const webcamRef: any = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capturePhoto = () => {
    const image = webcamRef.current?.getScreenshot();
    if (image) {
      setImageSrc(image);
    } else {
      toast.error("Failed to capture screenshot from webcam");
    }
  };

  const captureAnother = () => {
    setImageSrc(null);
  };

  const videoConstraints = {
    width: 390,
    height: 390,
    facingMode: "user",
  };

  const sendPhoto = async () => {
    setIsLoading(true);
    if (imageSrc) {
      try {
        const formData = new FormData();
        formData.append("image_base64", imageSrc);
        formData.append("person_id", ticket?.faceId);
        const response = await axios.post(
          "https://face-matching.onrender.com/face-matchingBase64",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsLoading(false);
        if (response?.status === 200) {
          if(response?.data?.error=="You are matching two different persons."){
          toast.error(response?.data?.error);
          }else if(Number(response?.data?.score?.split(".")[0]) >= 80){
            console.log(response);
              toast.success(`Accepted User With Score:${response?.data?.score?.split(".")[0]}%`);
              setIsAccepted(true);
            }
            else {
             toast.error(`Not Accepted User With Score:${response?.data?.score?.split(".")[0]}%`);
             setIsAccepted(false);
           }
        } else {
          toast.error("Failed to send photo");
        }
      } catch (error:any) {
        console.log(error);
        toast.error(error?.response?.data?.detail);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getTicket();
  }, []);

  return (
    <>
      <div className="validate-ticket">
        <Stepper
          className=" stepper my-8 "
          steps={steps}
          activeStep={activeStep}
        />
        {activeStep == 0 ? (
          ticket ? (
            <div className="ticket and nextbtn">
              <div className="flex justify-center items-center my-5">
                <div className="w-[80%] lg:w-[40%]">
                  <TicketCard ticket={ticket} />
                </div>
              </div>
              <div className="flex justify-end  px-10 ">
                {ticket.status == "placed" ? (
                  <button
                    onClick={handleNextStep}
                    className=" bg-green-800 px-8 my-2 py-1 rounded-3xl text-gray-50 flex items-center justify-center"
                  >
                    Next
                    <GrFormNext />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )
        ) : activeStep == 1 ? (
          <div className="px-5">
            <p className="text-4xl flex justify-center items-center">
              Face Matching <MdVerified className="text-green-500" />
            </p>
            <div>
              {imageSrc ? (
                <>
                  <div className="flex items-center justify-center">
                    {imageSrc && (
                      <img
                        className="rounded-full"
                        src={imageSrc}
                        alt="Captured"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={sendPhoto}
                      className={
                        "bg-main text-white px-5 py-2 mx-1  my-2 rounded-xl"
                      }
                    >
                      {isLoading == true ? (
                        <ImSpinner9 className="animate-spin" />
                      ) : (
                        <>Send Photo</>
                      )}
                    </button>
                  </div>
                  {!isAccepted && (
                    <div className="flex items-center justify-center">
                      <button
                        id="another"
                        onClick={captureAnother}
                        className={
                          "bg-main text-white px-5 py-2 mx-1  my-2 rounded-xl"
                        }
                      >
                        Capture another one?
                      </button>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="">
                      <button
                        onClick={handlePrevStep}
                        className=" bg-green-800 px-8 my-2 py-1 rounded-3xl text-gray-50 flex items-center justify-center"
                      >
                        <GrFormPrevious />
                        Prev
                      </button>
                    </div>

                    <div className="">
                      {isAccepted ? (
                        <button
                          id="nextBtn"
                          onClick={handleNextStep}
                          className="bg-green-800 px-8 my-2 py-1 rounded-3xl text-gray-50 flex items-center justify-center"
                        >
                          Next
                          <GrFormNext />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center items-center">
                    <Webcam
                      className="rounded-full my-4"
                      audio={false}
                      ref={webcamRef}
                      imageSmoothing={true}
                      videoConstraints={videoConstraints}
                      screenshotFormat="image/jpeg"
                      width={320}
                      height={240}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-slate-500">
                      Click capture photo button then click on the send button
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      className="bg-main text-white px-5 py-2 mx-1  my-2 rounded-xl"
                      onClick={capturePhoto}
                    >
                      Capture Photo
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="">
                      <button
                        onClick={handlePrevStep}
                        className=" bg-green-800 px-8 my-2 py-1 rounded-3xl text-gray-50 flex items-center justify-center"
                      >
                        <GrFormPrevious />
                        Prev
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : isLoading ? (
          <Loading />
        ) : (
          <div className="flex justify-center items-center my-5">
            <div className="w-[80%] lg:w-[40%] ">
              <TicketCard ticket={newTicket} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
