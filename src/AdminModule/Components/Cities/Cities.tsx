import axios from "axios";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCities } from "../../../Redux/CitySlice/CitySlice";
import CityCard from "../../../SharedModules/Components/CityCard/CityCard";
import ErrorMessage from "../../../SharedModules/Components/ErrorMessage/ErrorMessage";
import NoData from "../../../SharedModules/Components/NoData/NoData";
import { getAllCities } from "../../../Utls/getData";
import dleavatar from "../../../assets/Study abroad-bro.svg";
import { baseUrl } from "./../../../Utls/BaseUrl";
export default function Cities() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [cityId, setCityId] = useState(0);
  const [modalState, setModalState] = useState("close");
  const showAddModal = () => {
    setValue('name',"");
    setValue('image',"")
    setModalState("add-modal");
  };
  
  const showDeleteModal = (Id: any) => {
    setCityId(Id);
    setModalState("delete-modal");
  };

  const showUpdateModal = (city:any) => {
    setValue('name',city.name);
    setValue('image',city.image.secure_url)
    setCityId(city.id)
    
    setModalState("update-modal");
  };

  const handleClose = () => setModalState("close");
  const dispatch = useDispatch();
  const { cities } = useSelector((state: any) => state.CitiesReducer);
  const { headers } = useSelector((state: any) => state.authReducer);

  const onSubmit = (data: any) => {
    const addFormData = new FormData();
    addFormData.append("name", data["name"]);
    addFormData.append("image", data["image"][0]);
    setIsLoading(true);
    axios
      .post(`${baseUrl}city`, addFormData, headers)
      .then((res) => {
        setIsLoading(false);
        handleClose();
        toast.success(res?.data?.message);
        getAllCities("city", (res) => {
          return dispatch(setCities(res));
        });
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };
  //deleteCity
  const deleteCity = () => {
    setIsLoading(true);
    axios
      .delete(`${baseUrl}city/${cityId}`, headers)
      .then((res) => {
        console.log(res);
        
        handleClose();
        setIsLoading(false);
        toast.success(res?.data?.message || "City deleted successfully");
        getAllCities("city", (res) => {
          return dispatch(setCities(res));
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Axios error!!");
        setIsLoading(false);
      });
  };
  //updateCity
  const updateCity = (data:any) => {
      const addFormData = new FormData();
    addFormData.append("name", data["name"]);
    addFormData.append("image", data["image"][0]);
      setIsLoading(true);
      axios.put(`${baseUrl}city/${cityId}`,addFormData, headers)
        .then((res) => {
          handleClose();
          setIsLoading(false);
          toast.success(res?.data?.message||"City updated successfully");
          getAllCities("city",(res) => {
            return dispatch(setCities(res));
          });
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Axios error!!");
          setIsLoading(false);
        });
    };
  return (
    <>
      <div
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
        className="Elheader home-container my-5 mx-2 p-4 rounded-lg grid grid-cols-1 
        gap-4 lg:grid-cols-4 lg:gap-8 align-items-center "
      >
        <div className="lg:col-span-2 ">
          <h4 className="text-2xl font-medium text-main">
            {t("City Details")} !
          </h4>
          <p>{t("You can check all details")}</p>
        </div>
        <div></div>
        <div className="text-end">
          <button
            onClick={showAddModal}
            type="button"
            className="text-white bg-main hover:bg-blue-950  font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center inline-flex items-center duration-500"
          >
            {t("Add New City")}
          </button>
        </div>
      </div>

      {cities.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-1 ">
          {cities?.map((city: any) => (
            <div className="w-full" key={city.id}>
              <CityCard
                modalDelete={() => showDeleteModal(city.id)}
                modalUpdate={()=>showUpdateModal(city)}
                name={city.name}
                image={city.image.secure_url}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center ">
          <div className="w-[30%]">
            <NoData />
          </div>
        </div>
      )}

      <div className="ElModalls">
        <Modal
          show={modalState == "add-modal"}
          size="md"
          onClose={handleClose}
          popup
        >
          <div className="flex items-center justify-between p-4  md:px-5  rounded-t">
            <h3 className="text-lg font-semibold text-main">
            {t("Add New City")}
            </h3>
            <button onClick={handleClose}>
              <IoClose />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-5 md:pb-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-main"
                >
                  {t("Name")}
                </label>
                <div className="flex items-center">
                  <div className="flex-auto">
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                      rounded-lg  block w-full p-2.5"
                      placeholder="Type city name"
                      {...register("name", {
                        required: true,
                        minLength: {
                          value: 2,
                          message:
                            "City name shouldn't be less than two character",
                        },
                      })}
                    />
                  </div>
                  {errors?.name && (
                    <ErrorMessage
                      text={String(errors?.name?.message || "Name is required")}
                    />
                  )}
                </div>
              </div>
              <div className="col-span-2 w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-main dark:text-white"
                >
                  {t("City Image")}
                </label>
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 
                  border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 
                        5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">{t("Click to upload")}</span>
                      {t("or drag and drop")}
                    </p>
                    <p className="text-xs text-gray-500 ">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    {...register("image", {
                      required: "image is required",
                    })}
                  />
                  {errors?.image && (
                    <ErrorMessage
                      text={String(
                        errors?.image.message || "Image is required"
                      )}
                    />
                  )}
                </label>
              </div>
            </div>
            <button
              type="submit"
              className={
                `text-white bg-main hover:bg-blue-950  font-medium rounded-lg 
                text-sm px-5 py-2.5 text-center inline-flex items-center duration-500` +
                (isLoading ? " disabled" : " ")
              }
            >
              {isLoading == true ? (
                <ImSpinner9 className="animate-spin" />
              ) : (
                <>
                  <FaPlus className="mx-1" />
                  {t("Add New City")}
                </>
              )}
            </button>
          </form>
        </Modal>
        <Modal
          show={modalState == "delete-modal"}
          size="md"
          onClose={handleClose}
          popup
        >
          <div className="flex items-center justify-between p-4  md:px-5  rounded-t">
            <h3 className="text-lg font-semibold text-main">
              {t("Delete City")}
            </h3>
            <button onClick={handleClose}>
              <IoClose />
            </button>
          </div>
          <div className="px-5 md:pb-5">
            <div className="grid grid-cols-2">
              <div className="col-span-2 ms-auto">
                <img className="w-[70%]" src={dleavatar} alt="avatar" />
              </div>
              <div className="col-span-2 w-full">
                <h4 className="text-slate-500">{t("Delete This City")} ?</h4>
                <span className="text-slate-500">
                 {t("are you sure you want to delete this city ? if you are sure just click on delete city")}
                </span>
              </div>
            </div>
            <div className="text-end">
              <button
                type="submit"
                onClick={deleteCity}
                className={
                  `text-white mt-3  bg-red-800  font-medium rounded-lg text-sm  px-5 py-2.5 
                  text-center inline-flex items-center duration-500` +
                  (isLoading ? " disabled" : " ")
                }
              >
                {isLoading == true ? (
                  <ImSpinner9 className="animate-spin" />
                ) : (
                  <>
                  {t("Delete City")}
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          show={modalState == "update-modal"}
          size="md"
          onClose={handleClose}
          popup
        >
          <div className="flex items-center justify-between p-4  md:px-5  rounded-t">
            <h3 className="text-lg font-semibold text-main">
             
              {t("Update City")}
            </h3>
            <button onClick={handleClose}>
              <IoClose />
            </button>
          </div>
          <form onSubmit={handleSubmit(updateCity)} className="px-5 md:pb-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-main"
                >
                  {t("Name")}
                </label>
                <div className="flex items-center">
                  <div className="flex-auto">
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg  block w-full p-2.5"
                      placeholder="Type city name"
                      {...register("name", {
                        required: true,
                        minLength: {
                          value: 2,
                          message:
                            "City name shouldn't be less than two character",
                        },
                      })}
                    />
                  </div>
                  {errors?.name && (
                    <ErrorMessage
                      text={String(errors?.name?.message || "Name is required")}
                    />
                  )}
                </div>
              </div>
              <div className="col-span-2 w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-main"
                >
                 {t("City Image")}
                </label>
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full
                   h-64 border-2 border-gray-300
                   border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 
                        5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">{t("Click to upload")}</span> 
                      {t("or drag and drop")}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    {...register("image", {
                      required: "image is required",
                    })}
                  />
                  {errors?.image && (
                    <ErrorMessage
                      text={String(
                        errors?.image.message || "Image is required"
                      )}
                    />
                  )}
                </label>
              </div>
            </div>
            <div className="text-end">
              <button
                type="submit"
                className={
                  `text-white bg-main hover:bg-blue-950 focus:ring-4 
                   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center duration-500` +
                  (isLoading ? " disabled" : " ")
                }
              >
                {isLoading == true ? (
                  <ImSpinner9 className="animate-spin" />
                ) : (
                  <>
                  {t("Update City")}
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}
