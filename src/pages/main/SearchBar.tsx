import React from 'react';
import { connect } from 'react-redux';
import { Result } from '../../models/result';
import { addEntry } from '../../store/daySummary/daySummaryAction';
import { RootState } from '../../store/rootReducer';
import {
  setQuerySearchBarActionCreator,
  fetchResultsSearchBarThunk,
  toggleSearchingSearchBarActionCreator,
  selectResultSearchBarActionCreator,
  selectQuantitySearchBarActionCreator
} from '../../store/searchBar/searchBarAction';

interface Props {
  stringProp: string;
}

type ReduxProps = Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const SearchBar: React.FC<ReduxProps> = ({
  mapQuery,
  mapIsSearching,
  mapResults,
  mapSelectedQuantity,
  mapSelectedResult,
  toggleSearching,
  fetchResults,
  selectQuantity,
  selectResult,
  setQuery,
  addEntry
}) => {
  const submitQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggleSearching(true);
    fetchResults(mapQuery);
  };
  return (
    <div>
      <form onSubmit={submitQuery}>
        <input
          type="text"
          placeholder="sök..."
          value={mapQuery}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input type="submit" value="🔎" />
      </form>
      {mapIsSearching ? (
        <div>
          {mapResults.length > 0 ? (
            <div>
              <span> Resultat: </span>
              <ul>
                {mapResults.map((result, index) => {
                  return (
                    <li key={index} onClick={() => selectResult(result)}>
                      {result.name} ({result.calories}kcal/100g)
                    </li>
                  );
                })}
              </ul>
              <div>
                Vald mat:
                <div>
                  {mapSelectedResult ? (
                    <div>
                      {mapSelectedResult.name}{' '}
                      <input
                        type="number"
                        onChange={(e) => selectQuantity(Number(e.target.value))}
                      />
                      gram
                      <button onClick={() => addEntry(mapSelectedResult)}>
                        lägg till
                      </button>
                    </div>
                  ) : (
                    'ingenting'
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  toggleSearching(false);
                }}
              >
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

    mapIsSearching: state.searchBar.isSearching,

    mapSelectedResult: state.searchBar.selectedResult,

    mapSelectedQuantity: state.searchBar.selectedQuantity
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchResults: (query: string) => dispatch(fetchResultsSearchBarThunk(query)),

  setQuery: (query: string) => dispatch(setQuerySearchBarActionCreator(query)),

  toggleSearching: (isSearching: boolean) =>
    dispatch(toggleSearchingSearchBarActionCreator(isSearching)),

  selectResult: (selectedResult: Result) =>
    dispatch(selectResultSearchBarActionCreator(selectedResult)),

  selectQuantity: (selectedQuantity: number) =>
    dispatch(selectQuantitySearchBarActionCreator(selectedQuantity)),

  addEntry: (result: Result) => dispatch(addEntry(result))
});

export const ConnectedSearchBar = connect(
  mapStateToProps,

  mapDispatchToProps
)(SearchBar);
