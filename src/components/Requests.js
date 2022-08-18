import React, {useState, useEffect} from 'react';
import userService from "../services/user";
import {swalDeleteForm, swalError, swalSuccess} from "../utils/swal";

function Requests(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = async () => {
        await userService.getRequests()
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                setData(result.data);
            });
    }

    const renderRequests = () => {
        if (!data || data.length === 0) {
            return <tr>
                <td colspan="8">No new requests found.</td>
            </tr>
        }

        return data.map(k => {
            return <tr>
                <td>{k.name}</td>
                <td>{k.address}</td>
                <td>{k.email}</td>
                <td>{k.goal}</td>
                <td>{k.experienced}</td>
                <td>{k.paymentTitle}</td>
                <td>{k.history}</td>
                <td className="text-center">
                    <button className="btn btn-sm btn-outline-danger" onClick={e => handleDelete(`${k._id}`)}>Delete
                    </button>
                    <button className="btn btn-sm btn-outline-success" style={{marginLeft: 5}}
                            onClick={e => handleApprove(`${k._id}`)}>Approve
                    </button>
                </td>
            </tr>
        });
    }

    const handleApprove = id => {
        userService.approve(id)
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }
                swalSuccess(`Request approved successfully`);
                reload();
            });
    }

    const handleDelete = id => {
        swalDeleteForm(() => {
            userService.delete(id)
                .then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    reload();
                });
        });
    }

    return (
        <div className="container-fluid">
            <div className="row mt-30">
                <div className="col">
                    <h4>Signup Requests</h4>
                </div>
            </div>
            <div className="row mt-30">
                <div className="col">
                    <div className="table-responsive w-100">
                        <table className="table table-bordered table-hover table-sm">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Goal</th>
                                <th>Experienced</th>
                                <th>Account Title</th>
                                <th>History</th>
                                <th className="text-center">Options</th>
                            </tr>
                            </thead>
                            <tbody>
                            {renderRequests()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Requests;