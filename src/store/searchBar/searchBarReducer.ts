interface Entry {
  name: string;
  isMeal: boolean;
  calories: number;
}

export interface SearchBarState {
  query: string;
  result: Array<Entry>;
}

const initialState: SearchBarState = {
  query: '',
  result: []
};

export const searchBarReducer = (
  state = initialState,
  action: any
): SearchBarState => {
  switch (action.type) {
    case 'CHEESE_ACTION':
      return {
        ...state,
        result: [
          ...state.result,
          { name: 'ostbågar', isMeal: false, calories: 500 }
        ]
      };
    default:
      return state;
  }
};
