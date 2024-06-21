
interface Text {
  text: string;
}
export default function Button({ text}: Text) {
  return (
    <>
      <div className="mt-">
        <button
          type="submit"
          className="text-white border-2  border-slate-900 hover:border-gray-50 bg-main hover:bg-blue-950 focus:ring-4 focus:outline-none px-8 my-3 py-1 rounded-3xl hover:text-gray-50 duration-500 focus:ring-blue-300 font-medium  text-sm  w-full text-center"
        >
          {text}
        </button>
      </div>
    </>
  );
}
