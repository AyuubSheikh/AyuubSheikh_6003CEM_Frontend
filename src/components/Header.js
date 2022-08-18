import React, {useState} from 'react';
import session from '../services/session';
import {Redirect, NavLink} from 'react-router-dom';
import {swalError, swalForm, swalSuccess} from "../utils/swal";

export default function Header(props) {
    const [redirectTo, setRedirectTo] = useState(null);

    const handleLogout = e => {
        e.preventDefault();
        props.onLogout();

        setTimeout(() => {
            session.clear();
            setRedirectTo('/');
        }, 500);
    }

    return (
        <div>
            {redirectTo && <Redirect push to={redirectTo}/>}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/" style={{color: 'purple', fontWeight: '500'}}>
                    <i className="fa fa-dumbbell" style={{fontSize: '26px', marginRight: '10px'}}></i>
                    YLG
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        props.loggedIn === true &&
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">My Profile</a>
                            </li>
                            {
                                session.get('user') && parseInt(session.get('user').type) === 1 &&
                                    <>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/requests">Signup Requests</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/messages">Messages</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/history">History</a>
                                    </li>
                                    </>
                            }
                            {
                                session.get('user') &&
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/classes">Classes</a>
                                        </li>
                                    </>
                            }
                        </ul>
                    }
                    <div className="navbar-nav ml-auto">
                        {
                            props.loggedIn !== true &&
                            <ul className="navbar-nav pull-right">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">Signup</NavLink>
                                </li>
                            </ul>
                        }
                        {
                            props.loggedIn === true &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {session.get('user') && session.get('user').name}
                                </a>
                                <div className="dropdown-menu dropdown-menu-right"
                                     aria-labelledby="navbarDropdownMenuLink">
                                    <button className="dropdown-item" onClick={e => setRedirectTo("/up")}>
                                        Update password
                                    </button>
                                    <button className="dropdown-item" onClick={e => handleLogout(e)}
                                            style={{color: 'red'}}><i className="fa fa-power-off"
                                                                      style={{marginRight: '5px'}}></i>Logout
                                    </button>
                                </div>
                            </li>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}