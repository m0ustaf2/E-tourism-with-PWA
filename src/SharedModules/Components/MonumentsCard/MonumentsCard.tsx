import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import styles from "../CityCard/CityCard.module.css";
interface Image {
  public_id: string;
  secure_url: string;
}
interface SubImage extends Image {
  _id: string;
}
interface City {
  _id: string;
  name: string;
  image: Image;
  id: string;
}
interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  _id: string;
}
interface Monument {
  image: Image;
  _id: string;
  cityId: City;
  type: string;
  name: string;
  description: string;
  location: string;
  ticketPrice: string;
  subImages: SubImage[];
  createdBy: string;
  customId: string;
  openingHours: OpeningHours;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: any[];
  id: string;
}
interface Prop {
  monument: Monument;
  openDeleteModal:(cityId:string,id:string)=>void;
  openUpdateModal:(cityId:string,id:string)=>void;
}

export default function MonumentsCard({ monument,openDeleteModal,openUpdateModal }: Prop) {

  return (
    <>
      <div className="">
        <div className={`${styles.ag_courses_item}`}>
          <div
            style={{ backgroundImage: "url(" + `${monument?.image?.secure_url}` + ")" }}
            className={styles.ag_courses_item_link}
          >
            <div className={styles.ag_courses_item_bg} />
            <div className={`text-white ${styles.ag_courses_item_title}`}>
              {monument?.name}
            </div>
            <div
              className={` flex items-center ${styles.ag_courses_item_date_box}`}
            >
              <button onClick={()=>{openUpdateModal(monument?.cityId?.id,monument?._id)}}><FaRegEdit className={styles.edit} /></button>
              <button onClick={()=>{openDeleteModal(monument?.cityId?._id,monument?._id)}} className={` ${styles.ag_courses_item_date}`}>
                <FaTrashCan className={` mx-2 ${styles.del}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
