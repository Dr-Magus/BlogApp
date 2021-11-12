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

// CSS imports
import './MyCSS/navbar.css';
import './MyCSS/home.css';
import './MyCSS/blog.css';


export default function App() {

  const [state, setState] = useState({
    logged_in: localStorage.getItem('access') ? true : false,
    account_created: false,
    id: 0,
  });

  useEffect(() => {

    if (state.logged_in) {

      // axiosInstance.post('token/refresh/', {
      //   refresh: localStorage.getItem('refresh')
      // })
      // .then(res => {
      //   console.log(res.data)
      //   localStorage.setItem('access', res.data.access)
      // });

      axiosInstance.get('current_user/',{
        headers: {
          'Authorization': `JWT ${localStorage.getItem('access')}`
        }
      })
      .then(res => {
        console.log(res.data)
        localStorage.setItem('id', res.data.id)
      })
    }

  }, [state.logged_in])

  var access_token = localStorage.getItem('access');

  useEffect(() => {

    if (!access_token) {
      setState(previousState => {
        return {
          ...previousState,
          logged_in: false
        }
      })
    }

  }, [access_token])

  function handle_login(event, data) {

    event.preventDefault();

    axiosInstance.post('token/', data)
      .then(res => {

        console.log(res)
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

    < Redirect to='/' />
  }

  function handle_signup(event, data) {

    event.preventDefault();

    const ele = document.querySelector(".alert-danger");

    if (data.password !== data.confirm_password) {
      // console.log(ele);
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
        // console.log(res.data)

        console.log(res)
        // localStorage.setItem('token', res.data.token);
        setState({ ...state, account_created: true });
      });

    <Redirect to='/login' />

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
        axiosInstance.defaults.headers['Authorization'] = null;
        // <Redirect to='/login' />
        setState({ ...state, logged_in: false })

      })
  }



  return (
    <Router>
      <Navbar
        logged_in={state.logged_in}
        handle_logout={handle_logout}
      />
      <Switch>
        <Route exact path="/">
          <Home />
          <Footer />
        </Route>
        <Route exact path="/blogs" component={Blog} />
        <Route exact path='/login'>
          <Login handle_login={handle_login} logged_in={state.logged_in} />
        </Route>
        <Route exact path='/signup'>
          <Register handle_signup={handle_signup} account_created={state.account_created} />
        </Route>
        <Route exact path='/create'>
          <TextEditor logged_in={state.logged_in} />
        </Route>
        <Route exact path='/blogs/:slug' component={BlogDetail} />
        <Route exact path='/category/:category' component={CategoryPost} />
      </Switch>

    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
