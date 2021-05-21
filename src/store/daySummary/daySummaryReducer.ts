import { Entry } from '../../models/entry';

export interface DaySummaryState {
  entries: Array<Entry>;
  allowedCalories: number;
}

const initialState: DaySummaryState = {
  entries: [],
  allowedCalories: 1800
};

// TODO actions: fetch existing entries, add entry, delete entry

export const DaySummaryReducer = (
  state = initialState,
  action: any
): DaySummaryState => {
  switch (action.type) {
    case 'DAY_SUMMARY_RECEIVE_ENTRIES':
      return {
        ...state,
        entries: action.payload
      };
    case 'DAY_SUMMARY_UPDATE_ENTRIES':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };
    default:
      return state;
  }
};
