import React, { useEffect, useState } from 'react';
import './App.css';
import fire from "./firebase/fire";
import { useSelector, useDispatch } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { toggleSignedIn } from './redux/actions/setActions'
import GarageMap from './components/map/GarageMap';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

function App () {

    const dispatch = useDispatch();
    const db = fire.firestore();

    // boolean representing whether a user is signed in
    const signedIn = useSelector( state => state.signedIn );

    // currently signed in user
    const [ currentUser, setCurrentUser ] = useState( null );

    useEffect( () => {

        setCurrentUser( fire.auth().currentUser );

        /*
         * Problem: useEffect fires AFTER rendering, so fetching the currentUser here
         * means that it will still be null at by the time things are rendered
         *
         * Solution: initialize currentUser as null in local state instead of redux store,
         * then when you fetch currentUser from firebase and assign it to state,
         * a re-render will be triggered, and currentUser will be available during the re-render
         *
         * Note: This works because unlike literally everything else, state is persisted through renders
         */
        fire.auth().onAuthStateChanged( user => {

            if ( user ) {

                setCurrentUser( user.displayName );
                dispatch( toggleSignedIn( true ) );

            } else {

                setCurrentUser( 'Anonymous' );
                dispatch( toggleSignedIn( false ) );
            }
        })
    }, [ db, dispatch, signedIn ]);

    return (
        <Router>

            <div className="App">

                <Switch>

                    <Route path={"/"} exact component={ GarageMap } >
                        { currentUser }
                        <br/>
                        <br/>
                        { signedIn && <button onClick={ () => fire.auth().signOut() }> Log Out </button> }
                        { signedIn ? <GarageMap/> : <Redirect to={ "/signin" }/> }

                    </Route>

                    <Route path={"/signin"} exact component={ SignIn } >

                        { signedIn && <Redirect to={ "/" }/> }

                    </Route>

                    <Route path={"/signup"} exact component={ SignUp }/>

                </Switch>

            </div>

        </Router>
    );
}

export default App;
