import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
  let divStyle = { display: 'none' };
  if (props.currentUser) {
    divStyle.display = '';
  }
  return (
    <main className='main'>
      home 
    </main>
  )
}