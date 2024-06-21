import { FaRegEdit } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import styles from './CityCard.module.css';
interface Prop{
    name:string;
    image:string;
    modalDelete:()=>void;
    modalUpdate:()=>void;
}

export default function CityCard({name,image,modalDelete,modalUpdate}:Prop) {
  return (
    <>
  
<div className={`${styles.ag_courses_item}`}>
      <div  style={{backgroundImage: "url(" + `${image}` + ")"}} className={styles.ag_courses_item_link}>
        <div className={styles.ag_courses_item_bg}  />
        <div className={`text-white ${styles.ag_courses_item_title}`}>
          {name}
        </div>
        <div className={` flex items-center ${styles.ag_courses_item_date_box}`}>
        <FaRegEdit onClick={modalUpdate}  className={styles.edit}/>
          <span className={` ${styles.ag_courses_item_date}`}>
          <FaTrashCan onClick={modalDelete}  className={` mx-2 ${styles.del}`} />
          </span>
        </div>
      </div>
    </div>


    </>
  )
}
