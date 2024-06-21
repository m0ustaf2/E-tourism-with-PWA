import axios from "axios";
import { useRef, useState } from "react";
import { Stepper } from "react-form-stepper";
import { useForm } from "react-hook-form";
import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";
import { GrFormPrevious } from "react-icons/gr";
import { ImSpinner9 } from "react-icons/im";
import { MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import BookingHeader from "../../../SharedModules/Components/BookingHeader/BookingHeader";
import ErrorMessage from "../../../SharedModules/Components/ErrorMessage/ErrorMessage";
import { baseUrl } from "../../../Utls/BaseUrl";
export default function Booking() {
  const [isLoading, setIsLoading] = useState(false);
  const { headers } = useSelector((state: any) => state.authReducer);
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps: object[] = [{ label: "Step 1" }, { label: "Step 2" }];
const {data}= useSelector((state:any)=>state.authReducer);

  const handleNextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const webcamRef:any = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [faceId, setFaceId] = useState("");

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
        formData.append("person_name", data?.userName);
        const response = await axios.post(
          "https://face-matching.onrender.com/add-personBase64",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response?.data?.ID) {
          toast.success(response?.data?.message);
          setIsLoading(false);
          setFaceId(response?.data?.ID);
          handleNextStep();
        } else{
          toast.error("No faces found PLZ enter valid face")
        }
      } catch (error:any) {
        toast.error(error?.response?.data?.detail);
        setIsLoading(false);
      }
    }
  };
  const Data = localStorage.getItem("destData");
  const Modified = JSON.parse(String(Data));

  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(Math.max(count - 1, 0));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const dummyData = {
      touristDestination: {
        touristDestinationId: `${Modified?.id}`,
        quantity: count,
      },
      faceId,
      DateOfVisit: `${data?.date}T23:59:59.000Z`,
      paymentType: "card",
    };
    reserveTicket(dummyData);
  };

  const reserveTicket = (dummyData: any) => {
    setIsLoading(true);
    axios
      .post(`${baseUrl}order`, dummyData, headers)
      .then((res) => {
        const { url } = res.data;
        setIsLoading(false);
        window.location.href = url;
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.validationErr[0]?.message || "Network Error"
        );
        setIsLoading(false);
      });
  };

  
  return (
    <div className="booking my-3">
      <Stepper  className=" stepper " steps={steps} activeStep={activeStep} />
      {activeStep == 0 ? (
        <div className="px-5">
          <p className="text-xl md:text-4xl flex justify-center items-center gap-2">
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
                    onClick={captureAnother}
                    className={
                      "bg-main text-white px-5 py-2 mx-1  my-2 rounded-xl"
                    }
                  >
                    Capture another one?
                  </button>
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
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="ticket-details my-2 p-1 mx-auto max-w-6xl  sm:px-6 lg:px-8 rounded-lg shadow-md">
          <BookingHeader/>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
            <div className="rounded-lg ">
              <img
                className="w-full rounded-3xl shadow-lg"
                src={Modified?.image?.secure_url}
                alt="site-image"
              />
            </div>
            <div className="rounded-lg  lg:col-span-2">
              <div className="left-header flex justify-between items-center">
                <h1 className="text-main text-2xl font-bold">
                  {Modified?.name}
                </h1>
                <p className="text-main text-2xl font-bold">
                  {Modified?.ticketPrice}
                </p>
              </div>
              <a
                target="_blank"
                href={Modified?.location}
                className="text-main"
              >
                <div className="flex items-center">
                  <FaLocationDot className="text-red-700 text-xl" /> Location
                </div>
              </a>
              <div className="openning-hours  flex items-center my-2">
                <div className="clock border block p-2 cursor-pointer rounded-full shadow-sm border-dashed">
                  <FaRegClock />
                </div>
                <div className="openning-right ml-5">
                  <p className="text-main">Openning hours</p>
                  <div className="text-slate-400 text-sm">
                    <div>All days</div>
                    <div>9:00 AM- 6:00 PM</div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="ms-auto">
                <div className="counter">
                  <span>No.of tickets</span>
                  <div className="buttons rounded-2xl   flex items-center justify-between p-2  bg-slate-100">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="bg-red-600 block size-8 cursor-pointer rounded-full shadow-sm text-white mr-1"
                    >
                      -
                    </button>
                    <input
                      className="text-center border-none"
                      type="text"
                      value={count}
                      onChange={(e: any) => setCount(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="bg-main block size-8 cursor-pointer rounded-full shadow-sm text-white ml-1"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="mt-2 font-semibold text-main">
                  Total Price: {Number(Modified?.ticketPrice) * count}{" "}
                </p>
                <div className="dateAndTimePicker">
                  <p className="mt-2">Select date of your visit</p>
                  <div className="Data-Time flex items-center my-2">
                    <input
                      {...register("date", { required: "Date is required" })}
                      id="date"
                      type="date"
                      placeholder="Select date"
                      className="bg-gray-200 border  border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                    />
                   
                    {errors?.date && (
                      <ErrorMessage text={String(errors?.date?.message)} />
                    )}
                  
                  </div>
                </div>
                <div className="continue my-3">
                  <button
                    type="submit"
                    className={
                      "text-white bg-main hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center duration-500" +
                      (isLoading ? " disabled" : " ")
                    }
                  >
                    {isLoading == true ? (
                      <ImSpinner9 className="animate-spin" />
                    ) : (
                      <>
                        <GiConfirmed className="mx-1 text-xl" />
                        Pay now
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <button
              onClick={handlePrevStep}
              className=" bg-green-800 px-8 my-2 py-1 rounded-3xl text-gray-50 flex items-center justify-center"
            >
              <GrFormPrevious />
              Prev
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
