import { MdOutlineMailOutline } from "react-icons/md";
import Button from "../../../SharedModules/Components/Button/Button";
import Input from "../../../SharedModules/Components/Input/Input";
import Passsword from "../../../SharedModules/Components/Password/Passsword";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../SharedModules/Components/ErrorMessage/ErrorMessage";
import postDataHock from "../../../Utls/HockForPostData";

export default function ResetPassword() {
  const {postData,isLoading}=postDataHock();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const onSubmit = (data: any) => {
    postData(data,"auth/reset-password","/auth")
  };
  return (
    <div className="h-screen text-white flex items-center justify-center text-center">
      <div className="w-full ">
        <div className="w-[100%] flex items-center justify-center">

          <form onSubmit={handleSubmit(onSubmit)} className="w-5/6 lg:w-3/4">
            <h2 className="text-2xl my-3 font-semibold">Reset password</h2>
            <div className="email-input  flex items-center ">
              <div className="w-[98%]">
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Invalid Email Format",
                    },
                  })}
                  placeholder="Enter your email"
                  children={<MdOutlineMailOutline />}
                />
              </div>
              {errors?.email && (
                <ErrorMessage text={String(errors?.email?.message)} />
              )}
            </div>
            <div className="otp-input my-4 flex items-center">
              <div className="w-[98%]">
                <Input
                  type="text"
                  {...register("forgetCode", {
                    required: "OTP is required",
                  })}
                  placeholder="Enter your otp"
                  children={<MdOutlineMailOutline />}
                />
              </div>
              {errors?.otp && (
                <ErrorMessage text={String(errors?.otp?.message)} />
              )}
            </div>

            <div className="password-input my-4 flex items-center">
              <div className="w-[98%]">
                <Passsword
                  placeholder="Enter your Password"
                  {...register("password", {
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
              {errors?.password && (
                <ErrorMessage text={String(errors?.password?.message)} />
              )}
            </div>
            <div className="confirm-pass input my-4 flex items-center">
              <div className="w-[98%]">
                <Passsword
                  placeholder="Enter your Confirm Password"
                  {...register("cpassword", {
                    required: "ConfirmPassword is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/,
                      message: `The Confirm Password must include at least one lowercase letter,
                one uppercase letter, one digit, one special character,
                and be at least 6 characters long!!`,
                    },
                    validate: {
                      checkConfirmationPassHandler: (value) => {
                        const { password } = getValues();
                        return (
                          password === value ||
                          "Password And ConfirmPassword doesn't match"
                        );
                      },
                    },
                  })}
                />
              </div>
              {errors?.confirmPassword && (
                <ErrorMessage text={String(errors?.confirmPassword?.message)} />
              )}
            </div>
            {isLoading?<Button text="lodaing" />:<Button text="Reset" />}
          </form>
        </div>
      </div>
    </div>
  );
}
