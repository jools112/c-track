import axios from 'axios';
import { Entry } from '../../models/entry';
type ThunkAction = (dispatch: any, getState: any) => any;

export const receiveEntriesActionCreator = (entries: Array<Entry>) => ({
  type: 'DAY_SUMMARY_RECEIVE_ENTRIES',
  payload: entries
});

export const fetchEntries = (): ThunkAction => (dispatch) => {
  const entries: Array<Entry> = [];
  const promise = axios.get<Array<Entry>>(
    'http://127.0.0.1:5000/day-summary?date=2021-05-11'
  );
  promise.then((response) =>
    dispatch(receiveEntriesActionCreator(response.data))
  );
};
