import React from 'react';
import { Link } from 'react-router-dom';

export default class UpdateTripListForm extends React.Component {
  state = {
    title: '',
    description: '',
    image_link: '',
    travel_date: '',
    displayErrors: ''
  }

  componentDidMount() {
    // this.props.getCurrentTrip(this.props.tripListId)
    this.setFormData(this.props.tripListId);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.tripLists !== this.props.tripLists) {
  //     this.setFormData(this.props.tripListId);
  //   }
  // }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }


  setFormData = (id) => {
    debugger;
    const { title, description, image_link, travel_date } = this.props.currentTripList;
      this.setState({
        title,
        description,
        image_link,
        travel_date,
      })
    
  }

  render() {
    const { title, description, image_link, travel_date, displayErrors } = this.state;
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.updateTripList(this.props.tripListId, this.state);
        }}
          className={displayErrors ? 'displayErrors' : ''}
        >

          <Link to='/'>
            <button className='back'>X</button>
          </Link>

          <label htmlFor="title">title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={this.handleChange}
            required
          />
          <br />
          <label htmlFor="description">description</label>
          <input
            type="text"
            name='description'
            id='description'
            value={description}
            onChange={this.handleChange}
            required
          />
          <br />
          <label htmlFor="image_link">image_link</label>
          <input
            type="text"
            name='image_link'
            id='image_link'
            value={image_link}
            onChange={this.handleChange}
            required
          />
          <br />
          <label htmlFor="travel_date">travel_date</label>
          <input
            type="date"
            name='travel_date'
            id='travel_date'
            value={travel_date}
            onChange={this.handleChange}
            required
          />
          <br />
          <button className='submit'>Submit</button>
        </form>
      </div>
    )
  }
}