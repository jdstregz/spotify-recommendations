import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

import {Grid, TextField, Button, Typography} from '@material-ui/core';
import {Search} from '@material-ui/icons';
import SearchResults from './components/SearchResults';
import NobBoard from './components/NobBoard';
import ResultsList from "./components/ResultsList";

const SpotifyRecommender = ({auth}) => {
  const {token} = auth;
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [nobValues, setNobValues] = useState({});
  const [results, setResults] = useState(null)

  const searchSpotify = async () => {
    const url = 'https://api.spotify.com/v1/search';
    const searchQuery = encodeURIComponent(searchString);
    const typeQuery = `type=artist`;
    const {data} = await axios.get(`${url}?q=${searchQuery}&${typeQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (data && data.artists) {
      setSearchResults(data.artists.items);
    }
  };

  const getRecommendations = async () => {
    const url = 'https://api.spotify.com/v1/recommendations';

    // get artists
    let selectedArtistsString;
    if (selectedArtists.length < 0) {
      return;
    } else {
      selectedArtistsString = `seed_artists=${selectedArtists.join(',')}`;
    }

    // getnobs
    let min = [];
    let max = [];
    Object.keys(nobValues).forEach(nob => {
      if (nobValues[nob].enabled) {
        // then we add our min and max values
        min.push(`min_${nob}=${nobValues[nob].value[0]}`);
        max.push(`max_${nob}=${nobValues[nob].value[1]}`);
      }
    });
    const minString = min.join('&');
    const maxString = max.join('&');

    console.log(`${url}?${selectedArtistsString}&${minString}&${maxString}`)

    const {data} = await axios.get(`${url}?${selectedArtistsString}&${minString}&${maxString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    setResults(data)
  };

  return (
    <div className={"App"}>
        <Grid container style={{padding: 20}} spacing={1}>
          <Grid item xs={12}>
            Spotify Recommender
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12}>
              {selectedArtists.map((artist, index) => (
                <Typography>
                  {index+1}. {artist}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} style={{display: 'flex', flexDirection: 'row'}}>
              <TextField
                variant={'outlined'}
                label={"Search"}
                style={{backgroundColor: 'white'}}
                fullWidth
                onChange={event => setSearchString(event.target.value)}
                value={searchString}
              />
              <Button style={{backgroundColor: '#ff905b'}} onClick={searchSpotify}>
                <Search/>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <SearchResults onChange={setSelectedArtists} results={searchResults}/>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <NobBoard onChange={setNobValues}/>
          </Grid>
          <Grid item xs={12}>
            <Button variant={'contained'} onClick={getRecommendations}>
              Get Recommendations
            </Button>
          </Grid>
          <Grid item xs={12}>
            {results && <ResultsList results={results}/> }
          </Grid>
        </Grid>
    </div>

  );
};

export default SpotifyRecommender