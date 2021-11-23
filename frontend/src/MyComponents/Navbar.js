import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import profile from '../Images/profile.jpg';

export default function Navbar(props) {

    const logged_out_nav = (
        <>
            <li><Link className='nav-item' to="/login">Login</Link></li>
            <li><Link className='nav-item' to="/signup">Sign Up</Link></li>
        </>
    );

    const logged_in_nav = (
        <>
            <li><Link className='nav-item' to="/create">Create</Link></li>
            <li onClick={props.handle_logout}><Link className='nav-item' to="/login">Logout</Link></li>
        </>
    );


    return (
        <header className="my-navbar">
            <div style={{ marginLeft: '1rem' }}>
                <Link to="#" className="big-text" style={{ color: "#cfcfcf" }}>Horizon</Link>
            </div>
            <div className="my-nav-item">
                <ul className='nav-menu'>
                    <li><Link className='nav-item' to="/">{props.logged_in ? 'My Blogs' : 'Home'}</Link></li>
                    <li><Link className='nav-item' to="/blogs">Blogs</Link></li>
                    <li className='dropdown'>
                        <Link className="dropdown-toggle" to="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            Categories
                        </Link>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><Link className="dropdown-item" to="/category/world">World</Link></li>
                            <li><Link className="dropdown-item" to="/category/enviornment">Enviornment</Link></li>
                            <li><Link className="dropdown-item" to="/category/technology">Technology</Link></li>
                            <li><Link className="dropdown-item" to="/category/design">Design</Link></li>
                            <li><Link className="dropdown-item" to="/category/culture">Culture</Link></li>
                            <li><Link className="dropdown-item" to="/category/bussiness">Bussiness</Link></li>
                            <li><Link className="dropdown-item" to="/category/politics">Politics</Link></li>
                            <li><Link className="dropdown-item" to="/category/science">Science</Link></li>
                            <li><Link className="dropdown-item" to="/category/health">Health</Link></li>
                            <li><Link className="dropdown-item" to="/category/style">Style</Link></li>
                            <li><Link className="dropdown-item" to="/category/travel">Travel</Link></li>
                            <li><Link className="dropdown-item" to="/category/opinion">Opinion</Link></li>
                        </ul>
                    </li>
                    <>
                        {props.logged_in ? logged_in_nav : logged_out_nav}
                    </>
                    <li>
                        <div className="profile-img">
                            <img src={profile} alt='Profile' className='w-100' />
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    )

}

Navbar.propTypes = {

    logged_in: PropTypes.bool.isRequired,
    handle_logout: PropTypes.func.isRequired,
}