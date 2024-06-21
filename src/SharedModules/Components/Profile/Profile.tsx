import { useSelector } from "react-redux";


export default function Profile() {
  const { data } = useSelector((state: any) => state.authReducer);
  
  return (
    <>
    <div className="flex justify-center items-center h-[91vh] bg-sky-100">
      <div className="max-w-sm rounded  shadow-lg bg-white p-4 mx-auto relative ">
      <img className="w-40 h-40 rounded-full mx-auto  border-4 border-white shadow-md" src={data?.image} alt={`${data?.userName}'s profile`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">UserName: {`${data?.firstName} ${data?.lastName}`}</div>
        <p className="text-gray-700 text-base">Role: {data?.role}</p>
        <p className="text-gray-700 text-base">Mail: {data?.email}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#profile</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{data?.role}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
    </div>
    </div>
    
    </>
  )
}
