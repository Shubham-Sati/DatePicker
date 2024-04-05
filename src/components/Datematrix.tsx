import { useState } from "react";
import { DateRangeSchema } from "../lib/calenderHelper";
import "./style.css";

const Datematrix = ({
  monthDates,
  selectedDates,
  selectDateRange,
}: {
  monthDates: (Date | null)[][];
  selectedDates: DateRangeSchema;
  selectDateRange: (date: Date | null) => void;
}) => {
  const [tempEndDate, setTempEndDate] = useState<Date | null>(
    selectedDates.endDate
  );

  const isDateInRange = (date: Date): boolean => {
    const { startDate, endDate } = selectedDates;
    if (
      startDate === null ||
      tempEndDate === null ||
      date.getDay() === 0 ||
      date.getDay() === 6
    ) {
      return false;
    }

    if (endDate !== null) {
      return date >= startDate && date <= endDate;
    } else {
      if (tempEndDate !== null) {
        if (
          (date >= startDate && date <= tempEndDate) ||
          (date >= tempEndDate && date <= startDate)
        )
          return true;
      }
    }

    return false;
  };

  const handleMouseEnter = (date: Date): void => {
    setTempEndDate(date);
  };

  return (
    <div className="matrix">
      {monthDates?.map((week: (Date | null)[], weekIdx: number) => (
        <div className="matrix__week" key={weekIdx}>
          {week.map((date: Date | null, dayIdx: number) => (
            <div className="matrix__week--day" key={dayIdx}>
              {date !== null ? (
                <span
                  onClick={() => selectDateRange(date)}
                  onMouseEnter={() => handleMouseEnter(date)}
                  className={
                    isDateInRange(date) === true
                      ? "matrix__week--day-highlighted"
                      : ""
                  }
                >
                  {date.getDate()}
                </span>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Datematrix;
