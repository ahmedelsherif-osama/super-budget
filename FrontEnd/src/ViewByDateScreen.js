import { useEffect,useState } from "react";
import{Link as ReactLink} from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function ViewByDateScreen() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));


    // Create a JS object like an HTML form element 
    
    
    const user=localStorage.getItem("email");
    console.log(user);
    var formData = new FormData();
    formData.append('user',user);
    console.log(formData);
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
    console.log(data);
    // function Total (userDetails){
    //    var T=0;
    //     for`userDetails`{
    //         T+=product.price;
    //     }

    
    // return    T;
    // }
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

    return(

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
            {rows.map((row) => (
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
        /*<Stack spacing={2}>
           {data?.map((expense) => (
                    
                            <Item>{"Date "}{expense.datestring2}{" item "}{expense.itemname}{" quantity "}{Floatify(expense.quantity)}{" price "}{Floatify(expense.unitprice)}{" total amount "}{Floatify(expense.total)}</Item>
                           
                   ))} 
</Stack>*/
    )
}

export default ViewByDateScreen