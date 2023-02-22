
import { ExpenseContext } from "./ExpenseContext";
import { Box } from "@mui/system";
import { useEffect, useContext, useState} from "react";
import React, {UserContext} from './UserContext.js';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Checkbox } from "@mui/material";


function UpdateExpenseScreen(){

    const [ userDetails, setUserDetails ] = useState();
    const { datestring, updateDate } = useContext(UserContext);
    const {value, setValue} = useContext(ExpenseContext);
    console.log(value);
    var [formState, setFormState] = useState(null);
    var [errorsState, setErrorsState] = useState([]);
    var [changePassword, setChangePassword] = useState(false);

    var datestringField;
    var itemnameField;
    var quantityField;
    var priceField;
    var totalamountField;

    const user=localStorage.getItem("email");
    
    
    //const {value, setValue} = useContext(ExpenseContext);
    
    var formData = new FormData();
    var formData2 = new FormData();
    formData.append('user',user);
    formData.append('datestring',value);
   
    useEffect(
        function() {

            fetch(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/expenses/find`,
                {
                    'method': 'POST',
                    'body':formData
                   
                }
            )

            
            .then(
                function(backendReponse) {
                   
                    return backendReponse.json();

                }
            )
            // This will receie the converted json
            .then(
                function(jsonResponse) {
                    setUserDetails(jsonResponse);
                    
                    
                    

                }
            )
            // This will catch errors if any
            .catch(
                function(backendError) {
                    console.log('backendError', backendError)
                }
            )
        },

        // This array is empty because useEffect will run once only
        []
    );

    var data=userDetails;
        console.log(userDetails);
    //console.log(userDetails.datestring);
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
   function getExpenseDetails(whichDetail){data?.map((expense) => (
                    
    buffer=createData(expense.datestring2,expense.itemname,Floatify(expense.quantity),Floatify(expense.unitprice),Floatify(expense.total)),
    rows.push(buffer.Date)
    
))
switch (whichDetail) {
    case "Date":
    return buffer.Date;
    
    case "Item":
    return buffer.Item;
    
    case "Quantity":    
    return buffer.Quantity;
    
    case "Total":
    return buffer.TotalAmount;
        
    case "Price":
    return buffer.Price;
    
    }
    
   
}

    function refresh(){window.location.reload(true);}


    function update() {

        

        // 2. Validate the fields
        var errors = [];

        if(itemnameField.value.length === 0) {
            errors.push('Please enter the item\'\s name');
        }

        if(quantityField.value.length === 0 ) {
            errors.push('Please enter the quantity');
        }
        if(priceField.value.length === 0 ) {
            errors.push('Please enter the unit price');
        }


        // 3. If any field is not validated, go to "client error"
        if( errors.length > 0 ) {
            setFormState("client error");
            setErrorsState( errors );
        }

        // 4. If all fields are valid
        else {
            // 5. Go to "loading"
            setFormState("loading");
            setErrorsState([]);


            // 6. Send data backend
            formData2.append('datestring', datestring);
            formData2.append('user', user);
            formData2.append('itemname', itemnameField.value);
            formData2.append('quantity', quantityField.value);
            formData2.append('unitprice', priceField.value);
          
            fetch(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/expenses/update`,
                {
                    'method': 'PUT',
                    'body': formData2
                }
            )
            .then(
                function(backendResponse) {
                    // Convert the HTTP string response to JSON
                 
                    return backendResponse.json();
                    
                }
            )
            .then(
                // 7. If backend sends success, go to "success"
                function(jsonResponse) {
                    
                    if(jsonResponse.status === "ok") {
                        console.log('backend response /expenses/update', jsonResponse)
                        setFormState("success");
                        

                 
                    }
                    else {
                        setFormState("backend error");
                    }
                }
            )
            .catch(
                // 8. If backends sends error, go to "backend error"
                function(backendError) {
                    console.log('backendError at /expenses/update', backendError)
                    setFormState("backend error");
                }
            )
        }
    }
    function addListItem(str) {
        return <li>{str}</li>
    }

    if( userDetails ) {
        return (
            <Container maxWidth="sm">
                <Box pt={8}>
                    <Typography component="h1" variant="h2">
                        Update Expense
                    </Typography>
                </Box>

          
                
                <Box mt={4} mb={2}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={ 
                            function( thisElement ){
                                datestringField = thisElement;
                            } 
                        }
                        label="date" 
                        required={true}
                        defaultValue={ getExpenseDetails("Date")}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={ 
                            function( thisElement ){
                                itemnameField = thisElement;
                            } 
                        }
                        label="item" 
                        required={true}
                        defaultValue={getExpenseDetails("Item")}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={ 
                            function( thisElement ){
                                quantityField = thisElement;
                            } 
                        }
                        label="Quantity" 
                        required={true}
                        defaultValue={getExpenseDetails("Quantity")}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        
                        inputRef={ 
                            function( thisElement ){
                                priceField = thisElement;
                            } 
                        }
                        label="price" 
                        required={true}
                        defaultValue={getExpenseDetails("Price")}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={ 
                            function( thisElement ){
                                totalamountField = thisElement;
                            } 
                        }
                        label="Total Amount" 
                        required={true}
                        defaultValue={getExpenseDetails("Total")}
                        />
                    </FormControl>
                    
                </Box>

                <Box display="flex">
                    
                    {
                        formState !== "loading" &&
                        <Button onClick={update} size="large" variant="contained">Send</Button>
                    }
                    
                    {
                        formState === "loading" &&
                        <CircularProgress />
                    }
                </Box>

                <Box mt={2}>

                    { 
                        formState === "client error" &&
                        <Alert severity="error">
                            <ul>
                            {
                                errorsState.map(addListItem)
                            }
                            </ul>
                        </Alert>
                    }

                    {
                        formState === "success" &&
                        <Alert severity="success">
                            You have logged in successfully!
                        </Alert>
                    }
                </Box>
            </Container>
        )
    } else {
        return(
            <p>Loading...</p>
        )
    }
}

export default UpdateExpenseScreen;
