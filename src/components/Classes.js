import React, {useState, useEffect} from 'react';
import {swalDeleteForm, swalError, swalForm, swalLoading, swalSuccess} from "../utils/swal";
import classService from "../services/class";
import Swal from "sweetalert2";
import session from "../services/session";

function Classes(props) {

    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        reload();
    }, [keyword]);

    const reload = async () => {
        await classService.getAll(keyword)
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                setData(result.data);
            });
    }

    const renderClasses = () => {
        if (!data || data.length === 0) {
            return <tr>
                <td colspan="3">No classes found.</td>
            </tr>
        }

        return data.map(k => {
            return <tr>
                <td>{k.title}</td>
                <td>{k.description}</td>
                {
                    session.get('user') && parseInt(session.get('user').type) === 1 &&
                    <td className="text-center">
                        <button className="btn btn-sm btn-outline-dark" onClick={e => handleEdit(`${k._id}`)}>
                            Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" style={{marginLeft:5}} onClick={e => handleDelete(`${k._id}`)}>
                            Delete
                        </button>
                    </td>
                }
            </tr>
        });
    }

    const handleEdit = id => {

        classService.get(id)
            .then(result => {
                if (result.error) {
                    swalError(result.error);
                    return;
                }

                let c = result.data;
                swalForm(c.title, c.description, val => {
                    swalLoading();
                    classService.update(id, val.title, val.description)
                        .then(result => {
                            if (result.error) {
                                swalError(result.error);
                                return;
                            }

                            Swal.close();
                            swalSuccess('Class updated successfully!');
                            reload();
                        });
                });
            });
    }

    const handleDelete = id => {
        swalDeleteForm(() => {
            classService.delete(id)
                .then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    reload();
                });
        });
    }

    const handleCreate = e => {
        e.preventDefault();

        swalForm('', '', val => {
            swalLoading();
            classService.add(val.title, val.description)
                .then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    Swal.close();
                    swalSuccess('Class added successfully!');
                    reload();
                });
        });
    }

    return (
        <div className="container-fluid">
            <div className="row mt-30">
                <div className="col">
                    <h4>Classes</h4>
                </div>
                {
                    session.get('user') && parseInt(session.get('user').type) === 1 &&
                    <div className="col text-right">
                        <button className="btn btn-outline-primary" onClick={handleCreate}>Create</button>
                    </div>
                }
            </div>
            <div className="row mt-30">
                <div className="col">
                    <input className="form-control" type="text"
                           placeholder="Search by Title or Description..."
                           value={keyword} onChange={e => setKeyword(e.target.value)}/>
                </div>
            </div>
            <div className="row mt-30">
                <div className="col">
                    <div className="table-responsive w-100">
                        <table className="table table-bordered table-hover table-sm">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                {
                                    session.get('user') && parseInt(session.get('user').type) === 1 &&
                                    <th className="text-center">Options</th>
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {renderClasses()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Classes;