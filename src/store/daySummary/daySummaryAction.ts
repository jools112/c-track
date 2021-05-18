import axios from 'axios';
import { Entry } from '../../models/entry';
import { RootState } from '../rootReducer';
type ThunkAction = (dispatch: any, getState: RootState) => any;

export const receiveEntriesActionCreator = (entries: Array<Entry>) => ({
  type: 'DAY_SUMMARY_RECEIVE_ENTRIES',
  payload: entries
});

export const fetchEntries = (date: string): ThunkAction => (dispatch) => {
  const entries: Array<Entry> = [];
  const promise = axios.get<Array<Entry>>(
    'http://127.0.0.1:5000/day-summary?date=' + date
  );
  promise.then((response) =>
    dispatch(receiveEntriesActionCreator(response.data))
  );
};
