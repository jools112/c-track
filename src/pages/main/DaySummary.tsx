import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchEntries } from '../../store/daySummary/daySummaryAction';
import { RootState } from '../../store/rootReducer';

interface Props {}

type ReduxProps = Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const DaySummary: React.FC<ReduxProps> = (props) => {
  const { mapFetchEntries } = props;

  useEffect(() => mapFetchEntries(props.mapDate), [
    mapFetchEntries,
    props.mapDate
  ]);

  const caloriesConsumed = props.mapEntries.reduce((a, b) => a + b.calories, 0);
  return (
    <div>
      <div>
        Today's Food:
        <ul>
          {props.mapEntries.map((entry, index) => {
            return (
              <li key={index}>
                {entry.quantity}g {entry.name} ({entry.calories}kcal)
              </li>
            );
          })}
        </ul>
        <div>Calories consumed: {caloriesConsumed}</div>
        <div>
          Calories left to consume:{' '}
          {props.mapAllowedCalories - caloriesConsumed}
        </div>
      </div>
    </div>
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
