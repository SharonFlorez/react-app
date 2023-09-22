import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";

const LayoutPrivate = () => {
  const { user } = useUserContext();

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default LayoutPrivate;
