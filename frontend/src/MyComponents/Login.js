import React, { useState } from "react"
import PropTypes from 'prop-types';
import { Redirect } from "react-router";
import { Link } from "react-router-dom";




export default function Login(props) {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    });

    function handleInput(event) {

        setUserInfo(previousData => {
            return {
                ...previousData,
                [event.target.id]: event.target.value
            }
        })
    }

    console.log(props.logged_in)

    if (props.logged_in === true ) {
        return <Redirect to='/' />
    }

    return (
        <div id='login-container' className='p-3 main'>
            <div className="container mb-5" id="login-form">
                <div className='alert alert-danger alert-dismissible' role='alert' style={{ display: 'none' }}></div>
                <form onSubmit={event => props.handle_login(event, userInfo)}>
                    <div className='mb-3'>
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={userInfo.username}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="username"
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={userInfo.password}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="password"
                        />
                    </div>
                    <div className='mb-3'>
                        <input
                            type="submit"
                            value="LOGIN"
                            className="btn btn-primary w-100"
                        />
                    </div>
                    <div className='my-4 text-center'>
                        <p>Do Not Have Account? Register <Link to='/signup'>Here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    handle_login: PropTypes.func.isRequired,
    logged_in: PropTypes.bool.isRequired,
}