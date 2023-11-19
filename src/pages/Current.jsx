import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForecastData } from "../redux/actions/weatherActions";
import Forecast from "../components/Forecast";
const Current = () => {
    const [region, setRegion] = useState("jakarta");
    const dispatch = useDispatch();

    const { current, location } = useSelector((state) => state.forecast);

    useEffect(() => {
        const customRegion = region.replace(/\s/g, "");
        dispatch(getForecastData(customRegion));
    }, [dispatch, region]);

    return (
        <>
            <div
                className="min-h-screen flex flex-col items-center justify-center p-3"
                style={{
                    backgroundImage: `url(/bg.jpg)`,
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
                    className="bg-gray-700 bg-opacity-50 border rounded-md p-1 font-semibold text-white mb-2"
                ></input>

                <div
                    className="bg-gray-700 bg-opacity-50 rounded shadow p-8 w-full md:w-2/4 lg:w-2/4"
                    style={{
                        backdropFilter: "blur(1px) saturate(180%)",
                        WebkitBackdropFilter: "blur(1px) saturate(180%)",
                        backgroundColor: "rgba(17, 25, 40, 0.50)",
                        border: "1px solid rgba(255, 255, 255, 0.125)",
                    }}
                >
                    <div className="flex justify-between items-center">
                        <div>
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
                                        Last Update :{" "}
                                        {current.last_updated.slice(11, 16)}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col justify-around items-center">
                            <h2 className="text-[17px] md:text-2xl font-bold mb-4 text-white text-center">
                                {current?.temp_c}°C / {current?.temp_f}°F
                            </h2>
                            <div className="text-white">
                                {current?.condition && (
                                    <div className="flex flex-col justify-center items-center ">
                                        <img
                                            src={`${current?.condition.icon}`}
                                            alt={location.name}
                                            className="w-[55px]"
                                        />
                                        <p className="text-hite font-semibold">
                                            {current.condition.text}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Forecast />
                </div>
                <h1
                    className="text-white font-semibold text-center mt-2 border rounded-md bg-gray-700 bg-opacity-50 p-1 w-full md:w-2/4 lg:w-2/4"
                    style={{
                        backdropFilter: "blur(1px) saturate(180%)",
                        WebkitBackdropFilter: "blur(1px) saturate(180%)",
                        backgroundColor: "rgba(17, 25, 40, 0.50)",
                        border: "1px solid rgba(255, 255, 255, 0.125)",
                    }}
                >
                    DISCLAIMER :<br /> The Weather information on this website
                    is sourced from Open Weather and may not always be accurate.
                    It is recommended to cross-verify with official weather
                    sources before making decisions based on the information
                    presented on this site.
                </h1>
            </div>
        </>
    );
};

export default Current;
