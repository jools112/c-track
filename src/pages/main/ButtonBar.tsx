import {
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  DialogActions
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { FoodDialog } from './components/FoodDialog';
import { buttonBarSelectDialogActionCreator } from '../../store/buttonBar/buttonBarActions';
import { DialogType } from '../../models/dialogType';

interface Props {}

type ReduxProps = Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const ButtonBar: React.FC<ReduxProps> = ({
  mapDialogOpen,
  selectDialog
}) => {
  console.log(mapDialogOpen);
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <ButtonGroup color="primary" orientation="vertical">
              <Button onClick={() => selectDialog('food')}>
                Lägg till mat
              </Button>
              <Button onClick={() => selectDialog('meal')}>
                Lägg till måltid
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ButtonGroup color="secondary" orientation="vertical">
              <Button onClick={() => selectDialog('weight')}>
                Lägg till vikt
              </Button>
              <Button onClick={() => selectDialog('waist')}>
                Lägg till midjemått
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <FoodDialog
        mapDialogOpen={mapDialogOpen}
        selectDialog={(selectedDialog: DialogType) =>
          selectDialog(selectedDialog)
        }
      ></FoodDialog>
      <Dialog
        open={mapDialogOpen === 'meal'}
        onClose={(e, reason) => {
          if (reason === 'escapeKeyDown') {
            selectDialog('none');
          }
        }}
      >
        <DialogTitle>Ny måltid</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Dialog
        open={mapDialogOpen === 'weight'}
        onClose={(e, reason) => {
          if (reason === 'escapeKeyDown') {
            selectDialog('none');
          }
        }}
      >
        <DialogTitle>Ny vikt</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Dialog
        open={mapDialogOpen === 'waist'}
        onClose={(e, reason) => {
          if (reason === 'escapeKeyDown') {
            selectDialog('none');
          }
        }}
      >
        <DialogTitle>Nytt midjemått</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return { mapDialogOpen: state.buttonBar.dialogOpen };
};

const mapDispatchToProps = (dispatch: any) => ({
  selectDialog: (selectedDialog: DialogType) =>
    dispatch(buttonBarSelectDialogActionCreator(selectedDialog))
});

export const ConnectedButtonbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonBar);
