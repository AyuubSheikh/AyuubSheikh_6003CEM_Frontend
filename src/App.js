import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import session from './services/session';
import Header from "./components/Header";
import Login from './components/Login';
import Signup from './components/Signup';
import UpdatePassword from "./components/UpdatePassword";
import Requests from "./components/Requests";
import Classes from "./components/Classes";
import Home from "./components/Home";
import Messages from "./components/Messages";
import History from "./components/History";
import Profile from "./components/Profile";

// App component manages the structure/skeleton of the whole app
// all other components will be called through this
function App() {

    // managing some helper variables in state
    const [loggedIn, setLoggedIn] = useState(false);

    // check if the user is logged in on the page load
    useEffect(() => {
        if(session.get('user') && session.get('user')._id !== undefined) {
            setLoggedIn(true);
        }
    }, []);

    return (
        // setting up browser router
        <BrowserRouter>
            <Header loggedIn={loggedIn} onLogout={() => setLoggedIn(false)} />
            <Switch>
                <Route exact path='/' render={props => <Home />}/>
                <Route exact path='/login' render={props => <Login onLogin={() => setLoggedIn(true)} />}/>
                <Route exact path='/signup' render={props => <Signup onLogin={() => setLoggedIn(true)} />}/>
                <Route exact path='/requests' render={props => <Requests />}/>
                <Route exact path='/messages' render={props => <Messages />}/>
                <Route exact path='/history' render={props => <History />}/>
                <Route exact path='/classes' render={props => <Classes />}/>
                <Route exact path='/up' render={props => <UpdatePassword />}/>
                <Route exact path='/profile' render={props => <Profile />}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
