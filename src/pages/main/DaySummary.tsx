import {
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchEntries } from '../../store/daySummary/daySummaryAction';
import { RootState } from '../../store/rootReducer';

interface Props {}

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

export const DaySummary: React.FC<ReduxProps> = (props) => {
  const classes = useStyles();
  const { mapFetchEntries } = props;

  useEffect(() => mapFetchEntries(props.mapDate), [
    mapFetchEntries,
    props.mapDate
  ]);

  const caloriesConsumed = props.mapEntries.reduce((a, b) => a + b.calories, 0);
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Dagens matintag:</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <List>
              {props.mapEntries.map((entry, index) => {
                return (
                  <ListItem className={classes.listItem}>
                    <ListItemText
                      primary={
                        entry.quantity +
                        'g ' +
                        entry.name +
                        ' (' +
                        entry.calories +
                        'kcal)'
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Intagna kalorier: {caloriesConsumed}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Kalorier kvar att äta: {props.mapAllowedCalories - caloriesConsumed}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    mapEntries: state.daySummary.entries,
    mapAllowedCalories: state.daySummary.allowedCalories,
    mapDate: state.calendar.selectedDay
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  mapFetchEntries: (date: string) => dispatch(fetchEntries(date))
});

export const ConnectedDaySummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(DaySummary);
