import React, { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html"; 
import { Redirect } from "react-router";
import PropTypes from 'prop-types';
import axiosInstance from "../axios";


export default function TextEditor(props) {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [categories, setCategories] = useState();
  const [blogData, setBlogData] = useState({
    title: "",
    category: 1,
    excerpt: "",
    blogContent: "",
    thumbnail: null,
    creator: parseInt(localStorage.getItem('id'))
  });
  // const history = useHistory();
  const [submitBool, setSubmitBool] = useState({
    submit: false
  })

  
  useEffect(() => {
    
    const fetchCategory = () => {
      fetch('http://127.0.0.1:8000/api/category')
      .then(response => response.json())
      .then(result => setCategories(result))
    }
    
    return props.logged_in ? fetchCategory() : null;
  }, [props.logged_in]);
  
  
  function onEditorStateChange(editorState) {
    setBlogData(previousData => {
      return {
        ...previousData,
        blogContent: draftToHtml(convertToRaw(editorState.getCurrentContent()))
      }
    })
    setEditorState(editorState)
  };
  
  // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  
  
  const categoryOption = () => {
    const list = [];
    try {
      categories.map(category => {
        return list.push(
          <option key={category.id} value={category.id}>{category.category}</option>
        )
      })
    } catch (err) {
      
    }
    
    return list;
  }
  
  
  function inputChangeHandler(event) {
    
    setBlogData(previousData => {
      return {
        ...previousData,
        [event.target.id]: event.target.value
      }
    })
  }
  
  function fileChangeHandler(event) {
    
    // console.log(event.target.files)
    
    setBlogData(previousData => {
      return {
        ...previousData,
        thumbnail: event.target.files[0]
      }
    })
    // console.log(blogData);
  }
  
  const submitForm = (e) => {
    e.preventDefault();
    

    const form_data = new FormData();
    form_data.append('thumbnail', blogData.thumbnail, blogData.thumbnail.name);
    form_data.append('title', blogData.title);
    form_data.append('category', blogData.category);
    form_data.append('blogContent', blogData.blogContent);
    form_data.append('creator', blogData.creator);
    form_data.append('excerpt', blogData.excerpt);
    
    
    console.log(blogData);
    // let url = 'http://127.0.0.1:8000/api/viewblogs';
    axiosInstance.post('token/refresh/', {
      refresh: localStorage.getItem('refresh')
    })
    .then(res => {
      console.log(res);
      localStorage.setItem('access', res.data.access);
    })

    axiosInstance.post('viewblogs', form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err))


    setSubmitBool({
      submit: true
    })
    
  };

  if (submitBool.submit) {
    return <Redirect to='/blogs' />
  }

  // check whether user is logged in or not and Redirect to home if not
  if (!props.logged_in){
    return <Redirect to='/login' />
  }
  
  return (
    <div className='container main my-5'>
      <div className='border-bottom mb-5 m-auto w-75'>
        <h1>Create New Blog</h1>
      </div>
      <form className='blogform' onSubmit={submitForm}>
        <div className="mb-3 w-75 m-auto">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={blogData.title} onChange={inputChangeHandler} placeholder="Title of Post" required={true}/>
        </div>
        <div className="mb-3 w-75 m-auto">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-select" id='category' value={blogData.category} onChange={inputChangeHandler} aria-label="Default select example">
            {categoryOption()}
          </select>
        </div>
        <div className="mb-3 w-75 m-auto">
          <label htmlFor="excerpt" className="form-label">Excerpt</label>
          <textarea rows='5' type="text" id='excerpt' className="form-control" value={blogData.excerpt} onChange={inputChangeHandler} placeholder="A little Description about your post" required={true} />
        </div>
        <div className='mb-3 w-75 m-auto'>
          <label htmlFor='blogContent' className='form-label'>Content</label>
          <div id='blogContent' className='container p-0 border'>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName border-bottom"
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor px-2"
              toolbar={{
                textAlign: { inDropdown: true },
                // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
              }}
              onEditorStateChange={onEditorStateChange}
            />
          </div>
        </div>
        <div className='mb-3 w-75 m-auto'>
          <label htmlFor='thumbnail' className='form-label'>Thumbnail</label>
          <input type='file' id='thumbnail' onChange={fileChangeHandler} className='form-control' accept='image/*' required={true} />
        </div>
        <div className='mb-3 w-75 m-auto'>
          <button type='submit' className='btn btn-primary'>Create</button>
        </div>
      </form>
    </div>
  );
}


TextEditor.propTypes = {
  logged_in: PropTypes.bool.isRequired
}