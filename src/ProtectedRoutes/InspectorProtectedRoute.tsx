import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

interface prop{
    children:ReactNode
}
export default function InspectorProtectedRoute({children}:prop) {

    const {data}=useSelector((state:any)=>state.authReducer);
    if (data?.id &&data?.role=="Inspector") {
        return children;
    }else{
        return <Navigate to="/auth"/>
    }
}
