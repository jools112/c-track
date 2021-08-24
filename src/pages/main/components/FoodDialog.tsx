import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import React from 'react';
import { DialogType } from '../../../models/dialogType';

interface Props {
  mapDialogOpen: DialogType;
  selectDialog: (selectedDialog: DialogType) => void;
}

export const FoodDialog: React.FC<Props> = ({
  mapDialogOpen,
  selectDialog
}) => {
  console.log('ost', mapDialogOpen === 'food');
  console.log(mapDialogOpen);
  return (
    <Dialog
      open={mapDialogOpen === 'food'}
      onClose={(e, reason) => {
        if (reason === 'escapeKeyDown') {
          selectDialog('none');
        }
      }}
    >
      <DialogTitle>Ny mat</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Lägg till en ny matvara. Namn och kalorivärde per hundra gram krävs.
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
