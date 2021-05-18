import { combineReducers } from 'redux';
import {
  DaySummaryReducer,
  DaySummaryState
} from './daySummary/daySummaryReducer';
import { searchBarReducer, SearchBarState } from './searchBar/searchBarReducer';

export interface RootState {
  searchBar: SearchBarState;
  daySummary: DaySummaryState;
}

export const rootReducer = combineReducers({
  searchBar: searchBarReducer,
  daySummary: DaySummaryReducer
});
