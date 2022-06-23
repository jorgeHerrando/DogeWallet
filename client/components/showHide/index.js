import showHideStyles from "./ShowHide.module.css";

export default function showHide({ showData }) {
  return (
    <div className={showHideStyles.showButton} onClick={() => showData()}>
      <img src="/img/icons/hidden.png" alt="showButton" />
    </div>
  );
}
