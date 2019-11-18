import React from 'react';
import { Link } from 'react-router-dom';

export default function CreateLocationForm(props) {
  console.log(props)
  const { show, handleClose, handleFormData, currentTripList, handleChange, locationFormData } = props;
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <form className='modal-main' onSubmit={(e) => {
        e.preventDefault();
        props.createLocation(currentTripList.id, locationFormData);
      }} >

        <Link to='/'>
          <button className='back'>X</button>

        </Link>

        <label htmlFor="place">Place</label>
        <input
          type="text"
          name='place'
          id='palce'
          value={locationFormData.place}
          onChange={handleChange}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name='address'
          id='address'
          value={locationFormData.address}
          onChange={handleChange}
        />
        <label htmlFor="departure_date">Departure Date</label>
        <input
          type="text"
          name='departure_date'
          id='departure_date'
          value={locationFormData.departure_date}
          onChange={handleChange}
        />
        <label htmlFor="return_date">Return Date</label>
        <input
          type="text"
          name='return_date'
          id='return_date'
          value={locationFormData.return_date}
          onChange={handleChange}
        />
        <label htmlFor="image_link">Image link</label>
        <input
          type="text"
          name='image_link'
          id='image_link'
          value={locationFormData.image_link}
          onChange={handleChange}
        />
        <button className='location-button' onClick={handleClose}>Add Location</button>

      </form>
    </div>
  )
}