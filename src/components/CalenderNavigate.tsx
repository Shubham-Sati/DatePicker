import { useEffect, useState } from "react";
import {
  SelectedMonthYearSchema,
  createYearsList,
  months,
} from "../lib/calenderHelper";
import "./style.css";

const CalenderNavigate = ({
  month,
  year,
  selectMonthAndYear,
}: {
  month: number;
  year: number;
  selectMonthAndYear: (value: SelectedMonthYearSchema) => void;
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(months[month]);
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [changedVariable, setChangeVariable] =
    useState<SelectedMonthYearSchema>({
      month: month,
      year: year,
    });
  const [yearsList, setYearsList] = useState<number[]>([]);

  const handleSelectMonth = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedMonth(event.target.value);
    setChangeVariable({
      month: months.indexOf(event.target.value),
      year: selectedYear,
    });
  };

  const handleSelectYear = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedYear(Number(event.target.value));
    setChangeVariable({
      month: months.indexOf(selectedMonth),
      year: Number(event.target.value),
    });
  };

  const handleChangeMonth = (value: number): void => {
    if (selectedMonth === "January" && value === -1) {
      setSelectedMonth(months[11]);
      setChangeVariable({
        month: 11,
        year: selectedYear + value,
      });
    } else if (selectedMonth === "December" && value === 1) {
      setSelectedMonth(months[0]);
      setChangeVariable({
        month: 0,
        year: selectedYear + value,
      });
    } else {
      setSelectedMonth(months[month + value]);
      setChangeVariable({
        month: month + value,
        year: selectedYear,
      });
    }
  };

  useEffect(() => {
    setYearsList(createYearsList());
    selectMonthAndYear(changedVariable);
    setChangeVariable({
      month: null,
      year: null,
    });
    setSelectedMonth(months[month]);
    setSelectedYear(year);
  }, [month, year, changedVariable, selectMonthAndYear]);

  return (
    <div className="calender__navigation">
      <span
        className="calender__navigation--arrow"
        onClick={() => handleChangeMonth(-1)}
      >
        {"<"}
      </span>
      <span>
        <select
          name="months"
          value={selectedMonth}
          onChange={handleSelectMonth}
          className="calender__navigation--select"
        >
          {months[month]}
          {months.map((monthName, idx) => (
            <option key={idx} value={monthName}>
              {monthName}
            </option>
          ))}
        </select>
        <select
          name="years"
          value={selectedYear}
          onChange={handleSelectYear}
          className="calender__navigation--select"
        >
          {selectedYear}
          {yearsList.map((year, idx) => (
            <option key={idx} value={year}>
              {year}
            </option>
          ))}
        </select>
      </span>
      <span
        className="calender__navigation--arrow"
        onClick={() => handleChangeMonth(1)}
      >
        {">"}
      </span>
    </div>
  );
};

export default CalenderNavigate;
