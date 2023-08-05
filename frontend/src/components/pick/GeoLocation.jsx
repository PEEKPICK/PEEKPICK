import { locationActions } from "../../store/locationSlice";
import { useDispatch } from "react-redux";

export const GeoLocation = () => {
  const dispatch = useDispatch();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 위치값을 Redux store에 저장합니다.
        dispatch(
          locationActions.updateLoc({
            point: {
              x: position.coords.longitude,
              y: position.coords.latitude,
            },
            distance: 10000000,
          })
        );
      },
      (error) => {
        console.error(error);
      }
    );
  } else {
    console.error("위치 못가져왔는디");
  }
};
