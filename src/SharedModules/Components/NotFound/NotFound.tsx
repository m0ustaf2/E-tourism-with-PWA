import notFound from "../../../assets/404 Error Page not Found with people connecting a plug-pana.svg";
import BackToHomeBtn from "../BackToHomeBtn/BackToHomeBtn";

export default function NotFound() {
  return (
    <div className="h-screen text-center">
      <div className="image-container flex justify-center items-center relative">
        <img
          className="h-screen w-fit object-cover"
          src={notFound}
          alt="notfound-img"
        />
        <div className="button-container absolute inset-x-0 bottom-10 flex justify-center items-center">
          <BackToHomeBtn />
        </div>
      </div>
    </div>
  );
}
