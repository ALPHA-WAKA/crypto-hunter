import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import {createTheme,ThemeProvider,Container,makeStyles,Table,TableBody,TableHead,TableRow,TableCell,LinearProgress,Typography,TextField,TableContainer} from '@material-ui/core'

import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';
import { Pagination } from '@material-ui/lab';

const CoinsTable = () => {
    const[coins,setCoins]=useState([]);
    const[loading,setLoading]=useState(false);
    const[search,setSearch]=useState('');
    const[page,setPage]=useState(1);
    const {currency,symbol}=CryptoState()
    const history=useHistory()
    const fetchCoins=async()=>{
        setLoading(true)
        const { data }= await axios.get(CoinList(currency));
        setCoins(data)
        setLoading(false)
    }
console.log(coins);
    useEffect(()=>{
        fetchCoins()
    },[currency])

    const darkTheme=createTheme({
        palette:{
          primary:{
            main:'#fff',
          },
          type:'dark'
        },
      })
      const handleSeach=()=>{

      return  coins.filter((coin)=>
            coin.name.toLowerCase().includes(search)||
            coin.symbole.toLowerCase().includes(search)

        )
      }

      const useStyles=makeStyles(()=>({
        row:{
            backgroundColor:'#16171a',
            cursor:'pointer',
            '&:hover':{
                backgroundColor:'#131111',
            },
            fontFamily:'Montserrat'
        },
        pagination:{
            "& .MuiPaginationItem-root":{
                color:'gold',
            }
        }
      
      }))
      const classes=useStyles()
  return (
    <ThemeProvider theme={darkTheme}>
     <Container style={{ textAlign:"center"}}>
      <Typography
      variant='h4'
      style={{margin:18,fontFamily:"Montserrat"}}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField 
      label='Search For a Crypto Currency...'
       variant='outlined'
       style={{marginBottom:"28",width:'100%'}}
       onChange={(e)=>{setSearch(e.target.value)}}
       />
       <TableContainer>
        {
            loading ?(
                <LinearProgress style={{backgroundColor:'gold'}}/>
            ):(
                <Table>
                      <TableHead style={{backgroundColor:'#EEBC1D'}} >
                          <TableRow>
                            {["coin","Price","24h Change","Market Cap"].map((head) =>(
                                <TableCell
                                style={{
                                    color:'black',
                                    fontWeight:"700",
                                    fontFamily:"Montserrat",
                                }}
                                key={head}
                                align={head==='coin' ?'':'right'}
                                >
                                    {head}
                                </TableCell>
                            ))}
                          </TableRow>
                      </TableHead>
                     
<TableBody>
  {handleSeach()
  .slice((page-1)*10,(page-1)*10 +10)
  .map((row) => {
    const profit = row.price_change_percentage_24h > 0;
    return (
      <TableRow
        onClick={() => history.push(`/coins/${row.id}`)}
        className={classes.row}
        key={row.name}
      >
        <TableCell
          component='th'
          scope='row'
          style={{
            display: 'flex',
            gap: 15,
          }}
        >
          <img
            src={row?.image}
            alt={row.name}
            height='50'
            style={{ marginBottom: '10' }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                textTransform: 'uppercase',
                fontSize: '22',
              }}
            >
              {row.symbol}
            </span>
            <span style={{ color: 'darkgray' }}>{row.name}</span>
          </div>
        </TableCell>
        <TableCell
          align='right'
       
        >
      {symbol}{' '} 
      {numberWithCommas(row.current_price.toFixed(2))}
      </TableCell>
      <TableCell
          align='right'
          style={{
            color: profit ? 'rgb(14,203,129)' : 'red',
            fontWeight: 500,
          }}
        >
          {profit && "+"}
          {row.price_change_percentage_24h.toFixed(2)}%
        </TableCell>
        <TableCell
          align='right'
        >
              {symbol}{' '} 
      {numberWithCommas(row.market_cap.toString().slice(0, -6))}
      M
    
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>


                </Table>
            )
        }

       </TableContainer>
   <Pagination
   style={{
    padding:'20',
    width:'100%',
    display:"flex",
    justifyContent:"center",
   }}
   classes={{ul: classes.pagination}}
   count={(handleSeach()?.length / 10).toFixed(0)}
   onChange={(_,value)=>{
    setPage(value);
    window.scroll(0,450);
   }}
   />
     </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
