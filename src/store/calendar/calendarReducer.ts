import { formatISO, addDays } from 'date-fns';

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
    case 'CALENDAR_DAY_BACK':
      return {
        ...state,
        selectedDay: formatISO(addDays(new Date(state.selectedDay), -1), {
          representation: 'date'
        })
      };
    case 'CALENDAR_DAY_FORWARD':
      return {
        ...state,
        selectedDay: formatISO(addDays(new Date(state.selectedDay), 1), {
          representation: 'date'
        })
      };
    case 'CALENDAR_DAY_TODAY':
      return {
        ...state,
        selectedDay: formatISO(new Date(), {
          representation: 'date'
        })
      };
    default:
      return state;
  }
};
