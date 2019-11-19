import React from 'react';
import CreateLocationForm from './CreateLocationForm';
import UpdateLocationForm from './UpdateLocationForm';
import { getLocationsByTripList, postLocation, putLocation, deleteLocation } from '../services/api-helper';
import { Link, Route, withRouter } from 'react-router-dom';
import travelIcon from '../images/travelIcon.png';
import editIcon from '../images/editIcon.png';
import deleteIcon from '../images/deleteIcon.png';
import moment from 'moment';
import LocationDetails from './LocationDetails';

class TripListDetails extends React.Component {
  state = {
    locations: [],
    updateTrips: [],
    tripFormData: {
      place: '',
      address: '',
      departure_date: '',
      return_date: '',
      image_link: ''
    },
    show: false,
    showUpdate: false,
    showTripDetails: false,
    selectedTrip: 0
  }

  async componentDidMount() {
    await this.getLocations();
    console.log(this.state, 'state of trip list details')
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showModalUpdate = (id) => {
    this.setState({ showUpdate: true, selectedTrip: id });
  };

  hideModalUpdate = () => {
    this.setState({ showUpdate: false });
  };

  showTripDetails = (id) => {
    this.setState({ showTripDet: true, selectedTrip: id })
  };

  hideTripDetails = () => {
    this.setState({ showTripDet: false })
  };

  // Get Locations by a trip
  getLocations = async () => {
    if (this.props.currentTripList) {
      const locations = await getLocationsByTripList(this.props.currentTripList.id);
      this.setState({ locations })
    }
    else {
      this.setState({ locations: [] })
    }
    console.log(this.state.locations);
  }

  // Handle Change
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      tripFormData: {
        ...prevState.tripFormData,
        [name]: value
      }
    }))
  }

  // Create Location
  createLocation = async () => {
    const newLocation = await postLocation(this.props.currentTripList.id, this.state.tripListFormData);
    this.setState(prevState => ({
      locations: [...prevState.locations, newLocation]
    }))
    this.props.history.push('/');
  }

  // /// Update Gift /////////////
  updateLocation = async (id, data) => {
    const newLocation = await putLocation(id, data);
    this.setState(prevState => ({
      locations: prevState.locations.map(location =>
        location.id === parseInt(id) ? newLocation : location)
    }))
  }
  deleteLocation = async (id) => {
    await deleteLocation(id);
    this.setState(prevState => ({
      locations: prevState.locations.filter(location => {
        return location.id !== id
      })
    }))
  }


  render() {
    // debugger;
    const { currentTripList } = this.props;
    const { locations } = this.state;
    console.log(locations)

    return (
      <div className='main'>
        <h2>there are no current trips</h2>
        {currentTripList ?
          <div id='trip-list-details'>
            <div id='triplist'>
              <h2>{currentTripList.title}</h2>
              <img
                className='triplist-image'
                src={currentTripList.image_link}
                alt="my-list"
              />
              <p>{currentTripList.description}</p>
              <h4>Travel Date: {moment(new Date(currentTripList.travel_date)).format('MM/DD/YYYY')}</h4>
              <CreateLocationForm
                show={this.state.show}
                handleClose={this.hideModal}
                createLocation={this.createLocation}
                handleChange={this.handleChange}
                locationFormData={this.state.tripFormData}
                currentTripList={currentTripList}
              />
              <div className='image-container'>
                <img className='action-image' src={travelIcon} onClick={this.showModal} alt="edit" />
                <Link to={`/update_tripList/${currentTripList.id}`}>
                  <img className='action-image' src={editIcon} alt="edit" />
                </Link>
                <img className='action-image' src={deleteIcon} alt="delete" onClick={() => {
                  this.props.deleteTripList(currentTripList.id)
                }} />

              </div>
            </div>

            <div id='locations-container'>
              {
                locations.map(location => (
                  <div className='location'>
                    <img className='location-image' src={location.image_link} alt="location-image" />
                    <div className='location-details'>
                      <LocationDetails
                        locations={locations}
                        selectedLocation={this.state.selectedLocation}
                        show={this.state.showLocationDetails}
                        handleClose={this.hideLocationDetails}
                      />
                      <h2>{location.place}</h2>
                      <div id='trip-button-group'>
                        <button className='three-buttons' type='button' onClick={() =>
                          this.showModalUpdate(location.id)}>Update Location</button>
                        <button className='three-buttons' type='button' onClick={() =>
                          this.showLocationDetails(location.id)}>View Location</button>
                        
                        <UpdateLocationForm
                          locations={this.state.locations}
                          locationId={location.id}
                          show={this.state.showUpdate}
                          handleClose={this.handleModalUpdate}
                          updateLocation={this.updateLocation}
                          locationFormData={this.state.locationFormData}
                          selectedLocation={this.state.selectedLocation}
                        />
                        <button className='three-buttons' type='button' onClick={() => { this.deleteLocation(location.id) }}>
                          Delete Location
                      </button>
                        </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          : <></>}
      </div>
    )
  }
}
export default withRouter(TripListDetails);