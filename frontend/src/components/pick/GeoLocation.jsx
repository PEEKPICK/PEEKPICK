import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { locationActions } from "../../store/locationSlice";

const GeoLocation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("위치 가져오기");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 위치값을 Redux store에 저장합니다.
          dispatch(
            locationActions.updateLoc({
              memberId: 5,
              point: {
                x: position.coords.longitude,
                y: position.coords.latitude,
              },
              distance: 10000,
            })
          );
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [dispatch]);
};
export default GeoLocation;
