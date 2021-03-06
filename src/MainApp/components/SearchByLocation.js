import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import get from "lodash/get";
import { updateLocation } from "../../Redux/features/locationSlice";
import myLocation from "../../assets/my-location.png";
import { updateLoadingStatus } from "../../Redux/features/loaderSlice";

export const SearchByLocation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    gotoCurrentLocation();
  }, []);

  const showPosition = (arg) => {
    const latitude = get(arg, "coords.latitude");
    const longitude = get(arg, "coords.longitude");
    if (latitude && longitude) {
      dispatch(updateLocation({ latitude, longitude }));
    }
    dispatch(updateLoadingStatus(false));
  };

  const posError = (err) => {
    console.log(err);
    alert(
      "Please allow the browser to access your location or you can also search it manually."
    );
    dispatch(updateLoadingStatus(false));
  };

  const gotoCurrentLocation = () => {
    if (navigator.geolocation) {
      dispatch(updateLoadingStatus(true));
      navigator.geolocation.getCurrentPosition(showPosition, posError);
    } else {
      dispatch(updateLoadingStatus(false));
      alert("Sorry, geolocation is not supported by this browser");
    }
  };

  return (
    <div className="my-location-pointer" onClick={gotoCurrentLocation}>
      <img src={myLocation} alt={"my-location"} />
    </div>
  );
};
