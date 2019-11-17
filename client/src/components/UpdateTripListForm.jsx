import React from 'react';
import { Link } from 'react-router-dom';

export default class UpdateTripListForm extends React.Component {
  state = {
    title: '',
    description: '',
    image_link: '',
    travel_date: ''
  }

  componentDidMount() {
    this.setFormData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tripLists !== this.props.tripLists) {
      this.setFormData();
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }



  setFormData = () => {
    if (this.props.tripLists.length) {
      const {
        title,
        description,
        image_link,
        travel_date,
        ...otherData
      } = this.props.tripLists.find(tripList => {
        return tripList === parseInt(this.props.tripListId)
      })
      this.setState({
        title,
        description,
        image_link,
        travel_date,
      })
    }
  }

  render() {
    const { title, description, image_link, travel_date } = this.state;
    return (
      <div>
        <form action="">
          <p>Update trip list form</p>
        </form>
      </div>
    )

  }
}