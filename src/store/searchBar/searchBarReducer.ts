import { Result } from '../../models/result';

export interface SearchBarState {
  query: string;
  results: Array<Result>;
  isSearching: boolean;
  selectedResult: Result | undefined;
  selectedQuantity: number;
}

const initialState: SearchBarState = {
  query: '',
  results: [],
  isSearching: false,
  selectedResult: undefined,
  selectedQuantity: 0
};

export const searchBarReducer = (
  state = initialState,
  action: any
): SearchBarState => {
  switch (action.type) {
    case 'SEARCHBAR_RECEIVE_RESULTS':
      return {
        ...state,
        results: action.payload
      };
    case 'SEARCHBAR_SET_QUERY':
      return {
        ...state,
        query: action.payload
      };
    case 'SEARCHBAR_TOGGLE_SEARCHING':
      return {
        ...state,
        isSearching: action.payload
      };
    case 'SEARCHBAR_SELECT_RESULT':
      return {
        ...state,
        selectedResult: action.payload
      };
    case 'SEARCHBAR_SELECT_QUANTITY':
      return {
        ...state,
        selectedQuantity: action.payload
      };
    default:
      return state;
  }
};
