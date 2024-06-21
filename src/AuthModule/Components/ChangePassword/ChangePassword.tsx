import axios from "axios";
import { baseUrl } from "../../../Utls/BaseUrl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner9 } from "react-icons/im";
import ErrorMessage from "../../../SharedModules/Components/ErrorMessage/ErrorMessage";
import Passsword from "../../../SharedModules/Components/Password/Passsword";
import { logOut } from "../../../Redux/AuthSlice/AuthSlice";
interface prop{
  handleClose:()=>void;
}
export default function ChangePassword({handleClose}:prop) {
  const [isLoading, setIsLoading] = useState(false);
  const { headers } = useSelector((state: any) => state.authReducer);
const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    setIsLoading(true);
    axios
      .patch(`${baseUrl}auth/change-password`, data, headers)
      .then((response) => {
        toast.success(response?.data?.message);
        handleClose()
        dispatch(logOut())
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center  md:px-5  rounded-t">
        <h3 className="text-lg font-semibold text-main">
          Change Password
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-5 md:pb-2">
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <label
              htmlFor="oldPassword"
              className="block mb-2 text-sm font-medium text-main "
            >
              Old Password
            </label>
            <div className="flex items-center">
              <div className="flex-auto">
                <Passsword
                  {...register("oldPassword", {
                    required: "Old Password is required",
                    pattern: {
                      value:
 /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/,
                      message: `The password must include at least one lowercase letter,
                      one uppercase letter, one digit, one special character,
                      and be at least 6 characters long!!`,
                    },
                  })}
                  placeholder="Enter Old Password"
                />
              </div>
              {errors?.oldPassword && (
                <ErrorMessage text={String(errors?.oldPassword?.message)} />
              )}
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-main "
            >
              New Password
            </label>
            <div className="flex items-center">
              <div className="flex-auto">
                <Passsword
                  {...register("newPassword", {
                    required: "New Password is required",
                    pattern: {
                      value:
 /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/,
                      message: `The New Password must include at least one lowercase letter,
                      one uppercase letter, one digit, one special character,
                      and be at least 6 characters long!!`,
                    },
                  })}
                  placeholder="Enter New Password"
                />
              </div>
              {errors?.newPassword && (
                <ErrorMessage text={String(errors?.newPassword?.message)} />
              )}
            </div>
          </div>
          <div className="col-span-2">
            <label
              htmlFor="cpassword"
              className="block mb-2 text-sm font-medium text-main "
            >
              Confirm Password
            </label>
            <div className="flex items-center">
              <div className="flex-auto">
                <Passsword
                  {...register("cpassword", {
                    required: "Confirm Password is required",
                    pattern: {
                      value:
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/,
                      message: `The Confirm password must include at least one lowercase letter,
                      one uppercase letter, one digit, one special character,
                      and be at least 6 characters long!!`,
                    },
                  })}
                  placeholder="Enter Confirm Password"
                />
              </div>
              {errors?.cpassword && (
                <ErrorMessage text={String(errors?.cpassword?.message)} />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={
            `text-white bg-main hover:bg-blue-950 focus:ring-4  font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center inline-flex items-center duration-500` +
            (isLoading ? " disabled" : " ")
          }
        >
          {isLoading == true ? (
            <ImSpinner9 className="animate-spin" />
          ) : (
            <>Change Password</>
          )}
        </button>
      </form>
    </>
  );
}
