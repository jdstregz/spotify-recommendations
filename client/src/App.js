import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Home from "./Home";
import Loading from "./Loading";
import SpotifyRecommender from "./SpotifyRecommender";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get('/auth/current-session').then(({data}) => {
      setAuth(data);
    })
  }, []);

  if (auth === null) {
    return <Loading/>
  }
  if (auth) {
    return <SpotifyRecommender auth={auth}/>
  }
  return <Home/>
}

export default App;
