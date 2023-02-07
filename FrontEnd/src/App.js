import React from 'react';
import { useEffect, useContext } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';
import LayoutRoute from './LayoutRoute';
import GuestLayoutRoute from './GuestLayoutRoute';
import PrivateLayoutRoute from './PrivateLayoutRoute';
import ProfileScreen from './ProfileScreen';
import LogoutScreen from './LogoutScreen';
import AddExpenseScreen from './AddExpenseScreen';
import ViewByDateScreen from './ViewByDateScreen';
import ViewByItemScreen from './ViewByItemScreen';

import {UserContext} from './UserContext';

function App() {
     const { jsonwebtoken, updateUser } = useContext(UserContext);

      useEffect(
    function() {
      // fetch function
      fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/users/find`,{
        "method": 'POST',
        "headers": {
            //"Content-Type": "multipart/form-data"
            'Authorization' : `Bearer ${localStorage.getItem('jsonwebtoken')}`,
        }
      })
      // Convert the JSON string to an object
      .then(
          (response) => response.json()
      )

      // If Promise was successful
      .then(
          (response) => {              
              // Turn off preloader and reveal success message
              updateUser(
                {
                  "firstName": response.message.firstName,
                  "lastName": response.message.lastName,
                  "email": response.message.email,
                  "password": response.message.password,
                  "avatar": response.message.avatar,
                  "phone": response.message.phone,
                  "jsonwebtoken": jsonwebtoken || response.message.jsonwebtoken
                }
              )
          }
      )

      // If Promise was not fulfilled
      .catch(
          (e) => {
              console.log({e: e})
              // Turn off preloader and reveal error message
          }
      )
    }, []
  )


    return(
        <BrowserRouter>
            <Switch>
                <LayoutRoute path="/" exact={true} component={HomeScreen} />
                <LayoutRoute path="/about" exact={true} component={AboutScreen} />
                <LayoutRoute path="/contact" exact={true} component={ContactScreen} />
                <PrivateLayoutRoute path="/profile" exact={true} component={ProfileScreen} />
                <PrivateLayoutRoute path="/logout" exact={true} component={LogoutScreen}/>
                <PrivateLayoutRoute path="/AddExpense" exact={true} component={AddExpenseScreen}/>
                <PrivateLayoutRoute path="/viewbydate" exact={true} component={ViewByDateScreen}/>
                <PrivateLayoutRoute path="/viewbyitem" exact={true} component={ViewByItemScreen}/>
                <GuestLayoutRoute path="/register" exact={true} component={RegistrationScreen} />
                <GuestLayoutRoute path="/login" exact={true} component={LoginScreen} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;