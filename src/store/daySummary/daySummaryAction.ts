import axios from 'axios';
import { Entry } from '../../models/entry';
import { Result } from '../../models/result';
import { RootState } from '../rootReducer';

type ThunkAction = (dispatch: any, getState: () => RootState) => any;

export const fetchEntries = (date: string): ThunkAction => (dispatch) => {
  const promise = axios.get<Array<Entry>>(
    'http://127.0.0.1:5000/day-summary?date=' + date
  );
  promise.then((response) =>
    dispatch(receiveEntriesActionCreator(response.data))
  );
};

export const addEntry = (result: Result): ThunkAction => (
  dispatch,
  getState
) => {
  const promise = axios.post('http://127.0.0.1:5000/day-summary', {
    name: result.name,
    id: result.id,
    quantity: getState().searchBar.selectedQuantity,
    type: getState().searchBar.selectedResult?.type
  });
  promise.then((response) =>
    dispatch(fetchEntries(getState().calendar.selectedDay))
  );
};

export const receiveEntriesActionCreator = (entries: Array<Entry>) => ({
  type: 'DAY_SUMMARY_RECEIVE_ENTRIES',
  payload: entries
});

export const updateEntriesActionCreator = (newEntry: Entry) => ({
  type: 'DAY_SUMMARY_UPDATE_ENTRIES',
  payload: newEntry
});
