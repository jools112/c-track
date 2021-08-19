import { Button, ButtonGroup, Dialog, Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { buttonBarSelectDialogActionCreator } from '../../store/buttonBar/buttonBarActions';

interface Props {}

type ReduxProps = Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const ButtonBar: React.FC<ReduxProps> = ({
  mapDialogOpen,
  selectDialog
}) => {
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <ButtonGroup color="primary" orientation="vertical">
              <Button>Lägg till mat</Button>
              <Button>Lägg till måltid</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ButtonGroup color="secondary" orientation="vertical">
              <Button>Lägg till vikt</Button>
              <Button>Lägg till midjemått</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={mapDialogOpen === 'food'}> </Dialog>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return { mapDialogOpen: state.buttonBar.dialogOpen };
};

const mapDispatchToProps = (dispatch: any) => ({
  selectDialog: (selectedDialog: string) =>
    buttonBarSelectDialogActionCreator(selectedDialog)
});

export const ConnectedButtonbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonBar);
