import { ThreeDots } from 'react-loader-spinner';
import css from './LoaderSpinner.module.css'

export const LoaderSpinner = () => {
  return <div className={css.loaderBackdrop}>
  <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#303f9f" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />;
  </div>
};

