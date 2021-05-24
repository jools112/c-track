import { Grid, Typography } from '@material-ui/core';

export const Header: React.FC = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h1" color="secondary">
          CALORIE-TRACK
        </Typography>
      </Grid>
    </>
  );
};
