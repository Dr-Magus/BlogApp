import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Blog() {

    const [blogs, setBlogs] = useState([]);


    useEffect(() => {

        const fetchblog = async () => {

            fetch('http://127.0.0.1:8000/api/viewblogs')
                .then(response => response.json())
                .then(finalResult => {
                    // console.log(finalResult);
                    setBlogs(finalResult);
                })
                .catch((error) => console.error(error));
        };

        fetchblog();
    }, [])

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };


    const getBlogs = () => {
        let list = [];
        let result = [];

        try {
            blogs.map(blog => {

                return list.push(
                    <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-0 d-flex flex-column position-static">
                            <div className='mb-1'>
                                <img src={blog.thumbnail} className='w-100' alt='' />
                            </div>
                            <div className="p-4">
                                <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blog.category)}</strong>
                                <h3 className="mb-0">{blog.title}</h3>
                                <p className="card-text mb-auto">{blog.excerpt}</p>
                                <Link to={`/blogs/${blog.slug}`} className="stretched-link">Continue reading</Link>
                            </div>
                        </div>
                    </div>
                );
            })
        } catch (err) {

        }

        for (let i = 0; i < list.length; i += 4) {
            result.push(
                <div key={i} className='row mb-2'>
                    <div className='col-md-3 px-4'>
                        {list[i]}
                    </div>
                    <div className='col-md-3 px-4'>
                        {list[i + 1] ? list[i + 1] : null}
                    </div>
                    <div className='col-md-3 px-4'>
                        {list[i + 2] ? list[i + 2] : null}
                    </div>
                    <div className='col-md-3 px-4'>
                        {list[i + 3] ? list[i + 3] : null}
                    </div>
                </div>
            )
        }

        return result;
    };


    return (
        <div className='container main mt-5'>
            {getBlogs()}
        </div>
    )
}