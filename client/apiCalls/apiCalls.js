const apiCalls = {
  login: async (email, password) => {
    const call = await fetch(`http://localhost:3001/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await call.json();
    return data;
  },
};

export default apiCalls;
