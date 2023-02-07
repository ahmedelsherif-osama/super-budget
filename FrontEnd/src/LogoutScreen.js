import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { Redirect, Route } from 'react-router-dom';
import LayoutRoute from './LayoutRoute';
import HomeScreen from './HomeScreen';
import GuestLayoutRoute from './GuestLayoutRoute';

function LogoutScreen(props){
    const { loggedIn, avatar, logoutUser } = React.useContext(UserContext)
    logoutUser(UserContext)
    
    return(
      
        <LayoutRoute path="/" exact={true} component={HomeScreen} />
       
        
    );
}

export default LogoutScreen;