import { formatISO } from 'date-fns';

export interface CalendarState {
  selectedDay: string;
}

const initialState: CalendarState = {
  selectedDay: formatISO(new Date(), { representation: 'date' })
};

export const CalendarReducer = (
  state = initialState,
  action: any
): CalendarState => {
  switch (action.type) {
    case 'CALENDAR_RECEIVE_DATE':
      return {
        ...state,
        selectedDay: action.payload
      };
    default:
      return state;
  }
};
