import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { Stepper } from "react-form-stepper";
import { useForm } from "react-hook-form";
import { BsPersonVcardFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GrFormPrevious } from "react-icons/gr";
import {
  MdNavigateNext,
  MdOutlineMailOutline,
  MdOutlinePhoneAndroid,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "../../../SharedModules/Components/Button/Button";
import ErrorMessage from "../../../SharedModules/Components/ErrorMessage/ErrorMessage";
import Input from "../../../SharedModules/Components/Input/Input";
import Passsword from "../../../SharedModules/Components/Password/Passsword";
import postDataHock from "../../../Utls/HockForPostData";
import { ImSpinner9 } from "react-icons/im";

interface UserCredentials {
  email?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  password?: string;
  cpassword?: string;
}
interface UserAdditionalInfo {
  country?: string;
  gender?: string;
  image?: FileList;
  phone?: string;
}
interface UserProfile {
  country?: string;
  cpassword?: string;
  email?: string;
  firstName?: string;
  gender?: string;
  image?: FileList;
  lastName?: string;
  password?: string;
  phone?: string;
  userName?: string;
}
interface FormDataObject {
  [key: string]: any;
  image?: FileList;
}

export default function Register() {
  const { postData, isLoading } = postDataHock();
  const {
    register: firstFormRegister,
    handleSubmit: handleFirstFormSubmit,
    getValues,
    formState: { errors: firstFormErrors },
  } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selected, setSelected] = useState("");
  const [countryError, setCountryError] = useState("");
  const [firstFormData, setFirstFormData] = useState<UserCredentials>();
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps: object[] = [{ label: "Step 1" }, { label: "Step 2" }];

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
  const firstFormOnSubmit = (data: UserCredentials) => {
    setFirstFormData(data);
    handleNextStep();
  };

  const appendFormData = (allFormData: FormDataObject): FormData => {
    const formData = new FormData();
    for (const key in allFormData) {
      if (Object.prototype.hasOwnProperty.call(allFormData, key)) {
        if (
          key === "image" &&
          allFormData?.image &&
          allFormData?.image?.length > 0
        ) {
          formData.append(key, allFormData?.image[0], allFormData?.image[0].name);
        } else {
          formData.append(key, allFormData[key]);
        }
      }
    }
    return formData;
  };

  const onSubmit = (data: UserAdditionalInfo) => {
    if (!selected) {
      return setCountryError("country is required");
    }

    data.country = selected;
    setCountryError("");
    const allFormData: UserProfile = { ...data, ...firstFormData };
    const formData = appendFormData(allFormData);
    postData(formData, "auth/signup", "/auth");
  };

  return (
    <div className="h-screen text-white flex items-center justify-center">
      <div className="w-full ">
        <h2 className="text-2xl my-3 font-semibold text-center">Register</h2>
        <Stepper steps={steps} activeStep={activeStep} />
        <div className="w-[100%] flex items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-5/6 lg:w-3/4">
            {activeStep == 0 ? (
              <>
                <div className="name-inputs gap-x-6 grid sm:grid-cols-2 grid-cols-1 ">
                  <div className="my-1 flex items-center">
                    <div className="flex-auto">
                      <Input
                        type="text"
                        placeholder="Enter your first name"
                        {...firstFormRegister("firstName", {
                          required: "FirstName is required",
                          minLength: {
                            value: 2,
                            message:
                              "First name should be greater than two letters ",
                          },
                          maxLength: {
                            value: 10,
                            message:
                              "First name should be less than ten letters",
                          },
                        })}
                        children={<BsPersonVcardFill />}
                      />
                    </div>
                    {firstFormErrors?.firstName && (
                      <ErrorMessage
                        text={String(firstFormErrors?.firstName?.message)}
                      />
                    )}
                  </div>
                  <div className="my-1 flex items-center">
                    <div className="flex-auto w-[99%]">
                      <Input
                        type="text"
                        placeholder="Enter your last name"
                        {...firstFormRegister("lastName", {
                          required: "LastName is required",
                          minLength: {
                            value: 2,
                            message:
                              "Last name should be greater than two letters",
                          },
                          maxLength: {
                            value: 10,
                            message:
                              "Last name should be less than ten letters",
                          },
                        })}
                        children={<BsPersonVcardFill />}
                      />
                    </div>
                    {firstFormErrors?.lastName && (
                      <ErrorMessage
                        text={String(firstFormErrors?.lastName?.message)}
                      />
                    )}
                  </div>
                </div>

                <div className="userName-input my-4 items-center">
                  <div className="flex items-center">
                    <div className="flex-auto">
                      <Input
                        type="userName"
                        placeholder="Enter your userName"
                        {...firstFormRegister("userName", {
                          required: "userName is required",
                          pattern: {
                            value:
                              /^(?=[a-zA-Z0-9._]{5,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                            message: "Invalid userName Format",
                          },
                        })}
                        children={<MdOutlineMailOutline />}
                      />
                    </div>
                    {firstFormErrors?.userName && (
                      <ErrorMessage
                        text={String(firstFormErrors?.userName?.message)}
                      />
                    )}
                  </div>
                </div>

                <div className="email-input my-4 items-center">
                  <div className="flex items-center">
                    <div className="flex-auto">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...firstFormRegister("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Invalid Email Format",
                          },
                        })}
                        children={<MdOutlineMailOutline />}
                      />
                    </div>
                    {firstFormErrors?.email && (
                      <ErrorMessage
                        text={String(firstFormErrors?.email?.message)}
                      />
                    )}
                  </div>
                </div>

                <div className="password-input my-4 flex items-center">
                  <div className="flex-auto">
                    <Passsword
                      placeholder="Enter your Password"
                      {...firstFormRegister("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/,
                          message: `The password must include at least one lowercase letter,
                one uppercase letter, one digit, one special character,
                and be at least 6 characters long!!`,
                        },
                      })}
                    />
                  </div>
                  {firstFormErrors?.password && (
                    <ErrorMessage
                      text={String(firstFormErrors?.password?.message)}
                    />
                  )}
                </div>

                <div className="confirm-password input my-4 flex items-center">
                  <div className="flex-auto">
                    <Passsword
                      placeholder="Enter your Confirm Password"
                      {...firstFormRegister("cpassword", {
                        required: "ConfirmPassword is required",
                        validate: {
                          checkMatching: (value) => {
                            const { password } = getValues();
                            return (
                              password == value ||
                              "Password And Confirm Password doesn't match"
                            );
                          },
                        },
                      })}
                    />
                  </div>
                  {firstFormErrors?.cpassword && (
                    <ErrorMessage
                      text={String(firstFormErrors?.cpassword?.message)}
                    />
                  )}
                </div>

                <div className="text-end next-button">
                  <button
                    onClick={handleFirstFormSubmit(firstFormOnSubmit)}
                    className={`border-2 px-8 my-3 py-1 rounded-3xl ${
                      firstFormErrors?.password ||
                      firstFormErrors?.cpassword ||
                      firstFormErrors?.userName ||
                      firstFormErrors?.email ||
                      firstFormErrors?.firstName ||
                      firstFormErrors?.lastName
                        ? "text-gray-500 border-slate-900 bg-green-950 "
                        : "border-gray-50 text-gray-50 bg-green-800"
                    }`}
                  >
                    <p className="flex items-center justify-center">
                      Next <MdNavigateNext />
                    </p>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="phone-input my-4 flex items-center">
                  <div className="flex-auto">
                    <Input
                      type="phone"
                      placeholder="Enter your phone"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value:
                            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                          message: "Invalid phone Format",
                        },
                      })}
                      children={<MdOutlinePhoneAndroid />}
                    />
                  </div>
                  {errors?.phone && (
                    <ErrorMessage text={String(errors?.phone?.message)} />
                  )}
                </div>

                <div className="flex items-center">
                  <div className="flex-auto">
                    <ReactFlagsSelect
                      selected={selected}
                      onSelect={(code) => setSelected(code)}
                      searchable
                      searchPlaceholder="Search countries"
                      selectButtonClassName="menu-flags-button"
                      selectedSize={14}
                      optionsSize={14}
                    />
                  </div>
                  {countryError && <ErrorMessage text={String(countryError)} />}
                </div>

                <div className="gender input flex items-center">
                  <div className="flex-auto">
                    <div className="flex items-center">
                      <label className="py-4 ms-2 text-lg font-medium text-gray-50">
                        <p>Gender </p>
                      </label>
                      <div className="flex">
                        <div className="flex items-center ps-4 border-b-2 mx-8 border-gray-200 rounded dark:border-gray-700">
                          <input
                            id="bordered-radio-1"
                            type="radio"
                            value="female"
                            {...register("gender", {
                              required: "gender is required",
                            })}
                          />
                          <label
                            htmlFor="bordered-radio-1"
                            className="w-full py-4 ms-2  font-medium text-gray-50 pr-5"
                          >
                            Female
                          </label>
                        </div>
                        <div className="flex items-center ps-4 border-b-2 border-gray-200 rounded dark:border-gray-700">
                          <input
                            id="bordered-radio-2"
                            type="radio"
                            value="male"
                            {...register("gender", {
                              required: "gender is required",
                            })}
                          />
                          <label
                            htmlFor="bordered-radio-2"
                            className="w-full py-4 ms-2  font-medium text-gray-50 pr-5"
                          >
                            Male
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {errors?.gender && (
                    <ErrorMessage text={String(errors?.gender?.message)} />
                  )}
                </div>

                <div className="image-input my-4 items-center">
                  <div className="text-start flex items-center">
                    <div className="flex-auto">
                      <label
                        className="block mb-2  font-medium text-white"
                        htmlFor="profileImage"
                      >
                        <span className="flex items-center">
                          <span className="text-lg mr-2">
                            <CgProfile />
                          </span>
                          Profile Image
                        </span>
                      </label>
                      <input
                        className="w-full text-white font-medium  border-b-2 rounded-md cursor-pointer bg-transparent "
                        id="profileImage"
                        type="file"
                        {...register("image", {
                          required: "image is required",
                        })}
                      />
                    </div>
                    {errors?.image && (
                      <ErrorMessage text={String(errors?.image?.message)} />
                    )}
                  </div>
                </div>

                <div className="text-end perv-button">
                  <button
                    onClick={handlePrevStep}
                    className="border-2 border-gray-50  bg-green-800 px-8 my-3 py-1 rounded-3xl text-gray-50"
                  >
                    <p className="flex items-center justify-center">
                      <GrFormPrevious />
                      Prev
                    </p>
                  </button>
                </div>
                {isLoading ? (
                  <button
                    type="submit"
                    className="text-white border-2  border-slate-900 hover:border-gray-50 bg-main hover:bg-blue-950 focus:ring-4 focus:outline-none px-8 my-3 py-2 rounded-3xl hover:text-gray-50 duration-500 focus:ring-blue-300 font-medium flex items-center justify-center text-sm  w-full text-center"
                  >
                    <span>
                      <ImSpinner9 className="text-center animate-spin" />
                    </span>
                  </button>
                ) : (
                  <Button text="Register" />
                )}
              </>
            )}

            <div className="flex justify-between">
              <p>
                have an account ?
                <Link to={"/auth/login"}>
                  <span className="underline mx-2">Log in Now</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
