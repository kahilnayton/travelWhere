import React from 'react';
import { Link } from 'react-router-dom';
import loginpic from '../images/login.jpg'
import logoutpic from '../images/logout.jpg'

export default function Header(props) {
  let username = '';
  let divStyle = { display: 'none' };
  if (props.currentUser) username = props.currentUser.username[0].toUpperCase() +
    props.currentUser.username.slice(1);
  if (props.currentUser) {
    divStyle.display = '';
  }

  return (
    <div>
      <Link to="/">
        <div className="data-container">
          <div></div>
          <span className="btn">Travel Where?</span>
          <div>
            <nav id='log-out'>
              {
                props.currentUser ?
                  <Link to="/" onClick={() => props.handleLogout()}>
                    <img className='account-logo' src={loginpic} alt="login-pic" />
                  </Link>
                  :
                  <Link to='/login'>
                    <img className='account-logo' src={logoutpic} alt="logout-pic" />
                  </Link>
              }

            </nav>

          </div>
        </div>
      </Link>
      <div className='header-container'>



        {
          props.currentUser ?
            <div>
              <h2>Welcome, {username}</h2>
              <Link to='/'>
                <h1 className='trips-header'>My Trips</h1>
              </Link>
            </div>
            :
            <></>
        }

      </div>
      <Link id='add-triplist-button' to='/create_tripLists'>
        <div style={divStyle} class='cssCircle plusSign tooltip'>
          <span class='tooltiptext'>Add Trip</span>
        </div>
      </Link>


    </div>
  )
}