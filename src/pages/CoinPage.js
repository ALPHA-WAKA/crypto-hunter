import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext'
import CoinInfo from '../components/CoinInfo'
import { numberWithCommas } from '../components/Banner/Carousel';
import parse from 'html-react-parser';
import { makeStyles,Typography,LinearProgress } from '@material-ui/core'
const CoinPage = () => {
  const[coin,setCoin]=useState()
  const { id }=useParams()
  const {currency,symbol}=CryptoState();
  const fetchCoin= async()=>{
    const {data}=await axios.get(SingleCoin(id));
   setCoin(data)
  }
  useEffect(()=>{
    fetchCoin();
  },[])
  const useStyles=makeStyles((theme)=>({
    container:{
      display:"flex",
      [theme.breakpoints.down('md')]:{
        flexDirection:'column',
        alignItems:'center',
      }
    },
    sidebar:{
      width:'30%',
      [theme.breakpoints.down('md')]:{
        width:'100%',
},
display:'flex',
flexDirection:'column',
alignItems:'center',
marginTop:25,
borderRight:'2px solid grey'
    },
    heading:{
     fontWeight:'bold',
     fontFamily:"Montserrat",
     marginBottom:'20',
    },
    description:{
      width:'100%',
      fontFamily:'Montserrat',
      padding:25,
      paddingBottom:'25',
      paddingTop:0,
      textAlign:'justify',
     }
     ,
     marketData:{
      alignSelf:'start',
      padding:25,
      paddingTop:10,
      width:'100%',
      //Making it responsive
      [theme.breakpoints.down('md')]:{
        display:'flex',
        justifyContent:'space-around',
      },
      [theme.breakpoints.down('sm')]:{
        flexDirection:'column',
        alignItems:"center",

      },
      [theme.breakpoints.down('xs')]:{
        
        alignItems:"start",
        
      }
     }
  
  }))
  const classes=useStyles();
if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
       <img 
       src={coin?.image.large}
       alt={coin?.name}
       height='200'
       style={{marginBottom:20}}
       />
       <Typography variant='h3' className={classes.heading}>
        {coin?.name}
       </Typography>
       <Typography variant='subtitle1' className={classes.description}>
       {parse(coin?.description.en.split('. ').slice(0, 2).join('. '))}.
       </Typography>
       <div className={classes.marketData}>
        <span style={{ display: 'flex' }}> 
              <Typography className={classes.heading}>Rank:</Typography>
              &nbsp;&nbsp;
              <Typography 
              variant='h5'
              style={{
                fontFamily:'Montserrat',
              }}>
                {coin?.market_cap_rank}
              </Typography>
        </span>
        <span style={{ display: 'flex' }}> 
              <Typography className={classes.heading}>Current Price:</Typography>
              &nbsp;&nbsp;
              <Typography 
              variant='h5'
              style={{
                fontFamily:'Montserrat',
              }}>
                {symbol}{' '} 
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
        </span>
        <span style={{ display: 'flex' }}> 
              <Typography className={classes.heading}>Market Cap:{" "}</Typography>
              &nbsp;&nbsp;
              <Typography 
              variant='h5'
              style={{
                fontFamily:'Montserrat',
              }}>
                {symbol}{' '} 
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0,-6)
                )}M
              </Typography>
        </span>
       </div>
      </div>
      {/* chart */}
     <CoinInfo coin={coin}/>
    </div>
  )
}

export default CoinPage
