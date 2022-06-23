import Button from "react-bootstrap/Button";
import headerStyles from "./Header.module.css";

export default function Header({ logged, handleLogout }) {
  return (
    <header className={headerStyles.headerContainer}>
      <div className={headerStyles.innerHeader}>
        {logged && (
          <div className={headerStyles.logoutContainer}>
            <div className={headerStyles.logoutArrow}>
              <a onClick={handleLogout}>
                <img src="/img/icons/arrowLeft.png" alt="logout" />
              </a>
            </div>
            <Button
              variant="secondary"
              onClick={handleLogout}
              className={headerStyles.logoutButton}
            >
              {" "}
              Logout
            </Button>
          </div>
        )}

        <div
          className={`${headerStyles.titleContainer} ${
            !logged ? headerStyles.titleContainerNotLogged : ""
          }`}
        >
          <div className={headerStyles.dogeCoinIcon}>
            <img src="/img/icons/dogecoin.png" alt="dogecoin" />
          </div>
          <h1>DogeCoin</h1>
        </div>
        <div className={headerStyles.settingsIconContainer}>
          <div className={headerStyles.settingsIcon}>
            <img src="/img/icons/settingsIcon.png" alt="settings" />
          </div>
        </div>
      </div>
    </header>
  );
}
