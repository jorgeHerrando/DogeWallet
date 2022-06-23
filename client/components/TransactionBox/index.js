import moment from "moment";

import transactionBoxStyles from "./TransactionBox.module.css";

export default function TransactionBox({ transaction }) {
  const dolarDivision = 500;
  return (
    <div className={transactionBoxStyles.transactionContainer}>
      <div className={transactionBoxStyles.transactionTime}>
        {moment(transaction.date).format("MMMM DD, YYYY")}
      </div>
      <div className={transactionBoxStyles.transactionBox}>
        <div>{transaction.amount}</div>
        <div>{transaction.amount / dolarDivision}</div>
        <div>{moment(transaction.date).format("hh:mm A")}</div>
      </div>
    </div>
  );
}
