import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "./BaseUrl";
import { useDispatch } from "react-redux";
import { login } from "../Redux/AuthSlice/AuthSlice";

 const postDataHock =()=>{

    const [isLoading, setIsLoading] = useState<boolean>();
    const navigate =useNavigate();
    const dispatch =useDispatch();
  
    const postData=(formData:any,endPoint:string,navigateTo:string):any=>{
        setIsLoading(true);
        axios.post(`${baseUrl}${endPoint}`,formData).then((res)=>{
          if(res?.data?.accessToken){
            if (endPoint.split("/")[1]=="login") {
              localStorage.setItem("userData",JSON.stringify(res.data));
              dispatch(login());
            };
            if (res.data.aboutUser.role=="User") {
              toast.success(res.data.message);
              return navigate("/home");
            };
            if (res.data.aboutUser.role=="Inspector") {
              toast.success(res.data.message);
              return navigate("/inspector");
            };
          }

         
          
        toast.success(res.data.message);
        navigate(navigateTo);

      })
      .catch((err)=>{

        toast.error(err.response.data.message||"Network Error");
        console.log(err);


      }).finally(()=>{
        setIsLoading(false);
      })
    };

    return {postData,isLoading};
};

export default postDataHock;