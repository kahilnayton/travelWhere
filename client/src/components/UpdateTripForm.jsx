import React from 'react';
import { Link } from 'react-router-dom';

export default class UpdateTripForm extends React.Component {
  state = {
    location: '',
    description: '',
    image_link: '',
    price: ''
  }

  setFormData = (id) => {
    if (this.props.trips.length) {
      const {
        location,
        description,
        image_link,
        price,
        ...otherData
      } = this.props.trip.find(trip => {
        return trip.id === id
      })
      this.setState({
        location,
        description,
        image_link,
        price,
      })
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  componentDidUpdate(prevState) {
    if (prevProps.selectedTrip !== this.props.selectedTrip) {
      if (this.props.selectedTrip > 0)
        this.setFormData(this.props.selectedTrip);
    }
  }

  render() {

    // const location,
    //   description,
    //   image_link,
    //   price } = this.state;
    const { show, handleClose, tripFormData } = this.props;
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    return (
      <div className={showHideClassName}>
        <form action="">
          <p>Update trip form</p>
        </form>
      </div>
    )
  }
}