import React, { useState, useEffect } from 'react';
import userService from '../services/user';
import session from '../services/session';
import { Redirect } from 'react-router-dom';
import { swalInfo } from '../utils/swal';

export default function Signup(props) {
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [goal, setGoal] = useState('');
    const [experience, setExperience] = useState('');
    const [history, setHistory] = useState('');
    const [title, setTitle] = useState('');
    const [number, setNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [redirectTo, setRedirectTo] = useState(null);

    const handleSignup = async e => {
        e.preventDefault();
        if (!fullname || fullname.length === 0) {
            setErrorMessage(`Full Name is required.`);
            return;
        }
        if (!email || email.length === 0) {
            setErrorMessage(`Email is required.`);
            return;
        } else {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
                setErrorMessage(`Please enter a valid email address.`);
                return;
            }
        }

        if (!password || password.length === 0) {
            setErrorMessage(`Password is required.`);
            return;
        }

        let obj = {
            name: fullname,
            address: address,
            email: email,
            password: password,
            goal: goal,
            experienced: experience,
            paymentTitle: title,
            paymentNumber: number,
            paymentCvv: cvv,
            history: history,
            type: 2,
            active: false
        };

        await userService.signup(obj)
            .then(result => {
                if (result.error) {
                    setErrorMessage(result.error);
                    return;
                }

                setErrorMessage('');
                setSuccessMessage("Signup successful! Please wait until the staff members accept your request.");
            });
    }

    return (
        <div className="container-fluid text-center div-signup" style={{ marginTop: '50px', width: '800px' }}>
            {redirectTo && <Redirect push to={redirectTo} />}
            <div className="row">
                <div className="col">
                    <h2 className="m-4">Signup</h2>
                    <form onSubmit={handleSignup}>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <input type="text" className="form-control"
                                        placeholder="Full Name" required="required"
                                        value={fullname} onChange={e => setFullname(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <input type="text" className="form-control"
                                        placeholder="Address" required="required"
                                        value={address} onChange={e => setAddress(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <input type="email" className="form-control"
                                        placeholder="Email" required="required"
                                        value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <input type="password" className="form-control"
                                        placeholder="Password" required="required"
                                        value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <select value={goal} onChange={e => setGoal(e.target.value)} className="form-control">
                                        <option value="">Select goal</option>
                                        <option value="Loose weight">Loose weight</option>
                                        <option value="Gain weight">Gain weight</option>
                                        <option value="Boxing">Boxing</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <select value={experience} onChange={e => setExperience(e.target.value)} className="form-control">
                                        <option value="">First time gym?</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <input type="text" className="form-control"
                                        placeholder="Account Title" required="required"
                                        value={title} onChange={e => setTitle(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <input type="text" className="form-control"
                                        placeholder="Card Number" required="required"
                                        value={number} onChange={e => setNumber(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                    <input type="text" className="form-control"
                                        placeholder="CVV" required="required"
                                        value={cvv} onChange={e => setCvv(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <input type="text" className="form-control"
                                        placeholder="Medical history" required="required"
                                        value={history} onChange={e => setHistory(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <a href="/login" className="btn btn-link">Login here</a>
                                <button type="submit" className="btn btn-outline-primary"
                                    onClick={handleSignup}>Signup
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}