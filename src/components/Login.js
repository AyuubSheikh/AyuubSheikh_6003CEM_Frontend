import React, {useState, useEffect} from 'react';
import userService from '../services/user';
import session from '../services/session';
import {Redirect} from 'react-router-dom';
import messageService from "../services/message";

export default function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [redirectTo, setRedirectTo] = useState(null);
    const [allowMessage, setAllowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
    }, []);

    const handleLogin = async e => {
        e.preventDefault();

        await userService.login({email: email, password: password})
            .then(result => {
                if (result.error) {
                    if(!result.error.user) {
                        setErrorMessage(result.error.message);
                        setAllowMessage(false);
                        return;
                    }
                    else {
                        setErrorMessage(result.error.message);
                        setAllowMessage(true);
                        setUserId(result.error.user._id);
                        return;
                    }
                }

                if (result.data) {
                    const data = result.data;
                    setErrorMessage('');
                    setSuccessMessage("Login successful! Redirecting...");

                    session.set('loggedIn', true);
                    session.set('user', data);
                    props.onLogin();
                    setRedirectTo(`/`);
                }
            });
    }

    const handleSend = e => {
        e.preventDefault();

        if(message.length === 0 || !userId) return;

        messageService.add(userId, message, Date.now())
            .then(result => {
                if (result.error) {
                    setErrorMessage(result.error);
                    return;
                }

                setErrorMessage(null);
                setSuccessMessage(`Message sent to staff.`);
                setMessage("");
            });
    }

    return (
        <div className="container-fluid text-center div-login" style={{marginTop: '50px', width: '600px'}}>
            {redirectTo && <Redirect push to={redirectTo}/>}
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12">
                    <h2 className="m-4">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input type="email" className="form-control"
                                   placeholder="Email" required="required"
                                   value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control"
                                   placeholder="Password" required="required"
                                   value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>

                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                        <a href="/signup" className="btn btn-link">Signup here</a>

                        <button type="submit" className="btn btn-outline-primary" onClick={handleLogin}>
                            Login
                        </button>
                        {
                            allowMessage &&
                                <>
                            <div className="row mt-30">
                                <div className="col">
                                <textarea className="form-control" placeholder="Send inquiry to staff..."
                                    value={message} onChange={e => setMessage(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="row mt-10">
                            <div className="col text-right">
                                <button type="button" className="btn btn-outline-primary" onClick={handleSend}>
                                    Send
                                </button>
                            </div>
                            </div>
                            </>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}