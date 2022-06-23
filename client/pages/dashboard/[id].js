import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import TransactionBox from "../../components/TransactionBox";
import ShowHide from "../../components/showHide";
import AddMoneyModal from "../../components/AddMoneyModal";

import apiCalls from "../../apiCalls/apiCalls";

import useSessionStorage from "../../hooks/useSessionStorage";
import { useRouter } from "next/router";
import Link from "next/link";

import Header from "../../components/Header";

import dashboardStyles from "../../styles/Dashboard.module.css";

export default function Dashboard({ userFetched }) {
  const dolarDivision = 500;
  const router = useRouter();
  const { storedValue, setValue } = useSessionStorage("user", null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showData, setShowData] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const [user, setUser] = useState(userFetched);

  const fetchUser = async (id) => {
    const userResp = await apiCalls.getUser(id);
    return setUser(userResp.user);
  };

  // loading effect
  useEffect(() => {
    setLoading(false);
    setUser(userFetched);
  }, []);

  // check if there is a user in the session
  useEffect(() => {
    if (storedValue && storedValue.id === user.id) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      setValue(null);
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
          {loggedIn && storedValue && (
            <>
              <div>Foto transacciones</div>
              <div className={dashboardStyles.balancesContainer}>
                <p className={dashboardStyles.balance}>
                  {showData ? user.balance : "***"} DOGE
                </p>
                <p className={dashboardStyles.balanceDolar}>
                  ${showData ? user.balance / dolarDivision : "***"}
                </p>
              </div>
              <div className={dashboardStyles.buttonsContainer}>
                <Button variant="info" onClick={() => setModalShow(true)}>
                  Send
                </Button>
                <Button variant="info">Receive</Button>
              </div>
              <AddMoneyModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                address={user.address}
                fetchUser={fetchUser}
              />
              <ShowHide showData={showHide} />
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
            {user.transactions.map((transaction, i) => {
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

export async function getServerSideProps(context) {
  const userFetched = await apiCalls.getUser(context.params.id);
  return {
    props: {
      userFetched: userFetched.user,
    },
  };
}
