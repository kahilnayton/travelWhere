import React from 'react';
import moment from 'moment'
export default function TripDetails(props) {
  const { show, handleClose, trips, selectedTrip } = props;
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const trip = trips.find(trip => trip.id == selectedTrip);

  return (
    <div>
      Trip details 
    </div>
  )
}