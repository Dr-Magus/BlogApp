import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function CategoryPost(props) {

    const [categoryPost, setCategoryPost] = useState([]);
    const [categories, setCategories] = useState();

    useEffect(() => {

        const fetchpost = async () => {

            const categoryName = props.match.params.category;
            // console.log(categoryName);

            try {
                fetch(`http://127.0.0.1:8000/api/category/${categoryName}`)
                    .then(response => response.json())
                    .then(result => {
                        // console.log(result)
                        setCategoryPost(result)
                    })
            } catch (err) {

            }

        }

        fetchpost();

    }, [props.match.params.category]);

    useEffect(() => {

        const fetchcategory = async () => {
            fetch('http://127.0.0.1:8000/api/category')
                .then(response => response.json())
                .then(result => {
                    // console.log(result);
                    setCategories(result);
                })
        };

        fetchcategory();

    }, [])

    const showCategory = () => {

        let list = [];
        try {
            categories.map(category => {
                let path = `${category.category}`
                return list.push(
                    <Link key={category.id} className="p-2 link-secondary" to={path} > {category.category} </Link>
                )
            })
        } catch (err) {

        }

        return list;
    }

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    const getBlogs = () => {
        let list = [];
        let result = [];
        try {
            categoryPost.map(blog => {

                return list.push(
                    <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col d-flex flex-column position-static">
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
            });
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
        <div className='container'>
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    {showCategory()}
                </nav>
            </div>
            <hr />
            <h1>Category: {capitalizeFirstLetter(props.match.params.category)}</h1>
            <hr /><br />
            {categoryPost.length > 0 ? getBlogs() : <div className='mt-5 text-center'><h2>No Posts Availabel For '{capitalizeFirstLetter(props.match.params.category)}'</h2></div>}
        </div>

    );

}