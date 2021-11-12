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

    const displayCategory = () => {

        let ele = document.querySelector('.category-menu')
        // console.log(ele)

        if (ele.style.display === 'block') {
            ele.style.display = 'none';
        } else {
            ele.style.display = 'block';
        }
    }


    return (
        <header className="my-navbar">
            <div style={{ marginLeft: '1rem' }}>
                <Link to="#" className="big-text" style={{ color: "#cfcfcf" }}>NavBar</Link>
            </div>
            <div className="my-nav-item">
                <ul className='nav-menu'>
                    <li><Link className='nav-item' to="/">Home</Link></li>
                    <li><Link className='nav-item' to="/blogs">Blogs</Link></li>
                    <li className='dropdown'>
                        <Link to="#" onClick={displayCategory} className='dropdown-toggle nav-item' role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categories</Link>
                        <ul className="category-menu rounded mt-3" style={{display: 'none'}}>
                            <li><Link className='dropdown-item' to='localhost:3000/category/World'>World</Link></li>
                            <li><Link className='dropdown-item' to='Enviornment'>Enviornment</Link></li>
                            <li><Link className='dropdown-item' to='category/Technology'>Technology</Link></li>
                            <li><Link className='dropdown-item' to='category/Design'>Design</Link></li>
                            <li><Link className='dropdown-item' to='category/Culture'>Culture</Link></li>
                            <li><Link className='dropdown-item' to='category/Bussiness'>Bussiness</Link></li>
                            <li><Link className='dropdown-item' to='category/Politics'>Politics</Link></li>
                            <li><Link className='dropdown-item' to='category/Science'>Science</Link></li>
                            <li><Link className='dropdown-item' to='category/Health'>Health</Link></li>
                            <li><Link className='dropdown-item' to='category/Style'>Style</Link></li>
                            <li><Link className='dropdown-item' to='category/Travel'>Travel</Link></li>
                            <li><Link className='dropdown-item' to='category/Opinion'>Opinion</Link></li>
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