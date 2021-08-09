import {
  createStyles,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from '@material-ui/core';
import { Delete, Create, Cancel, CheckCircle } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Entry } from '../../models/entry';
import {
  fetchEntries,
  deleteEntry,
  selectQuantity,
  selectEntry,
  toggleUpdateDialog,
  toggleDeleteDialog
} from '../../store/daySummary/daySummaryAction';
import { RootState } from '../../store/rootReducer';

interface Props {}

type ReduxProps = Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const useStyles = makeStyles((theme) =>
  createStyles({
    listItem: {
      backgroundColor: theme.palette.background.paper,
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
          <Grid item xs={3}>
            <List>
              {props.mapEntries.map((entry, index) => {
                return (
                  <ListItem className={classes.listItem} key={index}>
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

                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          props.toggleUpdate();
                          props.selectQuantity(entry.quantity);
                        }}
                      >
                        <Create />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          props.selectEntry(entry);
                          props.toggleDelete();
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
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
      <Dialog
        open={props.mapUpdateOpen}
        onClose={(e, reason) => {
          if (reason === 'escapeKeyDown') {
            props.toggleUpdate();
          }
        }}
      >
        <DialogTitle>Uppdatera mängd</DialogTitle>
        <DialogContent>
          <DialogContentText>För in den nya mängden i gram.</DialogContentText>
          <TextField
            helperText={
              props.mapNewQuantity === undefined || props.mapNewQuantity < 1
                ? 'minst 1 gram eller mer'
                : ''
            }
            error={
              props.mapNewQuantity === undefined || props.mapNewQuantity < 1
            }
            onChange={(e) => props.selectQuantity(Number(e.target.value))}
            type="number"
            value={props.mapNewQuantity}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => props.toggleUpdate()}>
            <Cancel />
          </IconButton>
          <IconButton
            disabled={
              props.mapNewQuantity === undefined || props.mapNewQuantity < 1
            }
            onClick={() => props.toggleUpdate()}
          >
            <CheckCircle />
          </IconButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={props.mapDeleteOpen}
        onClose={(e, reason) => {
          if (reason === 'escapeKeyDown') {
            props.toggleDelete();
          }
        }}
      >
        <DialogTitle>Radera uppslag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vill du verkligen radera uppslaget{' "'}
            {props.mapSelectedEntry === undefined
              ? ''
              : props.mapSelectedEntry.name}
            " ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => props.toggleDelete()}>
            <Cancel />
          </IconButton>
          <IconButton
            onClick={() => {
              props.toggleDelete();
              props.deleteEntry();
            }}
          >
            <CheckCircle />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    mapEntries: state.daySummary.entries,
    mapSelectedEntry: state.daySummary.selectedEntry,
    mapAllowedCalories: state.daySummary.allowedCalories,
    mapDate: state.calendar.selectedDay,
    mapNewQuantity: state.daySummary.newQuantity,
    mapUpdateOpen: state.daySummary.updateOpen,
    mapDeleteOpen: state.daySummary.deleteOpen
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  mapFetchEntries: (date: string) => dispatch(fetchEntries(date)),

  selectQuantity: (selectedQuantity: number) =>
    dispatch(selectQuantity(selectedQuantity)),

  selectEntry: (selectedEntry: Entry) => dispatch(selectEntry(selectedEntry)),

  toggleUpdate: () => dispatch(toggleUpdateDialog()),

  toggleDelete: () => dispatch(toggleDeleteDialog()),

  deleteEntry: () => dispatch(deleteEntry())
});

export const ConnectedDaySummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(DaySummary);
