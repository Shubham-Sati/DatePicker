import { DateRangeSchema, getFormatedDate } from "../lib/calenderHelper";

const CalenderHeader = ({
  selectedDates,
}: {
  selectedDates: DateRangeSchema;
}) => {
  const startDate: string = getFormatedDate(selectedDates.startDate);
  const endDate: string = getFormatedDate(selectedDates.endDate);

  return (
    <div className="calender__header">
      <span>
        {startDate} ~ {endDate}
      </span>
    </div>
  );
};

export default CalenderHeader;
