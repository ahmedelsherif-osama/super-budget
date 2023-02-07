import { useEffect, useContext, useState} from "react";
import {UserContext} from './UserContext.js';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Checkbox } from "@mui/material";


function ProfileScreen() {



    const [ userDetails, setUserDetails ] = useState();
    const { jsonwebtoken, updateUser } = useContext(UserContext);

    var [formState, setFormState] = useState(null);
    var [errorsState, setErrorsState] = useState([]);
    var [changePassword, setChangePassword] = useState(false);

    var firstNameField;
    var lastNameField;
    var emailField;
    var passwordField;
    var avatarField;
    var passwordRadio;

    useEffect(
        function() {

            fetch(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/find`,
                {
                    'method': 'POST',
                    'headers': {
                        'Authorization': `Bearer ${localStorage.getItem('jsonwebtoken')}`
                    },
                    // 'body': {}
                }
            )
            // This will recieve string data and convert to json
            .then(
                function(backendReponse) {
                    return backendReponse.json()
                }
            )
            // This will receie the converted json
            .then(
                function(jsonResponse) {
                    setUserDetails(jsonResponse);
                    updateUser(
                        {
                            jsonwebtoken,
                            ...jsonResponse,
                        }
                    )
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


    var formData = new FormData();

    function attachFile(evt) {

        console.log('file data', evt.target.files)
        // Creating an array from the files attached by user
        var files = Array.from(evt.target.files);

        files.forEach(
            function(fileAttachment, index) {
                formData.append(index, fileAttachment);
            }
        )
    }
    
    function update() {

        // 2. Validate the fields
        var errors = [];

        if(emailField.value.length === 0) {
            errors.push('Please enter your email');
        }

        if(passwordField.value.length === 0 && changePassword === true) {
            errors.push('Please enter your password');
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
            formData.append('firstName', firstNameField.value);
            formData.append('lastName', lastNameField.value);
            formData.append('email', emailField.value);
            if (changePassword) {
                formData.append('password', passwordField.value);
            }

            fetch(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/update`,
                {
                    'method': 'PUT',
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
                        console.log('backend response /users/update', jsonResponse)
                        setFormState("success");

                        // Update the user context
                        updateUser(
                            {
                                ...userDetails,
                                ...jsonResponse
                            }
                        )
                    }
                    else {
                        setFormState("backend error");
                    }
                }
            )
            .catch(
                // 8. If backends sends error, go to "backend error"
                function(backendError) {
                    console.log('backendError at /users/update', backendError)
                    setFormState("backend error");
                }
            )
        }
    }


    function togglePasswordChange(event) {
       setChangePassword(event.currentTarget.checked);
    }

    function addListItem(str) {
        return <li>{str}</li>
    }

    if( userDetails ) {
        return (
            <Container maxWidth="sm">
                <Box pt={8}>
                    <Typography component="h1" variant="h2">
                        Profile Settings
                    </Typography>
                </Box>

                <Box mt={4} mb={4}>
                    <Typography component="p" variant="body1" gutterBottom>
                        Upload your profile picture (optional)
                    </Typography>

                    <br/>

                    <Box display="flex" justifyContent="center" flexDirection="column">
                        <Avatar alt='Profile Picture' 
                        src={userDetails.avatar} 
                        sx={{width: 256, height: 256, margin: '0 auto'}}/> 

                        <Button size="small" variant="contained" component="label">
                            Upload
                            <input 
                                ref={function(thisElement){ avatarField = thisElement }} 
                                onClick={attachFile}
                                onChange={attachFile}
                                hidden accept="image/*" 
                                multiple type="file" 
                            />
                        </Button>
                    </Box>
                </Box>
                <Box mt={4} mb={2}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={ 
                            function( thisElement ){
                                firstNameField = thisElement;
                            } 
                        }
                        label="Firstname" 
                        required={true}
                        defaultValue={userDetails.firstName}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={ 
                            function( thisElement ){
                                lastNameField = thisElement;
                            } 
                        }
                        label="Lastname" 
                        required={true}
                        defaultValue={userDetails.lastName}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        inputRef={ 
                            function( thisElement ){
                                emailField = thisElement;
                            } 
                        }
                        label="Email" 
                        required={true}
                        defaultValue={userDetails.email}
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                        disabled={!changePassword} 
                        inputRef={ 
                            function( thisElement ){
                                passwordField = thisElement;
                            } 
                        }
                        label="Password" 
                        />
                    </FormControl>
                    <Checkbox 
                    onChange={togglePasswordChange}
                    inputRef={function(thisElement){passwordRadio = thisElement}} /> Change password?
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

export default ProfileScreen;