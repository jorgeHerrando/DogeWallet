import headerStyles from "./Header.module.css";

export default function Header({ logged, handleLogout }) {
  return (
    <div className={headerStyles.headerContainer}>
      <p>Este el el header</p>
      {logged && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}
