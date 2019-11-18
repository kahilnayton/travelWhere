import React from 'react';
import { Link } from 'react-router-dom';

export default function CreateTripListForm(props) {
  console.log(props, 'create trip list')
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        props.postTripListsByUser(props.currentUser.id, props.tripListFormData);
      }}>
        <Link to='/'>
          <button className='back'>X</button>
        </Link>

        <label htmlFor="title">Title</label>
        <input
          type='text'
          name='title'
          id='title'
          value={props.tripListFormData.title}
          onChange={props.handleChange}
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name='description'
          id='description'
          value={props.tripListFormData.description}
          onChange={props.handleChange}
        />
        <br />
        <label htmlFor="image_link">Image link</label>
        <input
          type="text"
          name='image_link'
          id='image_link'
          value={props.tripListFormData.image_link}
          onChange={props.handleChange}
        />
        <br />
        <label htmlFor="travel_date">Travel date</label>
        <input
          type="date"
          name='travel_date'
          id='travel_date'
          value={props.tripListFormData.travel_date}
          onChange={props.handleChange}
        />
        <br />
        <button className='submit'>Submit</button>
      </form>
    </div>
  )
}