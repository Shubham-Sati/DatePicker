# Problem Statement: Weekday date range picker component
Create a date range picker component in React and TypeScript that allows users to select weekdays (Monday through Friday) and prevents them from selecting weekends (Saturday and Sunday). The component should include the following features:


    ●   The component should allow users to select a date range defined by a start date and an end date. 
        Remember that a start date and an end date must be a weekday and should not be a weekend.

    ●   The selected date range should highlight only weekdays and weekends should not be highlighted.

    ●   The user should be able to change the year displayed in the date picker.

    ●   The user should be able to change the month displayed in the date picker.

    ●   The component should include a change handler that returns the selected date range 
        and any weekend dates within that range. As an example, if the range selected is 
        December 1st, 2022, to December 15th, 2022, the returned values should be an array 
        containing the date range as the first element (e.g. [2022-12-01, 2022-12-15]) and 
        an array of weekend dates within that range as the second element 
        (e.g. [2022-12-03, 2022-12-04, 2022-12-10, 2022-12-11]).

    ●   The component should include a prop that allows the user to input predefined ranges, 
        such as the last 7 days or last 30 days. 
        These predefined ranges should be displayed below the calendars.

    Please refer to the date range picker linked below as an example:
    https://rsuitejs.com/components/date-range-picker/#predefined-date-ranges


