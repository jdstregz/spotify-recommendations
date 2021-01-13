import React, {useState, useEffect} from 'react';
import {Grid, Typography, Slider, Checkbox} from '@material-ui/core';

const nobs = {
  'acousticness': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
  'danceability': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
  'energy': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
  'instrumentalness': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
  'liveness': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
  'loudness': {
    value: [-60, 0],
    enabled: false,
    min: -60,
    max: 0
  },
  'popularity': {
    value: [0, 100],
    enabled: false,
    min: 0,
    max: 100,
    step: 1,
  },
  'speechiness': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
  'tempo': {
    value: [0, 200],
    enabled: false,
    min: 0,
    max: 200,
    step: 1,
  },
  'valence': {
    value: [0, 1],
    enabled: false,
    min: 0,
    max: 1,
    step: 0.01
  },
};


const NobBoard = ({onChange}) => {
  const [boardValues, setBoardValues] = useState(nobs);

  const handleChange = (nob, value) => {
    const newBoardValues = {...boardValues};
    newBoardValues[nob].value = value;
    setBoardValues(newBoardValues);
  };

  const toggleNob = (nob, value) => {
    const newBoardValues = {...boardValues};
    newBoardValues[nob].enabled = value;
    setBoardValues(newBoardValues);
  };

  useEffect(() => {
    onChange(boardValues);
  }, [onChange, boardValues]);

  return (
   <Grid container spacing={2} style={{padding: 10}}>
     {Object.keys(nobs).map(nob => (
       <Grid item xs={12} key={nob}>
         <div style={{display: 'flex', flexDirection: 'row'}}>
           <Checkbox
             checked={boardValues[nob].enabled}
             onChange={(event, newValue) => toggleNob(nob, newValue)}
           />
           <div style={{flex: 1}}>
             <Typography>
               {nob}
             </Typography>
             <Grid container spacing={1}>
               <Grid item>
                 <Typography>
                   Min
                 </Typography>
               </Grid>
               <Grid item xs>
                 <Slider
                   disabled={!boardValues[nob].enabled}
                   value={boardValues[nob].value}
                   onChange={(event, newValue) => handleChange(nob, newValue)}
                   valueLabelDisplay={"on"}
                   aria-labelledby={"range-slider"}
                   min={nobs[nob].min}
                   max={nobs[nob].max}
                   step={nobs[nob].step}
                 />
               </Grid>
               <Grid item>
                 <Typography>
                   Max
                 </Typography>
               </Grid>
             </Grid>
           </div>
         </div>
       </Grid>
     ))}
   </Grid>
  );
};

export default NobBoard