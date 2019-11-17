import React from 'react';

export default class RegisterForm extends React.Component {
  state = {
    username: '',
    password: ''
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }
  render() {
    return (
      <form action="">
        Register Form
      </form>
    )
  }
}