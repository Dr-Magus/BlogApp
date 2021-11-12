import React from 'react'

// import { Link } from 'react-router-dom'


export default function Home() {

    // const [categories, setCategories] = useState();

    // useEffect(() => {

    //     const fetchdata = async () => {

    //         try {
    //             fetch('http://127.0.0.1:8000/api/category')
    //                 .then(response => response.json())
    //                 .then(result => {
    //                     // console.log(result)
    //                     setCategories(() => result)
    //                 })
    //         } catch (err) {

    //         }
    //     };

    //     fetchdata();
    // }, [])

    // const capitalizeFirstLetter = (word) => {
    //     if (word)
    //         return word.charAt(0).toUpperCase() + word.slice(1);
    //     return '';
    // };

    // function showCategory() {

    //     let counter = 0;
    //     let list = [];
    //     try {
    //         categories.map(category => {

    //             counter++;
    //             return list.push(
    //                 <div key={counter} className="col-3 category-box p-3">
    //                     <div className="text-center category">
    //                         <Link to={`category/${category.category}`}>
    //                             <img src={category.category_image} className='w-100' alt={capitalizeFirstLetter(category.category)} />
    //                         </Link>
    //                         <span><Link to={`category/${category.category}`} className='form-control btn btn-primary category-name'>{capitalizeFirstLetter(category.category)}</Link></span>
    //                     </div>
    //                 </div>
    //             );
    //         });
    //     } catch (err) {

    //     }

    //     return list;

    // }


    return (
        <>
            <div className="my-container">
                <nav>
                    <main>
                        <div className="d-flex row">
                            <div className="col-6">
                                <h1>Welcome To The Website User</h1>
                                <p>We Bring The World At Your Door Step</p>
                            </div>
                        </div>
                    </main>
                </nav>
            </div>
            <div className='container'>
                <div className='container my-3 text-center shadow p-2 rounded-pill' style={{ backgroundColor: '#8fa0ba' }} >
                    <h1 style={{ fontFamily: "'Lato', san-serif" }}>Categories</h1>
                </div>
                <div className="my-3">
                    <div className="container">
                        <div className="d-flex flex-wrap">
                            {/* {showCategory()} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}