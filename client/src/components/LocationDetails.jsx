import React from 'react';
import moment from 'moment';
export default function LocationDetails(props) {
  const { show, handleClose, locations, selectedLocation } = props;
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const location = locations.find(location => location.id === selectedLocation);

  return (
    <div>
      {
        location ?
          <div className={showHideClassName}>
            <h3>{location.place}</h3>
            <p>{location.address}</p>
            <p>Departure date: {moment(new Date(location.departure_date)).format("MM/DD/YYYY")}</p>
            {location.return_date ? <p>Returning: Yes</p> : <p>Returning: No</p>}
            <button
              className='update-button'
              onClick={handleClose}>Close</button>
            <img>Image: {location.image_link}</img>
          </div>
          : <></>
      }
    </div>
  )
}