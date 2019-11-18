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
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.UpdateTripList(this.props.tripListId, this.state);
        }}>

          <Link to='/'>
            <button className='back'>X</button>
          </Link>

          <label htmlFor="title">title</label>
          <input
            type="text"
            name='title'
            id='title'
            value={title}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="description">description</label>
          <input
            type="text"
            name='description'
            id='description'
            value={description}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="image_link">image_link</label>
          <input
            type="text"
            name='image_link'
            id='image_link'
            value={image_link}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="travel_date">travel_date</label>
          <input
            type="date"
            name='travel_date'
            id='travel_date'
            value={travel_date}
            onChange={this.handleChange}
          />
          <br />
          <button className='submit'>Sublmit</button>
        </form>
      </div>
    )

  }
}