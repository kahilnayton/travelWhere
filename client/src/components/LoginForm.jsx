import React from 'react'
import { Link } from 'react-router-dom';

export default class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.props.handleLogin(this.state);
        this.setState({
          username: '',
          password: ''
        })
      }}>
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name='username'
          id='username'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name='password'
          id='password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button className='submit'>Submit</button>
        <Link to='/register'>
          <button className='submit'></button>

        </Link>
        <br />
        <p>{this.state.authErrorMessage}</p>
      </form>
    )
  }
}