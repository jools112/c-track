import { combineReducers } from 'redux'
import { searchBarReducer, SearchBarState } from './searchBar/searchBarReducer'

export interface RootState {
  searchBar: SearchBarState
}

export const rootReducer = combineReducers({
  searchBar: searchBarReducer
})
