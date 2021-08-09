import axios from 'axios';
import { Entry } from '../../models/entry';
import { Result } from '../../models/result';
import { RootState } from '../rootReducer';
import { endSearch } from '../searchBar/searchBarAction';
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
    type: getState().searchBar.selectedResult?.type,
    date: getState().calendar.selectedDay
  });
  promise.then((response) => {
    dispatch(endSearch());
    dispatch(fetchEntries(getState().calendar.selectedDay));
  });
};

export const deleteEntry = (): ThunkAction => (dispatch, getState) => {
  const { selectedEntry } = getState().daySummary;
  if (selectedEntry) {
    const promise = axios.delete('http://127.0.0.1:5000/day-summary', {
      data: { id: selectedEntry.id }
    });
    promise.then((response) =>
      dispatch(deleteEntryActionCreator(selectedEntry.id))
    );
  }
};

export const receiveEntriesActionCreator = (entries: Array<Entry>) => ({
  type: 'DAY_SUMMARY_RECEIVE_ENTRIES',
  payload: entries
});

export const updateEntriesActionCreator = (newEntry: Entry) => ({
  type: 'DAY_SUMMARY_UPDATE_ENTRIES',
  payload: newEntry
});

export const deleteEntryActionCreator = (id: number) => ({
  type: 'DAY_SUMMARY_DELETE_ENTRY',
  payload: id
});

export const selectQuantity = (newQuantity: number) => ({
  type: 'DAY_SUMMARY_SELECT_QUANTITY',
  payload: newQuantity
});

export const selectEntry = (selectedEntry: Entry) => ({
  type: 'DAY_SUMMARY_SELECT_ENTRY',
  payload: selectedEntry
});

export const toggleUpdateDialog = () => ({
  type: 'DAY_SUMMARY_TOGGLE_UPDATE_DIALOG'
});

export const toggleDeleteDialog = () => ({
  type: 'DAY_SUMMARY_TOGGLE_DELETE_DIALOG'
});
