import React from 'react';
import { Link } from 'react-router-dom';

export default class UpdateLocationForm extends React.Component {
  state = {
    place: '',
    address: '',
    departure_date: '',
    return_date: '',
    image_link: ''
  }

  setFormData = (id) => {
    if (this.props.locations.length) {
      const {
        place,
        address,
        departure_date,
        return_date,
        image_link,
        ...otherData
      } = this.props.locations.find(location => {
        return location.id === id
      })
      this.setState({
        place,
        address,
        departure_date,
        return_date,
        image_link,
      })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLocation !== this.props.selectedLocation) {
      if (this.props.selectedLocation > 0)
        this.setFormData(this.props.selectedLocation);
    }
  }

  render() {
    const { place,
      address,
      departure_date,
      return_date,
      image_link } = this.state;
    const { show, handleClose, locationFormData } = this.props;
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    return (
      <div className={showHideClassName}>
        <form action="modal-main" onSubmit={(e) => {
          e.preventDefault();
          this.props.updateLocation(this.props.selectedLocation, this.state);
        }}>
          <button type='button' id='cancel' onClick={handleClose} className='back'>X</button>
          <label htmlFor="place">Place</label>
          <input
            type="text"
            name='place'
            id='place'
            value={place}
            onChange={this.handleChange}
          />
          <label htmlFor="address">address</label>
          <input
            type="text"
            name='address'
            id='address'
            value={address}
            onChange={this.handleChange}
          />
          <label htmlFor="departure_date">departure_date</label>
          <input
            type="date"
            name='departure_date'
            id='departure_date'
            value={departure_date}
            onChange={this.handleChange}
          />
          <label htmlFor="return_date">return_date</label>
          <input
            type="date"
            name='return_date'
            id='return_date'
            value={return_date}
            onChange={this.handleChange}
          />
          <label htmlFor="image_link">image_link</label>
          <input
            type="text"
            name='image_link'
            id='image_link'
            value={image_link}
            onChange={this.handleChange}
          />
          <button className='update-button'>Update Location</button>
        </form>
      </div>
    )
  }
}