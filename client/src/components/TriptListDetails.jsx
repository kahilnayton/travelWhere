import React from 'react';
import CreateTripForm from './CreateTripForm';
import UpdateTripForm from './UpdateTripForm';
import { getTripsByTripList, postTrip, putTrip, deleteTrip } from '../services/api-helper';
import { Link, Route, withRouter } from 'react-router-dom';
import moment from 'moment';
import TripDetails from './TripDetails';

class TripListDetails extends React.Component {
  state = {
    trips: [],
    updateTrips: [],
    tripFormData: {
      item: '',
      description: '',
      image_link: '',
      price: '',
      location: '',
      start_date: '',
      finish_date: ''
    },
    show: false,
    showUpdate: false,
    showTripDet: false,
    selectedTrip: 0
  }
  async componentDidMount() {
    await this.getGifts();
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

  // Get Trips
  getTrips = async () => {
    if (this.props.currentTripList) {
      const trips = await getTripsByTripList(this.props.currentTripList.id);
      this.setState({ trips })
    }
    else {
      this.setState({ trips: [] })
    }
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

  // Create Trip 
  createTrip = async (id, data) => {
    const newTrip = await putTrip(id, data);
    this.setState(prevState => ({
      trips: prevState.trips.map(trip => {
        trip.id === parseInt(id) ? newTrip : trip)
    }))
  }
  // Update Trip 
  updateTrip = async (id, data) => {
    const newTrip = await putTrip(id, data);
    this.setState(prevState => ({
      trips: prevState.trips.map(trip => {
        trip.id === parseInd(id) ? newTrip : trip)
    }))
  }
  deleteTrip = async (id) => {
    await deleteTrip(id);
    this.setState(prevState => ({
      trips: prevState.trips.filter(trip => {
        return trip.id !== id
      })
    }))
  }

  render() {
    const { currentTripList } = this.props;
    const { trips } = this.state;

    return (
      <div className='main'>
        Trip List details
      </div>
    )
  }

}
export default withRouter(TripListDetails);