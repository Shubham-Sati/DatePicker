import { useEffect, useState } from "react";
import {
  DateRangeSchema,
  SelectedMonthYearSchema,
  generateCalender,
  predefinedRanges,
} from "../lib/calenderHelper";
import CalenderHeader from "./CalenderHeader";
import Datematrix from "./Datematrix";
import WeeksHeading from "./WeeksHeading";
import "./style.css";
import CalenderNavigate from "./CalenderNavigate";

const Calender = ({
  setProjectDates,
}: {
  setProjectDates: (date: DateRangeSchema) => void;
}) => {
  const todayDate = new Date();
  const [month, setMonth] = useState<number>(todayDate.getMonth());
  const [year, setYear] = useState<number>(todayDate.getFullYear());
  const [monthDates, setMonthDates] = useState<(Date | null)[][]>([]);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);

  const [showOk, setShowOk] = useState<boolean>(true);
  const [selectedDates, setSelectedDates] = useState<DateRangeSchema>({
    startDate: null,
    endDate: null,
  });

  const selectDateRange = (date: Date | null): void => {
    if (date === null) return;

    if (date.getDay() === 0 || date.getDay() === 6) {
      setWarningMsg("Please select only weekdays");
      return;
    }

    if (selectedDates.startDate === null) {
      setSelectedDates({
        ...selectedDates,
        startDate: date,
      });
      setShowOk(true);
      setWarningMsg(null);
    } else if (selectedDates.endDate === null) {
      if (selectedDates.startDate <= date) {
        setSelectedDates({ ...selectedDates, endDate: date });
      } else {
        setSelectedDates({
          endDate: selectedDates.startDate,
          startDate: date,
        });
      }

      setShowOk(false);
      setWarningMsg(null);
    } else {
      setSelectedDates({
        ...selectedDates,
        startDate: date,
        endDate: null,
      });

      setShowOk(true);
      setWarningMsg(null);
    }
  };

  const selectMonthAndYear = (value: SelectedMonthYearSchema): void => {
    if (value.month !== null && value.year !== null) {
      setMonth(value.month);
      setYear(value.year);
    }
  };

  const preRangeDateSelect = (value: number): void => {
    setSelectedDates({
      startDate: new Date(new Date().getTime() - value * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });
    setShowOk(false);
    setMonth(new Date().getMonth());
    setYear(new Date().getFullYear());
  };

  useEffect(() => {
    setMonthDates(generateCalender(month, year));
  }, [month, year]);

  return (
    <div className="calender">
      {/* Header */}

      <CalenderHeader selectedDates={selectedDates} />
      <hr />

      {/* Warning message */}
      {warningMsg ? (
        <span className="calender__warning">{`* ${warningMsg}`}</span>
      ) : (
        <span className="calender__warning"></span>
      )}

      {/* Calender Navigate Features */}
      <CalenderNavigate
        month={month}
        year={year}
        selectMonthAndYear={selectMonthAndYear}
      />

      {/* Weeks Heading */}
      <WeeksHeading />

      {/* Calender Grid */}
      <Datematrix
        monthDates={monthDates}
        selectedDates={selectedDates}
        selectDateRange={selectDateRange}
      />
      <hr />

      {/* Footer */}
      <div className="calender__footer">
        {/* predefined date rang  */}
        <div className="calender__footer--rangesbar">
          {predefinedRanges.map((range, idx) => (
            <p
              className="calender__footer--ranges"
              key={idx}
              onClick={() => preRangeDateSelect(range)}
            >{`Last ${range} Days`}</p>
          ))}
        </div>

        <button
          disabled={showOk}
          className={showOk ? "button__disable" : ""}
          onClick={() => setProjectDates(selectedDates)}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Calender;
