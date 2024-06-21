import { Footer } from "flowbite-react";

export default function Footerr() {
  return (
    <>
    <div className="bg-main py-[2px]">
      <Footer container className="bg-main text-white">
        <div className="w-full text-center">
          <Footer.Copyright className="text-white" by="Egypt-Here™" year={2024} />
        </div>
      </Footer>
    </div>
    </>
  );
}
