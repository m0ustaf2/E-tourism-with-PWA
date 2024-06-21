import { useForm } from "react-hook-form";
import { MdOutlineMailOutline } from "react-icons/md";
import Button from "../../../SharedModules/Components/Button/Button";
import ErrorMessage from "../../../SharedModules/Components/ErrorMessage/ErrorMessage";
import Input from "../../../SharedModules/Components/Input/Input";
import postDataHock from "../../../Utls/HockForPostData";

interface data{
  email:string
}

export default function SendResetPasswordCode() {
const {postData,isLoading}=postDataHock();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  



  const onSubmit = (data: data|any) => {
    postData(data,"auth/send-code","/auth/reset-password")
  };
  return (
    <div className="h-screen text-white flex items-center justify-center text-center">
      <div className="w-full ">
        <div className="w-[100%] flex items-center justify-center">

          <form onSubmit={handleSubmit(onSubmit)} className="w-5/6 lg:w-3/4">
            <h2 className="text-2xl my-3 font-semibold">Forget password</h2>
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
            {isLoading?<Button text="Loading" />:<Button text="Send" />}
          </form>
        </div>
      </div>
    </div>
  );
}
