import { weekdays } from "../lib/calenderHelper";

const WeeksHeading = () => {
  return (
    <div className="weeks">
      {weekdays.map((weekday, idx) => (
        <div key={idx} className="weekday">
          {weekday.slice(0, 3)}
        </div>
      ))}
    </div>
  );
};

export default WeeksHeading;
