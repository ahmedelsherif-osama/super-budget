import { useEffect,useState } from "react";
import{ Link, Link as ReactLink, NavLink, Redirect, Router} from 'react-router-dom';
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
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Insights } from "@mui/icons-material";
import DeleteExpenseScreen from "./DeleteExpenseScreen";
import ListItemButton from '@mui/material/ListItemButton';
import PrivateLayoutRoute from './PrivateLayoutRoute';
import UpdateExpenseScreen from "./UpdateExpenseScreen";
import { useContext } from "react";
import { ExpenseContext } from "./ExpenseContext";
import { Fragment } from "react";
import { UserContext } from "./UserContext";

function ViewByDateScreen() {
  
  const {datestring, updateDate} = useContext(UserContext);
  const {jsonwebtoken, updateUser} = useContext(UserContext);
  const [ userDetails2, setUserDetails2 ] = useState();
  const {value,setValue} = useContext(ExpenseContext);
  
  console.log(value);

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
                    
    buffer=createData(expense.datestring,expense.itemname,Floatify(expense.quantity),Floatify(expense.unitprice),Floatify(expense.total)),
    rows.push(buffer)
))} 

let Date;
var formData2 = new FormData();
    

function DeleteOne(){
  

    
  formData2.append('user',user);
  formData2.append('datestring',Date);
    fetch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/expenses/delete`,
        {
            'method': 'DELETE',
           'body':formData2
            
        }
    )
    .then(
        function(backendResponse){
          refresh();
            
        }
    )
   
    .catch(
        function(backendError){
            console.log('backendEroor',backendError)
        }
    )
 
  
  
 
}

function refresh(){window.location.reload(true);}





function EditOne(){
  
}

    return(
        <Fragment>
          
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Item</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price&nbsp;(AED)</TableCell>
              <TableCell align="right">Total Amount&nbsp;(AED)</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
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
                <TableCell align="right"> <Link onClick={()=>setValue(row.Date)}  to={'/updatexpense'} ><Button variant="outlined" startIcon={<EditIcon />}>Edit</Button></Link></TableCell>
                <TableCell align="right"> <Button onClick={()=>{ if (window.confirm('Are you sure you wish to delete this expense?')){Date=row.Date; DeleteOne();}else{refresh();}}} variant="outlined" startIcon={<DeleteIcon />}>Delete</Button></TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

</Fragment>
    )
}

export default ViewByDateScreen