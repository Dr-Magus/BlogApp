import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Redirect } from "react-router";

export default function Register(props) {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        confirm_password: "",
    });

    const handleInput = (event) => {
        setUserInfo(previousState => {
            return ({
                ...previousState,
                [event.target.id]: event.target.value
            })
        })
    }



    if (props.account_created) {
        return <Redirect to='/' />
    }

    return (
        <>
            <div className='container mt-5 border rounded p-5'>
                <div className='alert alert-danger alert-dismissible' role='alert' style={{display: 'none'}}></div>
                <form onSubmit={event => props.handle_signup(event, userInfo)}>
                    <div className='mb-3'>
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={userInfo.username}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="username"
                            required={true}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={userInfo.password}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="password"
                            required={true}
                            minLength={6}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password"
                            value={userInfo.confirm_password}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="confirm password"
                        />
                    </div>
                    <div className='mb-3 align-items-center'>
                        <input type="checkbox" id='checkbox' />
                        <label htmlFor="checkbox" className="form-label mx-2">Remember me</label><hr />
                    </div>
                    <div className='mb-3'>
                        <input
                            type="submit"
                            value="LOGIN"
                            className="btn btn-primary w-100"
                        />
                    </div>
                </form>
            </div>
        </>
    )

}

Register.propTypes = {
    handle_signup: PropTypes.func.isRequired,
    account_created: PropTypes.bool.isRequired,
}