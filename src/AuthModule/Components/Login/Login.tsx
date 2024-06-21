import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "../../../SharedModules/Components/Button/Button";
import Input from "../../../SharedModules/Components/Input/Input";
import { useForm } from "react-hook-form";
import Passsword from "../../../SharedModules/Components/Password/Passsword";
import ErrorMessage from "../../../SharedModules/Components/ErrorMessage/ErrorMessage";
import postDataHock from "../../../Utls/HockForPostData";
import { ImSpinner9 } from "react-icons/im";
interface LoginData {
  email: string;
  password: string;
}
export default function Login() {
  const { isLoading, postData } = postDataHock();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: LoginData | any) => {
    postData(data, "auth/login", "/dashboard");
  };

  return (
    <div className="h-screen text-white flex items-center justify-center text-center">
      <div className="w-full ">
        <div className="w-[100%] flex items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="w-5/6 lg:w-3/4">
            <h2 className="text-2xl my-3 font-semibold">Log in</h2>

            <div className="email-input flex items-center mt-8">
              <div className="w-[98%]">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Invalid Email Format",
                    },
                  })}
                >
                  <MdOutlineMailOutline />
                </Input>
              </div>
              {errors?.email && (
                <ErrorMessage text={String(errors?.email?.message)} />
              )}
            </div>

            <div className="password-input flex items-center my-3">
              <div className="w-[98%]">
                <Passsword
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
                  placeholder="Enter your Password"
                />
              </div>
              {errors?.password && (
                <ErrorMessage text={String(errors?.password?.message)} />
              )}
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
              <Button text="Log in" />
            )}

            <div className="flex justify-between">
              <p>
                Don't have an account ?
                <Link to={"/auth/register"}>
                  <span className="underline mx-2">Register Now</span>
                </Link>
              </p>
              <p>
                <Link to={"/auth/send-code"}>
                  <span className="underline mx-2">Forget Password?</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
