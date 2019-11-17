import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
  let divStyle = { display: 'none' };
  if (props.currentUser) {
    divStyle.display = '';
  }
  return (
    <main className='main'>
      <Link id='add-triplist-button' to='/create_tripList'>
        <div style={divStyle} class='cssCircle plusSign tooltip'>
          <span class='tooltiptext'>Add a Trip</span>
          &#43;
      </div>
      </Link>

      <div id='triplist-home'>
        {props.tripLists.map(tl => (
          <div id='triplist-single'>
            
          <Link to={`/triplists/${tl.id}`}>
            <h3>{tl.title}</h3>
          </Link>
          <img className='triplist-homeImg' src={tl.image_link} width='200px' height='200px' alt=""/>
        </div> 
        ))}
      </div>
    </main>
  )
}