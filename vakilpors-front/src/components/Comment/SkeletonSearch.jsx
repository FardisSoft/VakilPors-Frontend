import React from "react";
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const SkeletonSearch = () => {
  return (
    <div style={{marginTop:'2%'}}>
      <Grid container spacing={2}>
        <Grid item>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="30%" />
        </Grid>
      </Grid>
    </div>
  );
};

export default SkeletonSearch;
