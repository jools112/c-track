import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../store/rootReducer';
import { cheeseAction } from '../../store/searchBar/searchBarAction';

interface Props {
  stringProp: string;
}

type ReduxProps = Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const SearchBar: React.FC<ReduxProps> = (props) => {
  console.log('hej', props);
  return (
    <div>
      <button onClick={() => props.click()}>
        {props.mapCheese.length >= 1 ? props.mapCheese[0].name : 'ostkorv'}
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { mapCheese: state.searchBar.result };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  click: () => dispatch(cheeseAction())
});

export const ConnectedSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
