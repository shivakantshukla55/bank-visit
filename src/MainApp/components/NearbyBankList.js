import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setBanklist } from "../../Redux/features/banklistSlice";

export const NearbyBankList = () => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useSelector((state) => state.location);
  const { bankList = [] } = useSelector((state) => state);

  const getbanksNearby = () => {
    axios
      .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
        params: {
          location: latitude + "," + longitude,
          radius: 1000,
          type: "bank",
          name: "hdfc",
          keyword: "bank",
          key: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          const {
            data: { results = [] },
          } = res;
          dispatch(setBanklist(results));
        }
      })
      .catch((err) => {
        console.log(err, "Err");
      });
  };

  useEffect(() => {
    getbanksNearby();
  }, [latitude, longitude]);

  return (
    <>
      {Array.isArray(bankList) && bankList.length > 0 ? (
        <ul className="banklist">
          {bankList.map((eachBank) => {
            return (
              <li key={eachBank.place_id}>
                <p>Hdfc Bank</p>
                <div>{eachBank.vicinity}</div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Banks not found nearby</p>
      )}
    </>
  );
};