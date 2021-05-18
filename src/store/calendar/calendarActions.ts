export const calendarActionCreator = (date?: string) => ({
  type: 'CALENDAR_RECEIVE_DATE',
  payload: date
});
