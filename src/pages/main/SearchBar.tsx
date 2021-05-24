import {
  Button,
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Result } from '../../models/result';
import { addEntry } from '../../store/daySummary/daySummaryAction';
import { RootState } from '../../store/rootReducer';
import {
  setQuery,
  fetchResultsSearchBarThunk,
  endSearch,
  selectResult,
  selectQuantity
} from '../../store/searchBar/searchBarAction';

interface Props {
  stringProp: string;
}

type ReduxProps = Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const useStyles = makeStyles((theme) =>
  createStyles({
    listItem: {
      textAlign: 'center'
    }
  })
);

export const SearchBar: React.FC<ReduxProps> = ({
  mapIsSearching,
  mapQuery,
  mapResults,
  mapSelectedQuantity,
  mapSelectedResult,
  addEntry,
  endSearch,
  fetchResults,
  selectResult,
  selectQuantity,
  setQuery
}) => {
  const classes = useStyles();
  const submitQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchResults(mapQuery);
  };
  return (
    <>
      <Grid item xs={12}>
        <form onSubmit={submitQuery}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <TextField
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sök matvara/maträtt..."
                type="text"
                value={mapQuery}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Sök
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12}>
        {mapIsSearching ? (
          <Grid container justify="center" spacing={2}>
            {mapResults.length > 0 ? (
              <>
                <Grid item xs={12}>
                  <Typography variant="body1">Resultat:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <List>
                    {mapResults.map((result, index) => {
                      return (
                        <ListItem className={classes.listItem}>
                          <ListItemText
                            primary={
                              result.type === 'food'
                                ? '🥕 ' +
                                  result.name +
                                  ' (' +
                                  result.calories +
                                  'kcal/100g)'
                                : '🍲 ' +
                                  result.name +
                                  ' (' +
                                  result.calories +
                                  'kcal/100g)'
                            }
                            onClick={() => selectResult(result)}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">Vald mat:</Typography>
                </Grid>
                {mapSelectedResult ? (
                  <>
                    <Grid item>
                      <Typography variant="body1">
                        {mapSelectedResult.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        onChange={(e) => selectQuantity(Number(e.target.value))}
                        type="number"
                        value={mapSelectedQuantity}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">gram</Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        color="secondary"
                        onClick={() => addEntry(mapSelectedResult)}
                        variant="contained"
                      >
                        lägg till
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12}>
                    <Typography variant="body1">ingen mat vald</Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button
                    color="primary"
                    onClick={() => {
                      endSearch();
                    }}
                    variant="outlined"
                  >
                    Avbryt sök
                  </Button>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1">inga träffar</Typography>
              </Grid>
            )}
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">ingen aktiv sökning</Typography>
          </Grid>
        )}
      </Grid>
    </>
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

  setQuery: (query: string) => dispatch(setQuery(query)),

  endSearch: () => dispatch(endSearch()),

  selectResult: (selectedResult: Result) =>
    dispatch(selectResult(selectedResult)),

  selectQuantity: (selectedQuantity: number) =>
    dispatch(selectQuantity(selectedQuantity)),

  addEntry: (result: Result) => dispatch(addEntry(result))
});

export const ConnectedSearchBar = connect(
  mapStateToProps,

  mapDispatchToProps
)(SearchBar);
