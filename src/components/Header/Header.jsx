import css from "./Header.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setIsModalLogoutOpen } from "../../redux/global/globalSlice";
import { selectUser } from "../../redux/session/selectors";

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleOpenModalLogout = () => {
    dispatch(setIsModalLogoutOpen(true));
    document.body.style.overflow = "hidden";
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <div className={css.logoWrapper}>
          <img className={css.logo} src="/assets/icon-wallet.jpg" />
          <p className={css.appName}>PennyTracker</p>
        </div>
        <div className={css.nav}>
          <p className={css.userName}>{user.email}</p>
          <div className={css.boxExit} onClick={handleOpenModalLogout}>
            <img className={css.iconExit} src="/assets/icon-exit-doors.svg" />
            <p className={css.textExit}>Exit</p>
          </div>
        </div>
      </div>
    </div>
  );
};
