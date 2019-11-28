import React from 'react';
import { Link } from 'react-router-dom';

export default function CreateLocationForm(props) {
  console.log(props, 'create location form')
  const showHideClassName = props.showModal ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      {
        props.showModal && // bulean shortcircuit

        <form className='modal-main' onSubmit={(e) => {
          e.preventDefault();
          props.createLocation(props.currentTripList.id, props.locationFormData);
        }} >
          <Link to='/'>
            <button className='back'>X</button>
          </Link>

          <label htmlFor="place">Place</label>
          <input
            type="text"
            name='place'
            id='place'
            value={props.locationFormData.place}
            onChange={props.handleChange}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name='address'
            id='address'
            value={props.locationFormData.address}
            onChange={props.handleChange}
          />
          <label htmlFor="departure_date">Departure Date</label>
          <input
            type="date"
            name='departure_date'
            id='departure_date'
            value={props.locationFormData.departure_date}
            onChange={props.handleChange}
          />
          <label htmlFor="return_date">Return Date</label>
          <input
            type="date"
            name='return_date'
            id='return_date'
            value={props.locationFormData.return_date}
            onChange={props.handleChange}
          />
          <label htmlFor="image_link">Image link</label>
          <input
            type="text"
            name='image_link'
            id='image_link'
            value={props.locationFormData.image_link}
            onChange={props.handleChange}
          />
          <button className='location-button' onClick={props.handleClose}>Add Location</button>

        </form>
      }
    </div>
  )
}