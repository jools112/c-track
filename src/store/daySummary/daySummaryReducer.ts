import { Entry } from '../../models/entry';

export interface DaySummaryState {
  entries: Array<Entry>;
  allowedCalories: number;
  newQuantity: number | undefined;
  updateOpen: boolean;
  deleteOpen: boolean;
}

const initialState: DaySummaryState = {
  entries: [],
  allowedCalories: 1800,
  newQuantity: undefined,
  updateOpen: false,
  deleteOpen: false
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
    case 'DAY_SUMMARY_SELECT_QUANTITY':
      return {
        ...state,
        newQuantity: action.payload
      };
    case 'DAY_SUMMARY_TOGGLE_UPDATE_DIALOG':
      return {
        ...state,
        updateOpen: !state.updateOpen
      };
    case 'DAY_SUMMARY_TOGGLE_DELETE_DIALOG':
      return {
        ...state,
        deleteOpen: !state.deleteOpen
      };

    default:
      return state;
  }
};
