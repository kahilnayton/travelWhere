import React from 'react'
import { Link } from 'react-router-dom';

export default class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value  });
  }

  render() {
    return (
      <form action="">
      form
      </form>
    )
  }
}