import moment from "moment";
import { useEffect, useState } from "react";
import { TimePickerProps } from "../@types";

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  callback,
  defaultValue,
}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [meridiem, setMeridiem] = useState<string>("AM");

  useEffect(() => {
    const current = moment(`${hours}:${minutes} ${meridiem}`, "LT");

    callback(current.toDate());
  }, [hours, minutes, meridiem]);

  useEffect(() => {
    if (defaultValue) {
      const removeTimeZone = moment(defaultValue, "YYYY-MM-DDTHH:mm:ss");
      const dateToStrTime = moment(removeTimeZone).format("LT");
      const split = dateToStrTime.split(" ");
      const time = split[0].split(":");
      const hours = Number(time[0]);
      const minutes = Number(time[1]);
      const meridiem = split[1];

      setHours(hours);
      setMinutes(minutes);
      setMeridiem(meridiem as string);
    }
  }, [defaultValue]);

  return (
    <div className="w-full lg:w-6/12 px-4">
      <div className="relative w-full mb-3">
        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
          {label}
        </label>

        <div className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
          <select
            value={hours}
            key={"selectHour"}
            onChange={(e) => setHours(Number(e.target.value))}
            className="px-2 outline-none appearance-none bg-transparent"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => {
              return (
                <option key={`optHour${hour}`} value={hour}>
                  {hour}
                </option>
              );
            })}
          </select>

          <span className="px-2">:</span>

          <select
            value={minutes}
            key={"selectMinutes"}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="px-2 outline-none appearance-none bg-transparent"
          >
            {Array.from({ length: 60 }, (_, i) => i).map((minutes) => {
              return (
                <option key={`optSecond${minutes}`} value={minutes}>
                  {minutes}
                </option>
              );
            })}
          </select>

          <select
            value={meridiem}
            key={"selectMeridiem"}
            onChange={(e) => setMeridiem(e.target.value)}
            className="px-2 outline-none appearance-none bg-transparent"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
