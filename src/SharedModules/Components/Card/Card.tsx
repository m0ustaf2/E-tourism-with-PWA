import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface museum {
  monument: {
    name: string;
    description: string;
    image: {
      secure_url: string;
    };
    destinationID: string;
    cityId: {
      _id: string;
    };
    _id: string;
  };
}

const Card = ({ monument }: museum) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <article className="card overflow-hidden rounded-2xl grid  shadow-lg h-[100vh]  ">
      <div>
        <img
          className="card__background w-full h-[100%]"
          src={monument?.image?.secure_url}
          alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
        />
      </div>
      <div className="card__content | flow">
        <div className="card__content--container | flow p-2">
          <h2 className="card__title text-white text-lg">{monument?.name}</h2>
          <p className="card__description text-white mt-3 text-md">
            {monument?.description?.split(",").slice(0,5).join(",")}
          </p>
        </div>
        <button
          onClick={() => {
            navigate(
              `${`/museums/${monument?.cityId?._id}/destination/${monument?._id}`}`
            );
          }}
          className="card__button"
        >
          {t("Read more")}
        </button>
      </div>
    </article>
  );
};

export default Card;
