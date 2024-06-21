import axios from "axios";
import { Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaPlus, FaQuoteLeft, FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { ImSpinner9 } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";
import { IoClose, IoLogoYoutube } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../../../SharedModules/Components/ErrorMessage/ErrorMessage";
import Loading from "../../../SharedModules/Components/Loading/Loading";
import { baseUrl } from "../../../Utls/BaseUrl";
import Highlights from "../Highlights/Highlights";

export interface destination {
  name: string;
  description: string;
  image: {
    secure_url: string;
  };
  destinationID: string;
  cityId: {
    _id: string;
  };
  _id: string;
  video: string;
  subImages: {
    secure_url: string;
  }[];
}

interface Review {
  comment: string;
  _id: string;
  createdBy: {
    firstName: string;
    lastName: string;
    userName: string;
    _id: string;
    image: {
      secure_url: string;
    };
  };
}

type Reviews = Review[];
interface ReviewFormData {
  comment: string;
}

export default function AboutMuseum() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [modalState, setModalState] = useState("close");
  const handleClose = () => setModalState("close");
  const [isLoading, setIsLoading] = useState(false);
  const { headers, data } = useSelector((state: any) => state.authReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },setValue
  } = useForm<ReviewFormData>();

  const [isSpeaking, setIsSpeaking] = useState(false);
  let { cityId, destinationId } = useParams();
  const [destination, setDestination] = useState<destination>();
  const [reviewss, setReviewss] = useState<Reviews>([]);
  const [reviewId, setReviewId] = useState("")

  const handleSpeak = () => {
    setIsSpeaking(true);
    const text = destination?.description;
    const value = new SpeechSynthesisUtterance(text);
    window?.speechSynthesis?.speak(value);
  };

  const handlePause = () => {
    window?.speechSynthesis?.pause();
    setIsSpeaking(false);
  };

  const getSpecificAttraction = () => {
    axios
      .get(`${baseUrl}city/${cityId}/destination/${destinationId}`)
      .then((res) => {
        setDestination(res?.data?.touristDestination);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showAddModal = () => {
    setModalState("add-modal");
  };
  // add review
  const onSubmit = (data: any) => {
    const dummy = {
      comment: data.comment,
      rating: 5,
    };
    setIsLoading(true);
    axios
      .post(
        `${baseUrl}city/${cityId}/destination/${destinationId}/review`,
        dummy,
        headers
      )
      .then((res) => {
        setIsLoading(false);
        handleClose();
        toast.success(res?.data?.message);
        getReviews();
        setModalState("close");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };
  //get all reviews
  const getReviews = () => {
    axios
      .get(`${baseUrl}city/${cityId}/destination/${destinationId}/review`)
      .then((res) => {
        setReviewss(res?.data?.reviews);
        console.log(res?.data?.reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSpecificAttraction();
    getReviews();
  }, []);

  const bookNow = () => {
    localStorage.setItem("destData", JSON.stringify(destination));
    navigate("/home/booking");
  };

  //Update Review

  const updateReview=(comment:string,reviewId:string)=>{
    setModalState("update-modal");
    setValue("comment",comment);
    setReviewId(reviewId);
  }

  const putUpdatedReview : SubmitHandler<ReviewFormData>=(data:{comment:string})=>{
    setIsLoading(true)
    axios.put(`${baseUrl}city/${cityId}/destination/${destinationId}/review/${reviewId}`,data,headers).then((res)=>{

      toast.success(res?.data?.message);
      setModalState("close");
      getReviews();


    }).catch((err)=>{

      toast.error(err?.response?.data?.message||"network error");

    }).finally(()=>{

      setIsLoading(false);

    })
    
    
  }


  const deleteReview=(reviewId:string)=>{
    setModalState("delete-modal");
    setReviewId(reviewId);
  }

  const requestFordeletingReview =()=>{
    setIsLoading(true);
    axios.delete(`${baseUrl}city/${cityId}/destination/${destinationId}/review/${reviewId}`,headers).then((res)=>{
      toast.success(res?.data?.success);
      getReviews();
      setModalState("close");
      
    }).catch((err)=>{
      toast.error(err?.response?.data?.message||"network error");
    }).finally(()=>{
      setIsLoading(false);
    })
    
    
  }

  return (
    <div className="min:h-[100vh] ">
      {destination ? (
        <>
          <div className="mx-auto max-w-7xl pl-1 sm:px-6 lg:px-8 py-6">
            <div className="navigation">
              <label className="md:text-4xl mx-2 text-sm sm:text-lg text-main flex items-center mb-8">
                <Link to="/">
                  <TiHome />
                </Link>
                <span className="text-xl font-bold">
                  <IoIosArrowForward />
                </span>
                <Link to={`/museums/${destination?.cityId?._id}`}>
                  {t("Museums")}
                </Link>
                <span className="text-xl font-bold">
                  <IoIosArrowForward />
                </span>
                {destination?.name}
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 bg- shadow-2xl rounded-3xl overflow-hidden m-3 h-[84vh] md:h-[auto]">
              <div
                className={` w-full h-auto lg:h-auto md:h-[70vh] overflow-hidden`}
              >
                <img
                  className="w-full  rounded-3xl"
                  src={destination?.image?.secure_url}
                  alt="mesume-photo"
                />
              </div>
              <div className="lg:col-span-3 text-sm sm:text-normal md:text-lg p-4 flex flex-col justify-between">
                <div className="name">
                  <div className=" flex justify-between items-center">
                    <h2 className="text-xl sm:text-lg md:text-3xl font-semibold mb-2">
                      {destination?.name}
                    </h2>
                    <div className="youtube flex items-center my-2">
                      <div className="clock border border-red-950 block p-2 cursor-pointer rounded-full shadow-sm border-dashed">
                        <Link target="_blank" to={destination?.video}>
                          <IoLogoYoutube className="text-xl text-red-700" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg">{destination?.description}</p>
                </div>

                <div className="booking  mt-4">
                  
                  <div>
                    <p className="flex text-main items-center">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </p>
                    <p>{t("Prices may vary depending on selected date")}.</p>
                  </div>

                  <div className="btn flex justify-end items-center mt-3">
                    <div className="">
                    
                    {data?.id ? <button
                        onClick={showAddModal}
                        className="px-3 font-bold rounded-full bg-main border-main hover:text-main duration-700 border-2 text-white hover:bg-transparent"
                      >
                        {t("Add Review")}
                      </button>:""}
                    </div>
                    <div className="mx-2">
                      <button
                        onClick={bookNow}
                        className="px-3 font-bold rounded-full bg-main border-main hover:text-main duration-700 border-2 text-white hover:bg-transparent"
                      >
                        {t("Book Now")}
                      </button>
                    </div>
                    <div className="">
                      <button
                        onClick={isSpeaking ? handlePause : handleSpeak}
                        className="px-3 font-bold rounded-full bg-main border-main hover:text-main duration-700 border-2 text-white hover:bg-transparent"
                      >
                        {!isSpeaking ? "Speak" : "Pause"}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <Highlights
            firstImagee={String(destination?.subImages[0]?.secure_url)}
            secImagee={String(destination?.subImages[1]?.secure_url)}
            thirdImagee={String(destination?.subImages[2]?.secure_url)}
          />

          <div className="mx-auto max-w-7xl pl-1 sm:px-6 lg:px-8 mt-3 pb-5 ">
            <div className="Highlights text-center border-[12px] rounded-xl ">
              <h2 className="text-main text-3xl md:text-6xl font-bold py-6 ">
                {t("Opening Hours")}
              </h2>
              <div className="overflow-x-auto w-[95%] md:w-[70%] h-[85vh] md:h-[auto] m-auto  py-0 md:py-2 mb-0 md:mb-5">
                <Table className="text-center" hoverable>
                  <Table.Head className="">
                    <Table.HeadCell
                      colSpan={4}
                      className=" text-center text-xl md:text-4xl bg-main text-white"
                    >
                      {t("Opening Hours")}
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-zinc-800 divide-y-8">
                    <Table.Row className="bg-blue-200  ">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("MON")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-blue-200  ">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("TUE")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-blue-200 ">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("WED")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-blue-200  ">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("THU")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-blue-200 ">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("FRI")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-blue-200  ">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("SAT")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-blue-200">
                      <Table.Cell className="font-medium text-gray-900">
                        {t("SUN")}
                      </Table.Cell>
                      <Table.Cell>{t("9:00 AM")}</Table.Cell>
                      <Table.Cell>{t("To")}</Table.Cell>
                      <Table.Cell>{t("6:00 PM")}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>

          {reviewss?.length > 0 ? (
            <div className="mx-auto max-w-7xl pl-1 sm:px-6 lg:px-8 mt-3 pb-5 ">
              <div className="Highlights text-center border-[12px] rounded-xl ">
                <h2 className="text-main text-3xl md:text-6xl font-bold py-6 ">
                  {t("Reviews")}
                </h2>

                <div className="overflow-x-auto w-[95%] md:w-[70%]  md:h-[auto] m-auto  py-0 md:py-2 mb-0 md:mb-5">
                  {reviewss?.map((review, idx: number) => (
                    <div
                      key={idx}
                      className="p-2 my-2 bg-blue-200 hover:bg-white duration-300 shadow-lg rounded-lg"
                    >
                      <div className="flex items-start">
                        <img
                          className="w-10 h-10 rounded-full mr-4"
                          src={review?.createdBy?.image?.secure_url}
                          alt={`${review?.createdBy?.firstName} ${review?.createdBy?.lastName}`}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-lg font-bold">{`${review?.createdBy?.firstName} ${review?.createdBy?.lastName}`}</p>
                            </div>
                            <div className="flex items center justify-center">
                              {data?.id == review?.createdBy?._id ? (
                                <>
                                  <button onClick={()=>{updateReview(review?.comment,String(review?._id))}}>
                                    <FiEdit className="mx-2 text-yellow-400" />
                                  </button>
                                  <button onClick={()=>{deleteReview(String(review?._id))}}>
                                    <RiDeleteBin6Line className="text-red-400" />
                                  </button>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <p className="flex items-center justify-center ">
                            <FaQuoteLeft className="text-gray-500 mr-2" />
                            {review?.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* add-modal */}
          <Modal
            show={modalState == "add-modal"}
            size="md"
            onClose={handleClose}
            popup
          >
            <div className="flex items-center justify-between px-4 py-2  rounded-t">
              <h3 className="text-lg font-semibold text-main dark:text-white">
                {t("Add Review")}
              </h3>
              <button onClick={handleClose}>
                <IoClose />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-5 md:pb-5">
              <div className="grid gap-4 mb-2 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-main dark:text-white"
                  >
                    {t("Review")}
                  </label>
                  <div className="flex items-center">
                    <div className="flex-auto">
                      <textarea
                        id="comment"
                        rows={5}
                        cols={40}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type Your Comment"
                        {...register("comment", {
                          required: true,
                          minLength: {
                            value: 2,
                            message:
                              "Review shouldn't be less than two character",
                          },
                        })}
                      ></textarea>
                    </div>
                    {errors?.comment && (
                      <ErrorMessage
                        text={String(
                          errors?.comment?.message || "comment is required"
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className={
                  "text-white bg-main hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center duration-500 md:mb-0 mb-2" +
                  (isLoading ? " disabled" : " ")
                }
              >
                {isLoading == true ? (
                  <ImSpinner9 className="animate-spin" />
                ) : (
                  <>
                    <FaPlus className="mx-1" />
                    {t("Add  Review")}
                  </>
                )}
              </button>
            </form>
          </Modal>

          {/* update-modal */}
          <Modal
            show={modalState == "update-modal"}
            size="md"
            onClose={handleClose}
            popup
          >
            <div className="flex items-center justify-between px-4 py-2  rounded-t">
              <h3 className="text-lg font-semibold text-main dark:text-white">
                {t("Update Review")}
              </h3>
              <button onClick={handleClose}>
                <IoClose />
              </button>
            </div>
            <form onSubmit={handleSubmit(putUpdatedReview)} className="px-5 md:pb-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-main dark:text-white"
                  >
                    {t("Review")}
                  </label>
                  <div className="flex items-center">
                    <div className="flex-auto">
                      <textarea
                        id="comment"
                        rows={5}
                        cols={40}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type Your Comment"
                        {...register("comment", {
                          required: true,
                          minLength: {
                            value: 2,
                            message:
                              "Review shouldn't be less than two character",
                          },
                        })}
                      ></textarea>
                    </div>
                    {errors?.comment && (
                      <ErrorMessage
                        text={String(
                          errors?.comment?.message || "comment is required"
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className={
                  "text-white bg-main hover:bg-blue-950 focus:ring-4 focus:outline-none md:mb-0 mb-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center duration-500" +
                  (isLoading ? " disabled" : " ")
                }
              >
                {isLoading == true ? (
                  <ImSpinner9 className="animate-spin" />
                ) : (
                  <>
                    <FaPlus className="mx-1" />
                    {t("Update  Review")}
                  </>
                )}
              </button>
            </form>
          </Modal>

          {/* delete-modal */}
          <Modal
            show={modalState == "delete-modal"}
            size="md"
            onClose={handleClose}
            popup
          >


            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-3 shadow-lg">
        <h2 className="font-bold text-lg">Delete Review</h2>
        <div className="md:flex justify-center items-center">
        <p className="m-2">Are you sure you want to delete your comment?</p>
        <div className="flex items-center justify-center my-2">
        <button className="mr-2 px-4 py-2 bg-gray-500 hover:bg-gray-700 duration-300 text-white rounded-lg" onClick={()=>{setModalState("close")}}>
            Cancel
          </button>
          <button
                onClick={requestFordeletingReview}
                className={
                  "text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center duration-500" +
                  (isLoading ? " disabled" : " ")
                }
              >
                {isLoading == true ? (
                  <ImSpinner9 className="animate-spin" />
                ) : (
                  <>
                    <FaPlus className="mx-1" />
                    {t("Delete")}
                  </>
                )}
              </button>
        </div>
        </div>
      </div>
    </div>


           
          </Modal>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
