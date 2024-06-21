import axios from "axios";
import { Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { ImSpinner9 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCities } from "../../../Redux/CitySlice/CitySlice";
import { setmonuments } from "../../../Redux/MonumentsSlice/MonumentsSlice";
import ErrorMessage from "../../../SharedModules/Components/ErrorMessage/ErrorMessage";
import MonumentsCard from "../../../SharedModules/Components/MonumentsCard/MonumentsCard";
import NoData from "../../../SharedModules/Components/NoData/NoData";
import SharedModal from "../../../SharedModules/Components/SharedModal/SharedModal";
import { baseUrl } from "../../../Utls/BaseUrl";
import { getAllCities } from "../../../Utls/getData";

interface MonumentInfo {
  name: string;
  ticketPrice: string;
  type: string;
  location: string;
  description: string;
  image?: Record<string, File>;
  subImages?: Record<string, File>;
}

export default function AdminMonuments() {
  const { t, i18n } = useTranslation();
  const [modalState, setModalState] = useState("");
  const [cityId, setCityId] = useState("");
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updateModalLoading, setUpdateModalLoading] = useState(false);
  const dispatch = useDispatch();
  const { headers } = useSelector((state: any) => state.authReducer);
  const { cities } = useSelector((state: any) => state.CitiesReducer);
  function onCloseModal() {
    setModalState("");
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    register: updateRegister,
    getValues: updateModalValues,
    handleSubmit: handleSubmitUpdateModal,
    setValue: setUpdateModalValues,
    formState: { errors: updateErrors },
  } = useForm();

  const { monuments } = useSelector((state: any) => state.MonumentsReducer);
  useEffect(() => {
    getAllCities("city", (res) => {
      return dispatch(setCities(res));
    });
    getAllCities("destinations", (res) => {
      return dispatch(setmonuments(res));
    });
  }, []);
  //add modal
  const convertDataIntoFormData = (monumentObject: any): FormData => {
    delete monumentObject.cityID;
    const formData = new FormData();
    formData.append("name", monumentObject.name);
    formData.append("ticketPrice", monumentObject.ticketPrice);
    formData.append("type", monumentObject.type);
    formData.append("location", monumentObject.location);
    formData.append("description", monumentObject.description);
    formData.append("video", monumentObject.video);

    if (Object.keys(monumentObject.image).length > 0) {
      formData.append("image", monumentObject.image["0"]);
    }
    for (const key in monumentObject.subImages) {
      if (monumentObject.subImages.hasOwnProperty(key)) {
        formData.append(`subImages`, monumentObject.subImages[key]);
      }
    }
    return formData;
  };

  const postData = (formData: any, data: MonumentInfo, cityID: string) => {
    axios
      .post(`${baseUrl}city/${cityID}/destination`, formData, headers)
      .then((res) => {
        toast.success(res?.data?.message);
        onCloseModal();
        for (const key in data) {
          setValue(key, "");
        }
        getAllCities("destinations", (res) => {
          return dispatch(setmonuments(res));
        });
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "failed to create monument"
        );
        toast.error(
          err?.response?.data?.validationErr[0]?.message || "Network error"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit = (data: MonumentInfo | any) => {
    setIsLoading(true);
    let cityID = data.cityID;
    const formData = convertDataIntoFormData(data);
    postData(formData, data, cityID);
  };

  //delete
  const openDeleteModal = (cityId: string, id: string) => {
    setModalState("delete");
    setCityId(cityId);
    setId(id);
  };

  const deleteMonument = () => {
    setIsLoading(true);
    axios
      .delete(`${baseUrl}city/${cityId}/destination/${id}`, headers)
      .then((res) => {
        toast.success(res?.data?.message);
        getAllCities("destinations", (res) => {
          return dispatch(setmonuments(res));
        });
        onCloseModal();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "network error");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //update
  const getMonument = (cityId: string, id: string) => {
    axios
      .get(`${baseUrl}city/${cityId}/destination/${id}`)
      .then((res) => {
        console.log(res);
        if (res?.data?.touristDestination) {
          setUpdateModalValues("name", res?.data?.touristDestination.name);
          setUpdateModalValues(
            "ticketPrice",
            res?.data?.touristDestination.ticketPrice
          );
          setUpdateModalValues("type", res?.data?.touristDestination.type);
          setUpdateModalValues(
            "city",
            res?.data?.touristDestination?.cityId?.name
          );
          setUpdateModalValues(
            "location",
            res?.data?.touristDestination.location
          );
          setUpdateModalValues("video", res?.data?.touristDestination.video);
          setUpdateModalValues(
            "description",
            res?.data?.touristDestination.description
          );
        }
        console.log(res?.data?.touristDestination?.cityId?.name);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUpdateModalLoading(false);
      });
  };

  const openUpdateModal = (cityId: string, id: string) => {
    setUpdateModalLoading(true);
    setModalState("update");
    getMonument(cityId, id);
    setCityId(cityId);
    setId(id);
  };

  const submitUpdateModal = (data: any) => {
    const formData = new FormData();

    if (true) {
      formData.append("name", data.name);
    }
    formData.append("ticketPrice", data.ticketPrice);
    formData.append("type", data.type);
    formData.append("location", data.location);
    formData.append("video", data.video);
    formData.append("description", data.description);
    sendUpdatedData(formData);
    console.log(updateModalValues());
  };

  const sendUpdatedData = (formData: any) => {
    setIsLoading(true);
    axios
      .put(`${baseUrl}city/${cityId}/destination/${id}`, formData, headers)
      .then((res) => {
        toast.success(res?.data?.message);
        onCloseModal();
        getAllCities("destinations", (res) => {
          return dispatch(setmonuments(res));
        });
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "failed to create monument"
        );
        toast.error(
          err?.response?.data?.validationErr[0]?.message || "Network error"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div
        className="home-container my-5 mx-2 p-4 rounded-lg 
        grid grid-cols-1 gap-4 
        lg:grid-cols-4 lg:gap-8 align-items-center "
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
      >
        <div className="lg:col-span-2 ">
          <h4 className="text-2xl font-medium text-main">
            {t("Monuments Details")} !
          </h4>
          <p>{t("You can check all details")}</p>
        </div>
        <div></div>
        <div className="text-end">
          <button
            onClick={() => setModalState("add")}
            type="button"
            className="text-white bg-main hover:bg-blue-950 font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center inline-flex items-center duration-500"
          >
            {t("Add New Monuments")}
          </button>
        </div>
      </div>

      <SharedModal
        title="Update Monument"
        openModal={modalState == "update" ? true : false}
        onclose={onCloseModal}
      >
        {updateModalLoading ? (
          ""
        ) : (
          <form
            onSubmit={handleSubmitUpdateModal(submitUpdateModal)}
            className="px-3 pb-5"
          >
            <div className="grid gap-4 mb-3 grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-main"
                >
                  {t("Name")}
                </label>
                <div className="flex items-center">
                  <div className="flex-auto mx-1">
                    <input
                      id="name"
                      type="text"
                      {...updateRegister("name", {
                        required: "City Name is required",
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 
                      text-sm rounded-lg block w-full p-2.5"
                      placeholder="Type Monument name"
                    />
                  </div>
                  {updateErrors?.name && (
                    <ErrorMessage text={String(updateErrors?.name?.message)} />
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="ticketPrice"
                  className="block mb-2 text-sm font-medium text-main"
                >
                  {t("Ticket Price")}
                </label>
                <div className="flex items-center">
                  <div className="flex-auto mx-1">
                    <input
                      type="number"
                      {...updateRegister("ticketPrice", {
                        required: "Ticket Price is required",
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 
                      text-sm rounded-lg block w-full p-2.5"
                      placeholder="Ticket Price"
                      id="ticketPrice"
                    />
                  </div>
                  {updateErrors?.ticketPrice && (
                    <ErrorMessage
                      text={String(updateErrors?.ticketPrice?.message)}
                    />
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-main"
                >
                  {t("Type")}
                </label>

                <div className="flex items-center">
                  <div className="flex-auto mx-1">
                    <Select
                      {...updateRegister("type", {
                        required: "Type is required",
                      })}
                    >
                      <option value="Museum">{t("Museum")}</option>
                      <option value="Monument">{t("Monument")}</option>
                    </Select>
                  </div>
                  {updateErrors?.type && (
                    <ErrorMessage text={String(updateErrors?.type?.message)} />
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-main"
                >
                  {t("City")}
                </label>

                <div className="flex items-center">
                  <div className="flex-auto mx-1">
                    <Select
                      {...updateRegister("city", {
                        required: "City is required",
                      })}
                    >
                      {cities?.length > 0
                        ? cities.map((city: any, idx: number) => (
                            <option key={idx} value={city._id}>
                              {city.name}
                            </option>
                          ))
                        : ""}
                    </Select>
                  </div>
                  {updateErrors?.city && (
                    <ErrorMessage text={String(updateErrors?.city?.message)} />
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-main"
                >
                  {t("Location")}
                </label>
                <div className="flex items-center">
                  <div className="flex-auto mx-1">
                    <input
                      type="text"
                      {...updateRegister("location", {
                        required: "Location is required",
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 
                      text-sm rounded-lg  block w-full p-2.5"
                      placeholder="Location Link from google map"
                      id="location"
                    />
                  </div>
                  {updateErrors?.location && (
                    <ErrorMessage
                      text={String(updateErrors?.location?.message)}
                    />
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="video"
                  className="block mb-2 text-sm font-medium text-main"
                >
                  Video
                </label>
                <div className="flex items-center">
                  <div className="flex-auto mx-1">
                    <input
                      type="text"
                      {...updateRegister("video", {
                        required: "video is required",
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 
                      text-sm rounded-lg block w-full p-2.5"
                      placeholder="Video Link for it"
                      id="video"
                    />
                  </div>
                  {errors?.video && (
                    <ErrorMessage text={String(errors?.video?.message)} />
                  )}
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-main"
                >
                  {t("Description")}
                </label>
                <div className="flex items-center">
                  <div className="flex-auto mx-1">
                    <textarea
                      rows={5}
                      cols={40}
                      {...updateRegister("description", {
                        required: "Description is required",
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 
                      text-sm rounded-lg block w-full p-2.5"
                      placeholder="Type Monument Description"
                      id="description"
                    />
                  </div>
                  {updateErrors?.description && (
                    <ErrorMessage
                      text={String(updateErrors?.description?.message)}
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="text-white bg-gray-800   
              font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center duration-500"
            >
              {!isLoading ? (
                <span className="flex items-center">
                  {t("Update Monument")}
                </span>
              ) : (
                <ImSpinner9 className="animate-spin" />
              )}
            </button>
          </form>
        )}
      </SharedModal>

      <SharedModal
        title="Add New Monument"
        openModal={modalState == "add" ? true : false}
        onclose={onCloseModal}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="px-3 pb-5">
          <div className="grid gap-4 mb-3 grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-main"
              >
                {t("Name")}
              </label>
              <div className="flex items-center">
                <div className="flex-auto mx-1">
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "City Name is required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg block w-full p-2.5"
                    placeholder="Type Monument name"
                  />
                </div>
                {errors?.name && (
                  <ErrorMessage text={String(errors?.name?.message)} />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="ticketPrice"
                className="block mb-2 text-sm font-medium text-main"
              >
                {t("Ticket Price")}
              </label>
              <div className="flex items-center">
                <div className="flex-auto mx-1">
                  <input
                    type="number"
                    {...register("ticketPrice", {
                      required: "Ticket Price is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg block w-full p-2.5"
                    placeholder="Ticket Price"
                    id="ticketPrice"
                  />
                </div>
                {errors?.ticketPrice && (
                  <ErrorMessage text={String(errors?.ticketPrice?.message)} />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="ticketPrice"
                className="block mb-2 text-sm font-medium text-main "
              >
                {t("Type")}
              </label>

              <div className="flex items-center">
                <div className="flex-auto mx-1">
                  <Select
                    {...register("type", { required: "Type is required" })}
                  >
                    <option value="Museum">Museum</option>
                    <option value="Monument">Monument</option>
                  </Select>
                </div>
                {errors?.type && (
                  <ErrorMessage text={String(errors?.type?.message)} />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-main"
              >
                {t("City")}
              </label>

              <div className="flex items-center">
                <div className="flex-auto mx-1">
                  <Select
                    {...register("cityID", { required: "City is required" })}
                  >
                    {cities?.length > 0
                      ? cities.map((city: any, idx: number) => (
                          <option key={idx} value={city._id}>
                            {city.name}
                          </option>
                        ))
                      : ""}
                  </Select>
                </div>
                {errors?.cityID && (
                  <ErrorMessage text={String(errors?.cityID?.message)} />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-main"
              >
                {t("Location")}
              </label>
              <div className="flex items-center">
                <div className="flex-auto mx-1">
                  <input
                    type="text"
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className="bg-gray-50 border border-gray-300 
                    text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Location Link from google map"
                    id="location"
                  />
                </div>
                {errors?.location && (
                  <ErrorMessage text={String(errors?.location?.message)} />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="video"
                className="block mb-2 text-sm font-medium text-main"
              >
                Video
              </label>
              <div className="flex items-center">
                <div className="flex-auto mx-1">
                  <input
                    type="text"
                    {...register("video", {
                      required: "video is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg block w-full p-2.5"
                    placeholder="Video Link for it"
                    id="video"
                  />
                </div>
                {errors?.video && (
                  <ErrorMessage text={String(errors?.video?.message)} />
                )}
              </div>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-main"
              >
                {t("Description")}
              </label>
              <div className="flex items-center">
                <div className="flex-auto mx-1">
                  <textarea
                    rows={5}
                    cols={40}
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg  block w-full p-2.5"
                    placeholder="Type Monument Description"
                    id="description"
                  />
                </div>
                {errors?.description && (
                  <ErrorMessage text={String(errors?.description?.message)} />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-main"
              >
                {t("image")}
              </label>
              <div className="flex items-center">
                <div className="flex-auto mx-1">
                  <input
                    type="file"
                    {...register("image", {
                      required: "image is required",
                    })}
                    className="bg-gray-50 border border-gray-300 
                    text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    id="image"
                  />
                </div>
                {errors?.image && (
                  <ErrorMessage text={String(errors?.image?.message)} />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="subImages"
                className="block mb-2 text-sm font-medium text-main"
              >
                {t("Choose 3 images for monument Highlights")}
              </label>
              <div className="flex items-center">
                <div className="flex-auto mx-1">
                  <input
                    type="file"
                    {...register("subImages", {
                      required: "Highlights is required",
                      minLength: 3 || "please choose 3 images",
                      maxLength: 3 || "please choose 3 images",
                    })}
                    multiple
                    className="bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg  block w-full p-2.5"
                    id="subImages"
                  />
                </div>
                {errors?.subImages && (
                  <ErrorMessage text={String(errors?.subImages?.message)} />
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-gray-800  
             font-medium rounded-lg text-sm px-5 py-2.5 text-center
              inline-flex items-center duration-500"
          >
            {!isLoading ? (
              <span className="flex items-center">
                <FaPlus className="mx-2" />
                {t("Add new Monument")}
              </span>
            ) : (
              <ImSpinner9 className="animate-spin" />
            )}
          </button>
        </form>
      </SharedModal>

      <SharedModal
        title="Delete Monument"
        openModal={modalState == "delete" ? true : false}
        onclose={onCloseModal}
      >
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            {t("Are you sure you want to delete this monument?")}
          </h3>
          <div className="flex justify-center gap-4">
            <button
              className="bg-red-700 duration-300 hover:bg-red-800 text-white px-3 py-1 my-4 
              rounded-md"
              onClick={deleteMonument}
            >
              {!isLoading ? (
                <span className="flex items-center">
                  <FaPlus className="mx-2" />
                  {t("Yes, I'm sure")}
                </span>
              ) : (
                <ImSpinner9 className="animate-spin" />
              )}
            </button>
            <button
              className="bg-gray-600 duration-300 hover:bg-gray-700 
              text-white px-3 py-1 my-4 
              rounded-md"
              onClick={onCloseModal}
            >
              {t("No, cancel")}
            </button>
          </div>
        </div>
      </SharedModal>

      {monuments.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-1 ">
          {monuments.map((monument: any) => (
            <div className="w-full" key={monument.id}>
              <MonumentsCard
                openDeleteModal={(cityId: string, id: string) => {
                  return openDeleteModal(cityId, id);
                }}
                openUpdateModal={(cityId: string, id: string) => {
                  return openUpdateModal(cityId, id);
                }}
                monument={monument}
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
    </>
  );
}
