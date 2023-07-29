import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";

const Redirect = () => {
  const params = useParams();

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("jwtToken", params.token);
    window.location.replace("/")
  }, []);

  return <></>;
}

export default Redirect;