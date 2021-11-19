import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axiosInstance from './axios';


// Components imports
import Home from './MyComponents/Home';
import Blog from './MyComponents/Blog';
import Footer from './MyComponents/Footer';
import Login from './MyComponents/Login';
import TextEditor from './MyComponents/TextEditor';
import CategoryPost from './MyComponents/CategoryPost';
import BlogDetail from './MyComponents/BlogDetail';
import Navbar from './MyComponents/Navbar';
import Register from './MyComponents/Register';
import UserBlogs from './MyComponents/UserBlogs';

// CSS imports
import './MyCSS/navbar.css';
import './MyCSS/home.css';
import './MyCSS/blog.css';
import './MyCSS/loading.css'
import changeLocation from './changeLocation';


export default function App() {

  const [state, setState] = useState({
    logged_in: localStorage.getItem('access') ? true : false,
    id: 0,
  });

  useEffect(() => {

    if (state.logged_in) {

      axiosInstance.get('current_user/', {
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`
        }
      })
        .then(res => {
          console.log(res.data)
          localStorage.setItem('id', res.data.id)
          localStorage.setItem('username', res.data.username)
        })
        .catch(err => {
          // console.error(err);

          try {
            localStorage.removeItem('refresh');
            localStorage.removeItem('id');
            localStorage.removeItem('access')
          } catch (bug) {
            console.error(bug);
          }

          setState(previousState => {
            return ({
              ...previousState,
              logged_in: false
            })
          })
        })
    }

  }, [state.logged_in])


  function handle_login(event, data) {

    event.preventDefault();

    axiosInstance.post('token/', data)
      .then(res => {

        // console.log(res)
        if (res.status === 200) {

          localStorage.setItem('access', res.data.access);
          localStorage.setItem('refresh', res.data.refresh);
          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + localStorage.getItem('access');
          // localStorage.setItem('id', res.data.user.id);
          setState({ ...state, logged_in: true })

        }
      })
      .catch(err => {
        // console.error(err)
        const ele = document.querySelector(".alert-danger");

        console.log(ele);
        ele.innerHTML = 'User with entered credentials does not exist.';
        ele.style.display = 'block';
      });

    <Redirect to='/' />
  }


  const handle_logout = () => {

    axiosInstance.post('user/logout/blacklist/', {
      refresh_token: localStorage.getItem('refresh'),
    })
      .then(res => {
        console.log(res)
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        axiosInstance.defaults.headers['Authorization'] = null;
        setState({ ...state, logged_in: false });
        changeLocation('/')

      })
      .catch(err => console.log(err))

  }



  return (
    <Router>
      <Navbar
        logged_in={state.logged_in}
        handle_logout={handle_logout}
      />
      <Switch>
        <Route exact path="/" >
        {state.logged_in? <UserBlogs id={localStorage.getItem('id')} /> : <Home />}
        {/* <Footer /> */}
        </Route>
        <Route exact path='/userblogs' component={UserBlogs} />
        <Route exact path="/blogs" component={Blog} />
        <Route exact path='/login'>
          <Login handle_login={handle_login} logged_in={state.logged_in} />
        </Route>
        <Route exact path='/signup'>
          <Register />
        </Route>
        <Route exact path='/create'>
          <TextEditor logged_in={state.logged_in} />
        </Route>
        <Route exact path='/blogs/:slug' component={BlogDetail} />
        <Route exact path='/category/:category' component={CategoryPost} />
      </Switch>

      <Footer />

    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
