import React, { useEffect, useState } from "react";
import TransactionBox from "../components/TransactionBox";
import ShowHide from "../components/showHide";

import useSessionStorage from "../hooks/useSessionStorage";
import { useRouter } from "next/router";
import Link from "next/link";

import Header from "../components/Header";

import dashboardStyles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const router = useRouter();
  const { storedValue, setValue } = useSessionStorage("user", null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showData, setShowData] = useState(false);

  // loading effect
  useEffect(() => {
    setLoading(false);
  }, []);

  // check if there is a user in the session
  useEffect(() => {
    if (storedValue) {
      setLoggedIn(true);
    }
  }, [storedValue]);

  // logout
  const handleLogout = () => {
    router.push("/login");
    // setLoggedIn(false);
    setValue(null);
  };

  const showHide = () => {
    setShowData(!showData);
  };

  return (
    <>
      <Header logged={loggedIn} handleLogout={handleLogout} />
      {/* if logged show the dashboard */}
      <div className={dashboardStyles.dashboardContainer}>
        <div className={dashboardStyles.dashboardTopContainer}>
          {loading && <p>Loading...</p>}
          {loggedIn && (
            <>
              <div>
                Foto transacciones
                <ShowHide showData={showHide} />
              </div>
              <div className={dashboardStyles.buttonsContainer}>botones</div>
            </>
          )}
          {!loading && !loggedIn && (
            <>
              <h2>Your are logged out</h2>
              <p>
                If you would like to access, you need to{" "}
                <Link href="/login">
                  <span className={dashboardStyles.loginLink}>login</span>
                </Link>
              </p>
            </>
          )}
        </div>
        {loggedIn && storedValue && (
          <>
            {storedValue.transactions.map((transaction, i) => {
              return (
                <TransactionBox
                  transaction={transaction}
                  show={showData}
                  key={i}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
