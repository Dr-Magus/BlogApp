import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../axios";

export default function Register(props) {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        confirm_password: "",
    });

    const history = useHistory();

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
    
        const ele = document.querySelector(".alert-danger");
    
        if (data.password !== data.confirm_password) {

          ele.innerHTML = 'Password Does Not Match';
          ele.style.display = 'block';
          return
    
        }
    
        ele.style.display = 'none';
    
        const form_data = {
          username: data.username,
          password: data.password
        }
    
        axiosInstance.post('users/', form_data)
          .then(res => {
            history.push('/login')
          });
    
    
      }

    return (
        <div className='main'>
            <div className='container mt-5 border rounded p-5'>
                <div className='alert alert-danger alert-dismissible' role='alert' style={{display: 'none'}}></div>
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
        </div>
    )

}