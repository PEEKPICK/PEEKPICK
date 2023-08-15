import { useEffect } from "react";

const Redirect = () => {
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");

    if (token !== null) {
      localStorage.setItem("jwtToken", token);
      window.location.replace("/");
    }
  }, []);

  return <></>;
};

export default Redirect;