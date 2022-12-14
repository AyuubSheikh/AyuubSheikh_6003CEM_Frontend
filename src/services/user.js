import axios from 'axios';
import session from "./session";

// managing all API requests for Users in a separate file for code consistency
export default class {

    // method to get all Users with a search keyword
    static getRequests = async keyword => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            keyword: keyword
        };

        // using axios liberary to call API
        // we are getting API URL from the *.env file
        await axios.post(`${process.env.REACT_APP_API_URL}/users/requests`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static approve = async id => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${process.env.REACT_APP_API_URL}/users/approve/${id}`)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static get = async id => {
        let result = {
            data: null,
            error: null
        };

        await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static delete = async id => {
        let result = {
            data: null,
            error: null
        };

        await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static login = async ({ email, password }) => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            email: email,
            password: password
        };

        await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static signup = async obj => {
        let result = {
            data: null,
            error: null
        };

        await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, obj)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static updatePassword = async password => {
        let result = {
            data: null,
            error: null
        };

        const data = {
            password: password
        };

        await axios.post(`${process.env.REACT_APP_API_URL}/users/up/${session.get('user')._id}`, data)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }

    static update = async obj => {
        let result = {
            data: null,
            error: null
        };

        const fd = new FormData();
        for (const [key, value] of Object.entries(obj)) {
            fd.append(key, value);
        }

        await axios.post(`${process.env.REACT_APP_API_URL}/users/update/`, fd)
            .then(resp => {
                if (resp.status === 200) {
                    result.data = resp.data;
                }
            })
            .catch(err => {
                result.error = err.response.data;
            });

        return result;
    }
}