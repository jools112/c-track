import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { calendarActionCreator } from '../../store/calendar/calendarActions';

interface Props {}
type ReduxProps = Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const CalendarNav: React.FC<ReduxProps> = (props) => {
  return (
    <div>
      <span>{props.mapSelectedDate} is today!</span>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { mapSelectedDate: state.calendar.selectedDay };
};

const mapDispatchToProps = (dispatch: any) => ({
  mapSetDate: () => dispatch(calendarActionCreator())
});

export const ConnectedCalendarNav = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarNav);
