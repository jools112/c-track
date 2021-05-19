import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import {
  calendarDayBackActionCreator,
  calendarDayForwardActionCreator,
  calendarTodayActionCreator
} from '../../store/calendar/calendarActions';

interface Props {}
type ReduxProps = Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const CalendarNav: React.FC<ReduxProps> = (props) => {
  console.log(props);
  return (
    <div>
      <div>
        <button onClick={() => props.mapDayBack()}>yesterday</button>
        <span> Showing entries for {props.mapSelectedDate}: </span>
        <button onClick={() => props.mapDayForward()}>tomorrow</button>
      </div>
      <div>
        <button onClick={() => props.mapToday()}>back to today</button>
      </div>
    </div>
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
