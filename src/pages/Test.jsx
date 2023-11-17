import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForecastData } from "../redux/actions/weatherActions";
const Test = () => {
  const [region, setRegion] = useState("jakarta");
  const dispatch = useDispatch();

  const { current, location } = useSelector((state) => state.forecast);

  useEffect(() => {
    const customRegion = region.replace(/\s/g, "");
    dispatch(getForecastData(customRegion));
  }, [dispatch, region]);

  return (
    <div className="container mx-auto">
      <div
        className=" min-h-screen flex flex-col items-center justify-center p-3"
        style={{
          backgroundImage: `url(/bg.jpg`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Input Your Location"
          className="border rounded-md p-1 font-semibold text-gray-500 mb-2"
        ></input>
        <div className="bg-gray-500 bg-opacity-70 rounded shadow p-8 w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-xl font-bold mb-4 text-white">
            {location.name}
            <br />
            {location.country}, {location.region}
          </h1>

          {current?.condition && (
            <>
              <p className="text-white">
                Lat: {location.lat} | Long:
                {location.lon}
              </p>
              <p className="text-white mb-4">
                Last Update : {current.last_updated.slice(11, 16)}
              </p>
            </>
          )}

          <div className="border-t border-gray-300 my-4"></div>

          <div className="flex justify-around items-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
              {current?.temp_c}°C / {current?.temp_f}°F
            </h2>
            <p className="text-white">
              {current?.condition && (
                <div className="flex flex-col items-center ">
                  <img
                    src={`${current?.condition.icon}`}
                    alt={location.name}
                    className="w-[60px]"
                  />
                  <p className="text-hite font-semibold">
                    {current.condition.text}
                  </p>
                </div>
              )}
            </p>
          </div>

          <div className="border-t border-gray-300 my-4"></div>

          <div className="flex gap-2">
            {current?.air_quality && (
              <div className="flex justify-center items-center gap-3 flex-wrap text-white">
                <p>CO: {current.air_quality.co}</p>
                <p>NO2: {current.air_quality.no2}</p>
                <p>O3: {current.air_quality.o3}</p>
                <p>SO2: {current.air_quality.so2}</p>
                <p>PM2.5: {current.air_quality.pm2_5}</p>
                <p>PM10: {current.air_quality.pm10}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
