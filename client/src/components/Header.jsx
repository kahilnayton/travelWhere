import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  let username = '';
  if (props.currentUser) username = props.currentUser.username[0].toUpperCase() +
    props.currentUser.username.slice(1);
  
  return (
    <header>
      header
    </header>
  )
}