import React, { useEffect } from "react";
// import classes from "./Finder.module.css";
// import Modal from "react-modal";
import { customAxios } from "../../api/customAxios";
import Geolocation from "./GeoLocation";

function Finder() {
  useEffect(() => {
    console.log("wo렌더링");
    emojiCall();
  }, []);

  const emojiCall = () => {
    customAxios
      .get("/posts")
      .then((response) => {
        const data = response.data.data.data;
        const code = response.data.data.code;
        console.log("data:", data);
        console.log("code:", code);
      })
      .catch((error) => {
        console.error("API 요청 실패:", error);
      });
  };

  return (
    <div>
      <Geolocation />
    </div>
  );
}

export default Finder;
