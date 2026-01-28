import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    
    if (authStatus === undefined) return;

    if (authentication && authStatus === false) {
      navigate("/login");
    } else if (!authentication && authStatus === true) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, authentication, navigate]);

  if (loader) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return <>{children}</>;
}
