import { Link } from "react-router-dom";
import style from "./BackToHomeBtn.module.css";
export default function BackToHomeBtn() {
  return (
    <div>
        <Link to={'/'}>
      <button className={style.gg}>Back to Home</button>
        </Link>
    </div>
  );
}
