import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForecastData } from "../redux/actions/weatherActions";

const Forecast = () => {
    const [region, setRegion] = useState("jakarta");
    const dispatch = useDispatch();

    const { current, location } = useSelector((state) => state.forecast);

    useEffect(() => {
        const customRegion = region.replace(/\s/g, "");
        dispatch(getForecastData(customRegion));
    }, [dispatch, region]);

    const calculateAQI = () => {
        const pollutants = current.air_quality;
        const aqiValues = Object.values(pollutants);
        return Math.max(...aqiValues);
    };
    return (
        <>
            {/* <div className="p-2">
                <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Input Your Location"
                    className="border rounded-md p-1 font-bold"
                ></input>

                <p>Location : {formatLocation(location.name)}</p>
                <p>Temperature : {current?.temp_c}°C</p>
                <p>Last Update : {current?.last_updated}</p>
                {current?.condition && (
                    <>
                        <p>{current?.condition.text}</p>
                        <img src={`${current?.condition.icon}`} />
                    </>
                )}
            </div> */}

            <div className="container mx-auto p-2">
                <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Input Your Location"
                    className="border rounded-md p-1 font-bold mb-2"
                ></input>
                <div className="container mx-auto bg-[#4d425f] text-[#e0e0e0] rounded-md">
                    <div className="p-2 flex flex-col justify-center items-center border rounded-md">
                        <p className="mb-3">{current?.temp_c}°C</p>
                        <div className="flex justify-center items-center">
                            {current?.condition && (
                                <img
                                    src={`${current?.condition.icon}`}
                                    alt={location.name}
                                    className="w-[80px]"
                                />
                            )}
                        </div>
                        {current?.condition && (
                            <>
                                <p>{current.condition.text}</p>
                                <p>
                                    Lat: {location.lat} Lon: {location.lon}
                                </p>
                                last update :{" "}
                                {current.last_updated.slice(11, 16)}
                            </>
                        )}

                        <h1 className="text-4xl font-bold">{location.name}</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Forecast;
