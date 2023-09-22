/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useRedirectActiveUser = (user, path) => {
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate(path);
  }, [user]);
};
