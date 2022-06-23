import moment from "moment";

import transactionBoxStyles from "./TransactionBox.module.css";

export default function TransactionBox({ transaction, show }) {
  const dolarDivision = 500;
  return (
    <div className={transactionBoxStyles.transactionContainer}>
      <div className={transactionBoxStyles.transactionTime}>
        {moment(transaction.date).format("MMMM DD, YYYY")}
      </div>
      <div className={transactionBoxStyles.transactionBox}>
        <div className={transactionBoxStyles.transactionBoxLeft}>
          <div className={transactionBoxStyles.downloadImgContainer}>
            <img src="/img/icons/download.png" alt="download" />
          </div>
          <div className={transactionBoxStyles.transactionReceivedContainer}>
            <p>Received</p>
            <p>Received at {moment(transaction.date).format("hh:mm A")}</p>
          </div>
        </div>
        <div className={transactionBoxStyles.transactionBoxRight}>
          <p>+{show ? transaction.amount : "***"} DOGE</p>
          <p>+${show ? transaction.amount / dolarDivision : "***"}</p>
        </div>
      </div>
    </div>
  );
}
