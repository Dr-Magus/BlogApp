import React, { useState, useEffect } from 'react'
import axiosInstance from '../axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import bookmark_border from '../Images/bookmark_border.svg'
import bookmark from '../Images/bookmark.svg'

function UserBlogs(props) {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState({
        loading: true
    })

    useEffect(() => {
        const fetchData = () => {

            axiosInstance.post('/userblogs', { id: props.id }, {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            })
                .then(res => {
                    console.log(res)
                    console.log(res.data)
                    setBlogs(res.data)
                    setLoading({ loading: false })
                })
                .catch(err => console.log(err))
        }

        props.id && fetchData();

    }, [props.id])

    // console.log(blogs)
    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    const changeBookmark = () => {

        const ele = document.getElementsByClassName('bookmark-icon');
        console.log(ele);
    }

    const displayBlog = () => {

        let list = [];
        let result = []

        blogs.map(blog => {
            return list.push(
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-0 d-flex flex-column position-static">
                        <div className='mb-1'>
                            <img src={`http://127.0.0.1:8000${blog.thumbnail}`} className='w-100' alt='' />
                        </div>
                        <div className="p-4">
                            <div className='d-flex justify-content-between'>
                                <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blog.category)}</strong>
                                <span className="material-icons" onClick={changeBookmark}>
                                    <img src={bookmark_border} className='bookmark-icon' alt="" />
                                </span>
                            </div>
                            <h3 className="mb-0">{blog.title}</h3>
                            <p className="card-text mb-auto text-truncate" style={{maxWidth: '15rem'}}>{blog.excerpt}</p>
                            <Link to={`/blogs/${blog.slug}`} className="stretched-link">Continue reading</Link>
                        </div>
                    </div>
                </div>
            )
        })

        for (let i = 0; i < list.length; i += 2) {
            result.push(
                <div key={i} className='row mb-2 justify-content-evenly'>
                    <div className='col-md-6 px-4'>
                        {list[i]}
                    </div>
                    <div className='col-md-6 px-4'>
                        {list[i + 1] ? list[i + 1] : null}
                    </div>
                </div>
            )
        }

        return result;
    }


    const data = () => {
        return (
            <div className='data container rounded p-5 shadow' style={{ backgroundColor: '#222326' }}>
                <h1>Hello, {props.username}</h1><hr /><br />
                <h4>Number of Blog(s) you have Created: {blogs.length}</h4>
            </div>
        )
    }

    if (loading.loading) {
        return <Loading />
    }

    if (blogs.length === 0) {
        return (
            <div className='main'>
                {data()}
            </div>
        )
    }

    return (
        <>
            <div className='main'>
                {data()} < hr /><br />
                {displayBlog()}
            </div>
        </>
    )
}

export default UserBlogs
