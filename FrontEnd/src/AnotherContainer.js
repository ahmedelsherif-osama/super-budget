import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import hero4 from './hero4.png';
import { Button } from '@mui/material';
import { margin } from '@mui/system';
import {  Link } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';


export default function AnotherContainer() {

               
  
  return (
    <React.Fragment>
        <Box sx={{ opacity:'100%',backgroundImage:"url(/heroFinal2.png)", paddingBottom:16, paddingLeft:100, paddingTop:19, marginTop:-6}}>
          <Link to="/"  ><Button  sx={{backgroundColor:'purple', width:'400px', color:'white', marginBottom:2 }}>Welcome to Super Budget</Button></Link><br></br>
          <Link to="/addexpense"  ><Button  sx={{backgroundColor:'blue', width:'400px', color:'white', marginBottom:2 }}>Record First Expense?</Button></Link><br></br>
          <Link to="/register"><Button  sx={{backgroundColor:'purple', width:'400px', color:'white', marginBottom:2 }}>Sign Up</Button></Link><br></br>
          <Link to="/about"><Button sx={{backgroundColor:'purple', width:'400px', color:'white', marginBottom:2 }}>What is Super Budget?</Button></Link><br></br>
        </Box>
    </React.Fragment>
  );

}