// list of apiCalls
const apiCalls = {
  // log the user in
  login: async (email, password) => {
    const call = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACK}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await call.json();
    return data;
  },
  // get user data
  getUser: async (id) => {
    const call = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACK}/users/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await call.json();
    return data;
  },
  // add money to wallet
  addMoney: async (amount, wallet, token) => {
    const call = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACK}/transactions/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, address: wallet }),
      }
    );
    const data = await call.json();
    return data;
  },
};

export default apiCalls;
