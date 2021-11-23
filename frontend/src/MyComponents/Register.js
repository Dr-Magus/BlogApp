import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axios";

export default function Register(props) {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        confirm_password: "",
    });

    // const history = useHistory();

    const handleInput = (event) => {
        setUserInfo(previousState => {
            return ({
                ...previousState,
                [event.target.id]: event.target.value
            })
        })
    }

    function handle_signup(event, data) {

        event.preventDefault();

        const ele = document.querySelector(".alert");

        if (data.password !== data.confirm_password) {

            ele.innerHTML = 'Password Does Not Match';
            ele.style.display = 'block';
            return

        } else if (data.username === "") {

            ele.innerHTML = 'Please enter username.'
            ele.style.display = 'block'
            return
        }

        ele.style.display = 'none';

        const form_data = {
            username: data.username,
            password: data.password
        }

        axiosInstance.post('users/', form_data)
            .then(res => {
                console.log(res)
                ele.innerHTML = 'User Created Successfully! <a href="/login" >Login</a> here.'
                // ele.classList('alert-success')
                ele.classList.replace('alert-danger', 'alert-success')
                ele.style.display = 'block'

            })
            .catch(err => {
                console.log(err.response)
                ele.innerHTML = err.response.data.username
                ele.classList.replace('alert-danger', 'alert-warning')
                ele.style.display = 'block'
            });


    }

    return (
        <div className='main'>
            <div className='container mt-5 border rounded p-5'>
                <div className='alert alert-danger alert-dismissible' role='alert' style={{ display: 'none' }}></div>
                <form onSubmit={event => handle_signup(event, userInfo)}>
                    <div className='mb-3'>
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={userInfo.username}
                            onChange={handleInput}
                            className="form-control"
                            placeholder="username"
                            required
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
                            value="Register"
                            className="btn btn-primary w-100"
                        />
                    </div>
                    <div className='mb-3 text-center'>
                        Already Have Account. <Link to='/login'>Login</Link> here.
                    </div>
                </form>
            </div>
        </div>
    )

}