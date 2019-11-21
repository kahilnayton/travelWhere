import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
  let divStyle = { display: 'none' };
  if (props.currentUser) {
    divStyle.display = '';
  }
  return (
    <main className='main'>
      <div id='triplist-home'>
        {props.tripLists.map(tl => (
          <div id='triplist-single'>
            
          <Link to={`/triplists/${tl.id}`}>
            <h3 className='triplist-title'>{tl.title}</h3>
          </Link>
          <img className='triplist-home-img' src={tl.image_link} width='200px' height='200px' alt=""/>
        </div> 
        ))}
      </div>
    </main>
  )
}