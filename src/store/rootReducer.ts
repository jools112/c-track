import { combineReducers } from 'redux';
import {
  DaySummaryReducer,
  DaySummaryState
} from './daySummary/daySummaryReducer';
import { searchBarReducer, SearchBarState } from './searchBar/searchBarReducer';
import { CalendarReducer, CalendarState } from './calendar/calendarReducer';

export interface RootState {
  searchBar: SearchBarState;
  daySummary: DaySummaryState;
  calendar: CalendarState;
}

export const rootReducer = combineReducers({
  searchBar: searchBarReducer,
  daySummary: DaySummaryReducer,
  calendar: CalendarReducer
});
