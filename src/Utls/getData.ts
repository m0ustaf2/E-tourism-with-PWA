import axios from "axios";
import { baseUrl } from "./BaseUrl";

export const getAllCities=(path:string,fn:([])=>void)=>{
    axios.get(`${baseUrl}${path}/`).then((res)=>{
      fn(res.data.cities||res.data.touristDestinations)
    }).catch((err)=>{
      console.log(err);
      
    })
  }