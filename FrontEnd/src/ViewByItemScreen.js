import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect,useState } from "react";
import { Menu } from '@mui/material';
import { Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { waitFor } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';


export default function ViewByItemScreen() {

    const user=localStorage.getItem("email");
   
    var formData = new FormData();
    formData.append('user',user);
    const [userDetails, setUserDetails]  = useState();
    var data;
    var T=0;
    useEffect(
        function() {
            fetch(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/expenses/viewbydate`,
                {
                    'method': 'POST',
                   'body':formData
                    
                }
            )
            .then(
                function(backendResponse){
                    return backendResponse.json()
                }
            )
            .then(
                function(jsonResponse){
                    setUserDetails(jsonResponse);
                }
            )
            .catch(
                function(backendError){
                    console.log('backendEroor',backendError)
                }
            )
        },
        []
      );
    
    data=userDetails;
  

    function Floatify(string){
        string=JSON.stringify(string)
        string=string.slice(19)
        string=string.slice(0,string.indexOf('"}'))
        string=parseFloat(string)
        return string;
   }
   function createData(Date, Item, Quantity, Price, TotalAmount) {
    return { Date, Item, Quantity, Price, TotalAmount };
  }
    
   const rows = [  ];
   let buffer;
   {data?.map((expense) => (
                    
    buffer=createData(expense.datestring2,expense.itemname,Floatify(expense.quantity),Floatify(expense.unitprice),Floatify(expense.total)),
    rows.push(buffer)
))}



  const [dropdownitem, setDropDownItem] = React.useState('');

  const handleChange = (event) => {
   
    setDropDownItem(event.target.value);
    
    
  };

function GetItem(array){
    var returnArray=[];
    array.map((row) => (
          returnArray.push(row.Item)
      ))
     return returnArray;

    }
    
    let uniqueItems = [...new Set(GetItem(rows))];
    let results= rows.filter(row => row.Item==dropdownitem);
    
    
    
    


   

  return (
    <Fragment>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Item</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dropdownitem}
          label="dropdown item"
          onChange={handleChange}
        >
          {uniqueItems.map((row) => (
              <MenuItem value={row}>
                {row}
              </MenuItem>
            ))}
          
        
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Item</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price&nbsp;(AED)</TableCell>
              <TableCell align="right">Total Amount&nbsp;(AED)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            
            results.map((row) => (
                
              <TableRow
                key={row.Date}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Date}
                </TableCell>
                <TableCell align="right">{row.Item}</TableCell>
                <TableCell align="right">{row.Quantity}</TableCell>
                <TableCell align="right">{row.Price}</TableCell>
                <TableCell align="right">{row.TotalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    
    
</Fragment>
  );
}