import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import { Redirect, Route } from 'react-router-dom';
import DrawerAppBar from './DrawerAppBar';
import Footer from './Footer';
import { UserContext } from './UserContext';
import AddExpenseScreen from './AddExpenseScreen';


function LayoutRoute(props) {

    const {loggedIn} = useContext(UserContext);

    if (loggedIn) {
        console.log(localStorage.getItem("email"));
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
                <DrawerAppBar {...props}/>
                <Route path={props.path} exact={props.exact} component={props.component} />
                <Footer />
            </Box>
        )
    } else {
        return (
            <Redirect to={'/'} />
        )
    }
}

export default LayoutRoute;