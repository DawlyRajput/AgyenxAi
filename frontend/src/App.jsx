import React from "react";
import Home from "./pages/Home";
import { useEffect } from "react";
import { getCurrentUser } from "./features/getCurrentUser.js";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
       const data = await getCurrentUser();
       dispatch(setUserData(data));
      } catch (error) {
        console.error("Error fetching current user:", error.response?.data || error.message);
      }
    };

    getUser();
  }, []);

 return (
    <>
      <Home />
    </>
  );
}

export default App;
