import React, {useState, useEffect} from 'react';
import messageService from "../services/message";
import {swalDeleteForm, swalError, swalReply, swalSuccess} from "../utils/swal";
import session from "../services/session";

function History(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = async () => {
        await messageService.getHistory()
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
                <td colspan="4">No new messages found.</td>
            </tr>
        }

        return data.map(k => {
            return <tr style={{backgroundColor: k.status === true ? '#a5dca5' : '#e6cfa4'}}>
                <td>{k.senderId && k.senderId.name || ""}</td>
                <td>{k.message}</td>
                <td>{k.date}</td>
                <td>{k.status === true ? "Done" : "Pending"}</td>
                <td>{k.status === true ? k.repliedBy.name : "--"}</td>
                <td>{k.status === true ? k.reply : "--"}</td>
                <td>{k.status === true ? k.dateReplied : "--"}</td>
            </tr>
        });
    }

    const handleReply = id => {
        swalReply(message => {
            messageService.reply(id, message, session.get('user')._id)
                .then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }

                    swalSuccess(`Reply sent successfully`);
                    reload();
                });
        });
    }

    return (
        <div className="container-fluid">
            <div className="row mt-30">
                <div className="col">
                    <h4>Messages History</h4>
                </div>
            </div>
            <div className="row mt-30">
                <div className="col">
                    <div className="table-responsive w-100">
                        <table className="table table-bordered table-hover table-sm">
                            <thead>
                            <tr>
                                <th>Sender</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Replied By</th>
                                <th>Reply</th>
                                <th>Reply Date</th>
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

export default History;