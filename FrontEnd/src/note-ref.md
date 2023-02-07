function RegistrationScreen() {

    ...

    let firstNameField;

    ...



    return(

        ...
            <TextField 
            inputRef={
                function(xyz) {
                    firstNameField = xyz;
                }
            }/>
        ...

    )


}