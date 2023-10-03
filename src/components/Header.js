import React from 'react'
import {AppBar,Select,Typography,Toolbar,Container,ThemeProvider,createTheme,MenuItem} from '@material-ui/core'
import { makeStyles } from "@material-ui/core"


import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';



const useStyles=makeStyles(()=>({
  title:{
  flex:1,
  color:'gold',
  fontFamily:'MontSerrat',
  fontWeight:'bold',
  cursor:'pointer',
  },
}))
const Header = () => {
  const history=useHistory();
  const classes=useStyles();
  const { currency,setCurrency }=CryptoState();
 
  const darkTheme=createTheme({
    palette:{
      primary:{
        main:'#fff',
      },
      type:'dark'
    },
  })
  
  return (
    <ThemeProvider  theme={darkTheme}>

    <AppBar color='transparent' position='static'>
      <Container
      >
        <Toolbar>
          <Typography className={classes.title}  onClick={()=>history.push('/')}>Crypto Hunter</Typography>
          <Typography className={classes.title} >Made by Mouhammad Aly</Typography>
          <Select
          
          variant='outlined'
          style={{
            width:100,
            height:40,
            marginLeft:15,
          }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'INR'}>INR</MenuItem>
            
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header
