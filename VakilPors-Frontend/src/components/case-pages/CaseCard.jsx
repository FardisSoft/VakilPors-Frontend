import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function card(title, nameOfCase, typeOfCase, minCash, maxCash) { (
    <React.Fragment>
      <CardContent>
        <Typography sx={{fontFamily: "shabnam", fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
        </Typography>
        <Typography sx={{fontFamily: "shabnam"}} variant="h5" component="div">
          {nameOfCase}
        </Typography>
        <Typography sx={{fontFamily: "shabnam", mb: 1.5 }} color="text.secondary">
          {typeOfCase}
        </Typography>
        <Typography sx={{fontFamily: "shabnam"}} variant="body2">
          حداقل بودجه : {minCash} تومان
          <br />
          حداکثر بودجه : {maxCash} تومان
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{fontFamily: "shabnam"}} size="small">ویرایش</Button>
      </CardActions>
    </React.Fragment>
  )}


export default function OutlinedCard({items:[]}) {
  return (
    {items.map((x)=>(
    <Box sx={{fontFamily:'shabnam', direction:'rtl', minWidth: 300 }}>
        <Card variant="outlined">{card()}</Card>
    </Box>

    ))}
          

  );
}