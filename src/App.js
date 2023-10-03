import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
import { makeStyles } from "@material-ui/core"

import "./App.css"



const App = () => {

 
const useStyles=makeStyles(()=>({
  App:{
    backgroundColor:'#14161a',
    color:'white',
    minHeight:'100vh',
  },
}))
const classes=useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}> 
        <Header />
        
        <Route path='/' exact component={HomePage} />
      <Route path='/coins/:id' component={CoinPage} />
      </div>
    </BrowserRouter>
  );
};

export default App;
