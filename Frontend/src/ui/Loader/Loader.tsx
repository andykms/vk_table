import style from './Loader.module.scss';


export const Loader = () => {
  return (
    <div className={style.loaderContainer}>
      <span className={style.loader}></span>
    </div>
  );
};