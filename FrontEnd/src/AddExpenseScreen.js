import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


function AddExpenseScreen() {

    // The states are: 
    // (1) null, (2) "client error", (3) "loading", (4) "backend error", (5) "success"
    var [formState, setFormState] = useState(null);
    var [errorsState, setErrorsState] = useState([]);


    // 1. Declare variables (not defined)
    var unitpriceField;
    var itemnameField;
    var brandField;
    var quantityField;
    var totalField;
    var userField;

     
    // Create a JS object like an HTML form element 
    var formData = new FormData();


    function register() {


        // 2. Validate the fields
        var errors = [];

        if(unitpriceField.value.length === 0) {
            errors.push('Please enter the unit price');
        }

        if(itemnameField.value.length === 0) {
            errors.push('Please enter the item name');
        }

        if( brandField.value.length === 0) {
            errors.push('Please enter the brand');
        }

        if(quantityField.value.length === 0) {
            errors.push('Please enter the quantity');
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
            formData.append('unitprice', unitpriceField.value);
            formData.append('itemname', itemnameField.value);
            formData.append('brand',  brandField.value);
            formData.append('quantity', quantityField.value);
            formData.append('user', localStorage.getItem("email"))

            fetch(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/addexpense`,
                {
                    'method': 'POST',
                    'body': formData
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
                        console.log('backend response /addexpense', jsonResponse)
                        setFormState("success");
                    }
                    else {
                        setFormState("backend error");
                        setErrorsState([jsonResponse.message]);
                    }
                }
            )
            .catch(
                // 8. If backends sends error, go to "backend error"
                function(backendError) {
                    console.log('backendError at /addexpense', backendError)
                    setFormState("backend error");
                }
            )
        }
    }

    function addListItem(str) {
        return <li>{str}</li>
    }

    return (
        <Container maxWidth="sm">
            <Box pt={8}>
                <Typography component="h1" variant="h2">
                    Add Expense
                </Typography>
            </Box>

            <Box mt={4} mb={2}>
                <FormControl fullWidth sx={ { mb: 2 } }>
                    <TextField 
                    inputRef={ 
                        function( thisElement ){
                            unitpriceField = thisElement;
                        } 
                    }
                    label="unitprice" required={true}/>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                   <TextField 
                   inputRef={ 
                        function( thisElement ){
                            itemnameField = thisElement;
                        } 
                    }
                   label="itemname" required={true}/>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField 
                    inputRef={ 
                        function( thisElement ){
                             brandField = thisElement;
                        } 
                    }
                    label=" brand" required={true}/>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField 
                    inputRef={ 
                        function( thisElement ){
                            quantityField = thisElement;
                        } 
                    }
                    type="quantity"
                    label="quantity" required={true} />
                </FormControl>

       
            </Box>

 

            <Box display="flex">
                
                {
                    formState !== "loading" &&
                    <Button onClick={register} size="large" variant="contained">Send</Button>
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
                    formState === "backend error" &&
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
                        Expense added successfully!
                    </Alert>
                }
            </Box>
        </Container>
    );

}

export default AddExpenseScreen;