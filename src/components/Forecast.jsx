import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForecastData } from "../redux/actions/weatherActions";

const Forecast = () => {
    const dispatch = useDispatch();
    const forecastDay = useSelector(
        (state) => state.forecast.forecastData.forecastday
    );
    const { current } = useSelector((state) => state.forecast);

    useEffect(() => {
        dispatch(getForecastData());
    }, [dispatch]);

    const indonesiaTime = (inputDateString) => {
        const [year, month, day] = inputDateString.split("-");
        const formattedDate = `${day}-${month}-${year}`;

        return formattedDate;
    };

    return (
        <>
            <div className="mt-2 p-2 text-white container mx-auto bg-white bg-opacity-25 rounded-md">
                <h1 className="font-bold text-center mb-2">3-Days Forecast</h1>
                {/* <div className="border-t border-gray-300 my-2"></div> */}

                {forecastDay &&
                    forecastDay.map((item) => (
                        <div
                            key={item.date_epoch}
                            className="flex items-center justify-between"
                        >
                            <p className="text-[12px] font-bold">
                                {indonesiaTime(item.date)}
                            </p>

                            <img
                                src={`${item.day.condition.icon}`}
                                className="w-[35px] md:w-[45px]"
                            />

                            <p className="text-[14px]">
                                {item.day.condition.text}
                            </p>
                            <p>{item.day.maxtemp_c}°C</p>
                        </div>
                    ))}
            </div>

            <div className="flex justify-center mt-3">
                {current?.air_quality && (
                    <div className="flex gap-3 justify-center flex-wrap text-white">
                        <p>CO: {current.air_quality.co}</p>
                        <p>NO2: {current.air_quality.no2}</p>
                        <p>O3: {current.air_quality.o3}</p>
                        <p>SO2: {current.air_quality.so2}</p>
                        <p>PM2.5: {current.air_quality.pm2_5}</p>
                        <p>PM10: {current.air_quality.pm10}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Forecast;
