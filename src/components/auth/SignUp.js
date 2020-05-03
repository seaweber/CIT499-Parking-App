import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import fire from "../../firebase/fire";
import { triggerChange, setCurrentUser } from "../../redux/actions/setActions";


function SignUp () {

    const history = useHistory();

    const [invalid, setInvalid] = useState(false);

    const [value, setValues] = React.useState({
        email: "",
        password:"",
        repeatPassword: "",
        name:""
    });

    const dispatch = useDispatch();

    const handleChange = prop => event => {
        setValues({...value, [prop]: event.target.value});
    };

    const onSubmit = ()=>{

        if (value.password !== value.repeatPassword) {

            setInvalid(true);
            return;
        }

        fire.auth().createUserWithEmailAndPassword( value.email, value.password ).then(() => {

            let user = fire.auth().currentUser;

            user.updateProfile({
                displayName: value.name
            }).then(function() {
                setValues({
                    email: "",
                    password:"",
                    repeatPassword: "",
                    name:""
                });

                dispatch( triggerChange() );
                dispatch( setCurrentUser( value.name ) );
                history.push('/');

            }).catch( error => {
                // An error happened.
                console.log( error );
            });



        }).catch(error => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;

            console.log( `${ errorCode }: ${ errorMessage }` );
        });
    };


    return(
        <div>
            <input onChange={ handleChange("email") } placeholder={ "Email" } value={ value.email }/>
            <input onChange={ handleChange("password") } placeholder={ "Password" } type={ "password" } value={ value.password }/>
            <input onChange={ handleChange("repeatPassword") } placeholder={ "Repeat Password" } type={ "password" } value={ value.repeatPassword }/>
            <input onChange={ handleChange("name") } placeholder={ "Name" } value={ value.name }/>

            <button onClick={ onSubmit }>Submit</button>
            <br/>
            { invalid && <h2>Passwords must match!</h2> }
        </div>
    )
}

export default SignUp;
