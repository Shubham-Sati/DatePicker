export type DateRangeSchema = {
  startDate: Date | null;
  endDate: Date | null;
};

export type SelectedMonthYearSchema = {
  month: number | null,
  year: number | null,
}

export const weekdays: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const predefinedRanges: number[] = [7, 30];

export const createYearsList = ():number[] => {
  const yearsOptions: number[] = [];
  const currentYear: number = new Date().getFullYear();
  for (let year: number = currentYear - 10; year <= currentYear + 10; year++) {
    yearsOptions.push(year);
  }

  return yearsOptions;
};



export const generateCalender = (month: number, year: number): (Date | null)[][] => {
  const currentMonth = month; 
  const currentYear = year; 

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const numWeeks = Math.ceil((daysInMonth + startDay) / 7);
  const monthDates: (Date | null)[][] = Array.from({ length: numWeeks }, () =>
    Array(7).fill(null)
  );
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const weekIndex = Math.floor((startDay + i - 1) / 7);
    const dayIndex = (startDay + i - 1) % 7;
    monthDates[weekIndex][dayIndex] = date;
  }

  return monthDates;
};

export const getFormatedDate = (date: Date | null):string => {
  if (date === null) return "YYYY-MM-DD";

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

export const generateSelectedDatesArray = (
  selectedDateRange: DateRangeSchema
): {
  dateRange: Date[];
  weekendDates: Date[];
} => {
  if (
    selectedDateRange.startDate === null ||
    selectedDateRange.endDate === null
  ) {
    return {
      dateRange: [],
      weekendDates: [],
    };
  }

  // create start and end date array
  const dateRange: Date[] = [
    selectedDateRange.startDate,
    selectedDateRange.endDate,
  ];

  // create all weekend date array
  const weekendDates: Date[] = [];

  for (
    let currentDate = new Date(selectedDateRange.startDate);
    currentDate <= selectedDateRange.endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    // Check if the current date is a weekend (Saturday or Sunday)
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      weekendDates.push(new Date(currentDate));
    }
  }

  return { dateRange, weekendDates };
};
