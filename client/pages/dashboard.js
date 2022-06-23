import React, { useEffect, useState } from "react";

import useSessionStorage from "../hooks/useSessionStorage";
import { useRouter } from "next/router";

import Header from "../components/Header";

export default function Dashboard() {
  const router = useRouter();
  const { storedValue, setValue } = useSessionStorage("user", null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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
    setLoggedIn(false);
    setValue(null);
  };

  return (
    <>
      <Header logged={loggedIn} handleLogout={handleLogout} />
      {/* if logged show the dashboard */}
      {loading && <p>Loading...</p>}
      {loggedIn ? (
        <>
          <h2>Welcome {storedValue.username}</h2>
        </>
      ) : (
        !loading && (
          <>
            <h2>Your are logged out</h2>
            <p>
              If you would like to access, you need to{" "}
              <a onClick={() => router.push("/login")}>login</a>
            </p>
          </>
        )
      )}
    </>
  );
}
