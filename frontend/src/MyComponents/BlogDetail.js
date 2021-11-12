import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogDetail = (props) => {
    const [blog, setBlog] = useState();

    useEffect(() => {
        const slug = props.match.params.slug;

        const fetchData = async () => {
            try {
                fetch(`http://127.0.0.1:8000/api/blogs/${slug}`)
                    .then(response => response.json())
                    .then(result => setBlog(result))
            }
            catch (err) {

            }
        };

        fetchData();
    }, [props.match.params.slug]);

    const createBlog = () => {
        return { __html: blog.blogContent }
    };

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };


    const aboutBlog = () => {

        return (blog ? <div className='container mt-3'>
            <h1 className='display-2'>{blog.title}</h1>
            <h5><small>Written By: {blog.creator}</small></h5>
            <h2 className='text-muted mt-3'>Category: {capitalizeFirstLetter(blog.category)}</h2>
            <div className='my-5'>
                <img src={blog.thumbnail} alt={blog.title} className='w-100'/>
            </div>
            <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
            <hr />
            <p className='lead mb-5'><Link to='/blogs' className='font-weight-bold'>Back to Blogs</Link></p>
        </div> : <div></div>)
    }

    return (
        <>
        {aboutBlog()}
        </>
    );
};

export default BlogDetail;