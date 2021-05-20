import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import {
  setQuerySearchBarActionCreator,
  fetchResultsSearchBarThunk,
  toggleSearchingSearchBarActionCreator
} from '../../store/searchBar/searchBarAction';

interface Props {
  stringProp: string;
}

type ReduxProps = Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const SearchBar: React.FC<ReduxProps> = (props) => {
  console.log(props);
  const submitQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.toggleSearching(true);
    props.fetchResults(props.mapQuery);
  };
  return (
    <div>
      <form onSubmit={submitQuery}>
        <input
          type="text"
          placeholder="sök..."
          value={props.mapQuery}
          onChange={(e) => props.setQuery(e.target.value)}
        />
        <input type="submit" value="🔎" />
      </form>
      {props.mapIsSearching ? (
        <div>
          {props.mapResults.length > 0 ? (
            <div>
              <span> Resultat: </span>
              <ul>
                {props.mapResults.map((result, index) => {
                  return (
                    <li key={index}>
                      {result.name} ({result.calories}kcal/100g)
                    </li>
                  );
                })}
              </ul>
              <button onClick={() => props.toggleSearching(false)}>
                ❌ 🔎
              </button>
            </div>
          ) : (
            'inga träffar'
          )}
        </div>
      ) : (
        'ingen aktiv sökning'
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    mapResults: state.searchBar.results,
    mapQuery: state.searchBar.query,
    mapIsSearching: state.searchBar.isSearching
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchResults: (query: string) => dispatch(fetchResultsSearchBarThunk(query)),
  setQuery: (query: string) => dispatch(setQuerySearchBarActionCreator(query)),
  toggleSearching: (isSearching: boolean) =>
    dispatch(toggleSearchingSearchBarActionCreator(isSearching))
});

export const ConnectedSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
