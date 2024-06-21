import { useTranslation } from 'react-i18next';
import ammon from '../../../assets/Through the desert-bro.svg';
import { useSelector } from 'react-redux';
export default function Header() {
  const { t, i18n } = useTranslation();
  const { data } = useSelector((state: any) => state.authReducer);
  return (
    <div dir={i18n.language == "ar" ? "rtl" : "ltr"} className="header-content mx-2 rounded-lg my-3">
       <div className="ml-5 p-5">
       <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 align-items-center ">
           
            <div className='lg:col-span-2  flex items-center'>
              <div>
              <h3 className='text-white text-2xl font-medium'>
                {t("Welcome")} <span className='text-slate-500'>{`, ${data?.firstName} ${data?.lastName}`}</span>
                </h3>
              <p className='text-white'>
                {t("This is a welcoming screen for the entry of the application , you can now see the options")}
              </p>
              </div>
            </div>

            <div>

            </div>

            <div className='flex justify-end'>
              <img className="w-44" src={ammon} alt="header"/>
            </div>
          
        </div>
       </div>
      </div>
  )
}
