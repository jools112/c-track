import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import {
  calendarDayBackActionCreator,
  calendarDayForwardActionCreator,
  calendarTodayActionCreator
} from '../../store/calendar/calendarActions';
import Button from '@material-ui/core/Button';
import { Grid, GridList, Typography } from '@material-ui/core';

interface Props {}
type ReduxProps = Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const CalendarNav: React.FC<ReduxProps> = (props) => {
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => props.mapDayBack()}
            >
              dag bakåt
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="h5">
              Visar mat för {props.mapSelectedDate}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => props.mapDayForward()}
            >
              dag framåt
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => props.mapToday()}
        >
          tillbaka till idag
        </Button>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return { mapSelectedDate: state.calendar.selectedDay };
};

const mapDispatchToProps = (dispatch: any) => ({
  mapDayBack: () => dispatch(calendarDayBackActionCreator()),
  mapDayForward: () => dispatch(calendarDayForwardActionCreator()),
  mapToday: () => dispatch(calendarTodayActionCreator())
});

export const ConnectedCalendarNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarNav);
