import { combineReducers } from 'redux';
import {
  DaySummaryReducer,
  DaySummaryState
} from './daySummary/daySummaryReducer';
import { searchBarReducer, SearchBarState } from './searchBar/searchBarReducer';
import { CalendarReducer, CalendarState } from './calendar/calendarReducer';
import { ButtonBarReducer, ButtonBarState } from './buttonBar/buttonBarReducer';

export interface RootState {
  buttonBar: ButtonBarState;
  calendar: CalendarState;
  daySummary: DaySummaryState;
  searchBar: SearchBarState;
}

export const rootReducer = combineReducers({
  buttonBar: ButtonBarReducer,
  calendar: CalendarReducer,
  daySummary: DaySummaryReducer,
  searchBar: searchBarReducer
});
