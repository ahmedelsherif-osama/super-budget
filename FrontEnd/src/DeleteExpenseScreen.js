import PrivateLayoutRoute from './PrivateLayoutRoute';
import HomeScreen from './HomeScreen';
import { useEffect,useState } from "react";
import ViewByDateScreen from './ViewByDateScreen';


function DeleteExpenseScreen(){
    const user=localStorage.getItem("email");
    const datestring=localStorage.getItem("datestring");
    var formData3 = new FormData();
    formData3.append('user',user);
    formData3.append('datestring',datestring);
    useEffect(
        function() {
            fetch(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/expenses/delete`,
                {
                    'method': 'DELETE',
                   'body':formData3
                    
                }
            )
            .then(
                function(backendResponse){
                    return backendResponse.json()
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
    return(
        <PrivateLayoutRoute path="/viewbydate" exact={true} component={ViewByDateScreen} />
    )
}

export default DeleteExpenseScreen;