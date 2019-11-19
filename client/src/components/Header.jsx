import React from 'react';
import { Link } from 'react-router-dom';
import loginpic from '../images/login.jpg'
import logoutpic from '../images/logout.jpg'

export default function Header(props) {
  let username = '';
  if (props.currentUser) username = props.currentUser.username[0].toUpperCase() +
    props.currentUser.username.slice(1);

  return (
    <header>
      <div className='header-tags'>
        <Link to='/'>
          <h1>Trips</h1>
        </Link>
        {
          props.currentUser ?
            <h2>Welcome, {username}</h2>
            :
            <></>
        }

      </div>

      <nav id='log-out'>
        {
          props.currentUser ?
            <a href='#' onClick={props.handleLogout}>
              <img className='account-logo' src={loginpic} alt="login-pic" />
            </a>
            :
            <Link to='/login'>
              <img className='account-logo' src={logoutpic} alt="logout-pic" />
            </Link>
        }

      </nav>
    </header>
  )
}