import axios from 'axios';
import { Result } from '../../models/result';
import { RootState } from '../rootReducer';

type ThunkAction = (dispatch: any, getState: RootState) => any;

export const fetchResultsSearchBarThunk = (query: string): ThunkAction => (
  dispatch
) => {
  const promise = axios.get<Array<Result>>(
    'http://127.0.0.1:5000/search?query=' + query
  );
  promise.then((response) =>
    dispatch(receiveResultsSearchBarActionCreator(response.data))
  );
};

export const receiveResultsSearchBarActionCreator = (
  results: Array<Result>
) => ({
  type: 'SEARCHBAR_RECEIVE_RESULTS',
  payload: results
});

export const setQuerySearchBarActionCreator = (query: string) => ({
  type: 'SEARCHBAR_SET_QUERY',
  payload: query
});

export const toggleSearchingSearchBarActionCreator = (
  isSearching: boolean
) => ({
  type: 'SEARCHBAR_TOGGLE_SEARCHING',
  payload: isSearching
});

export const selectResultSearchBarActionCreator = (selectedResult: Result) => ({
  type: 'SEARCHBAR_SELECT_RESULT',
  payload: selectedResult
});

export const selectQuantitySearchBarActionCreator = (
  selectedQuantity: number
) => ({
  type: 'SEARCHBAR_SELECT_QUANTITY',
  payload: selectedQuantity
});
