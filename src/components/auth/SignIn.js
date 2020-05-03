import React  from "react";
import { useHistory, Link } from 'react-router-dom';
import { triggerChange } from '../../redux/actions/setActions.js';

import fire from "../../firebase/fire";

function SignIn () {

    const history = useHistory();

    const [value, setValues] = React.useState({
        email: "",
        password:""
    });

    const handleChange = prop => event => setValues({...value, [prop]: event.target.value});

    const onSubmit = () => {

        fire.auth().signInWithEmailAndPassword(value.email, value.password).then(()=>{

            setValues({
                email: "",
                password:""
            });

            history.push('/');

        }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;

            console.log( `${ errorCode }: ${ errorMessage }` );
        });
    };

    return(
        <div>
            <input onChange={ handleChange("email") } placeholder={ "Email..." } value={ value.email }/>
            <input onChange={ handleChange("password") } placeholder={ "Password..." } type={ "password" } value={ value.password }/>

            <button onClick={ onSubmit }>Submit</button>
            <br/>
            <br/>
            <Link to={ "/signup" }>Sign Up</Link>

        </div>
    )
}

export default SignIn;
