import { useEffect, useState } from "react";
import Calender from "../components/Calender";
import "./homepage.css";
import {
  DateRangeSchema,
  generateSelectedDatesArray,
  getFormatedDate,
} from "../lib/calenderHelper";

const Homepage = () => {
  const [showCalender, setShowCalender] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<DateRangeSchema>({
    startDate: null,
    endDate: null,
  });
  const [weekendsAndRangeDates, setWeekendsAndRangeDates] = useState<{
    dateRange: Date[];
    weekendDates: Date[];
  }>({
    dateRange: [],
    weekendDates: [],
  });

  const setProjectDates = (dates: DateRangeSchema): void => {
    setSelectedDates({
      startDate: dates.startDate,
      endDate: dates.endDate,
    });
  };

  const handleShowCalender = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if ((event.target as HTMLDivElement).classList.contains("homepage")) {
      setShowCalender(false);
    }
  };

  useEffect(() => {
    const arrayObj = generateSelectedDatesArray(selectedDates);
    setWeekendsAndRangeDates(arrayObj);
    setShowCalender(false);
  }, [selectedDates]);

  return (
    <div className="homepage" onClick={handleShowCalender}>
      <div
        className="homepage__daterange"
        onClick={() => setShowCalender(!showCalender)}
      >
        <p>{`project start and end date: ${getFormatedDate(
          selectedDates.startDate
        )} ~ ${getFormatedDate(selectedDates.endDate)}`}</p>
      </div>

      {showCalender && (
        <div className="homepage__calender">
          <Calender setProjectDates={setProjectDates} />
        </div>
      )}

      {!showCalender && weekendsAndRangeDates.dateRange.length > 0 && (
        <div className="homepage__footer">
          <tr className="homepage__footer--row">
            <td className="homepage__footer--row-heading">Date Range:</td>
            <td className="homepage__footer--row-headingcontent">
              <span>
                {getFormatedDate(selectedDates.startDate)} ~{" "}
                {getFormatedDate(selectedDates.endDate)}
              </span>
            </td>
          </tr>
          <tr className="homepage__footer--row">
            <td className="homepage__footer--row-heading">Weekend Dates:</td>
            <td className="homepage__footer--row-headingcontent">
              {weekendsAndRangeDates.weekendDates.map((date, idx) => (
                <span key={idx}>{getFormatedDate(date)}</span>
              ))}
            </td>
          </tr>
        </div>
      )}
    </div>
  );
};

export default Homepage;
