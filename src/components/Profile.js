import React, { useState, useEffect } from 'react';
import userService from '../services/user';
import session from '../services/session';
import { Redirect } from 'react-router-dom';
import { swalInfo } from '../utils/swal';

export default function Profile(props) {
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [goal, setGoal] = useState('');
    const [experience, setExperience] = useState('');
    const [history, setHistory] = useState('');
    const [title, setTitle] = useState('');
    const [number, setNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [profile, setProfile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        let user = session.get('user');
        setData(user);
    }, []);

    const setData = user => {
        if(user) {
            setFullname(user.name);
            setAddress(user.address);
            setGoal(user.goal || "");
            setExperience(user.experienced || "");
            setHistory(user.history || "");
            setTitle(user.paymentTitle || "");
            setNumber(user.paymentNumber || "");
            setCvv(user.paymentCvv || "");
            setProfile(`${process.env.REACT_APP_API_URL}/${user.pictureId}`);
        }
    }

    const handleUpdate = async e => {
        e.preventDefault();

        if(!session.get('user') || !session.get('user')._id) return;

        let file = document.getElementById('profile-picture').files[0] || null;
        let obj = {
            _id: session.get('user')._id,
            name: fullname,
            address: address,
            goal: goal,
            experienced: experience,
            paymentTitle: title,
            paymentNumber: number,
            paymentCvv: cvv,
            history: history,
            file: file
        };

        await userService.update(obj)
            .then(result => {
                if (result.error) {
                    setErrorMessage(result.error);
                    return;
                }

                if (result.data) {
                    const data = result.data;
                    setData(data);
                    setErrorMessage('');
                    setSuccessMessage("Profile updated successfully.");
                    session.set('user', data);
                }
            });
    }

    return (
        <div className="container-fluid text-center div-signup mt-30" style={{width: '800px' }}>
            {redirectTo && <Redirect push to={redirectTo} />}
            <div className="row">
                <div className="col">
                    <h2 className="m-4">My Profile</h2>
                    <div className="row">
                        <div className="col">
                            <img src={profile} className="profile-picture" />
                        </div>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className="row mt-30">
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
                                <div className="form-group">
                                    <input type="file" id="profile-picture" className="form-control" required="required" />
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
                                <button type="submit" className="btn btn-outline-primary"
                                    onClick={handleUpdate}>Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}