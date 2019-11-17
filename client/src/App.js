import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, withRouter } from 'react-router-dom';


class App extends React.Component {
  state = {
    currentUser: null,
    authErrorMessage: '',
    tripLists: [],
    tripListFormData: {
      title: '',
      description: '',
      image_link: '',
      date: ''
    }
  }

  componentDidMount = async () => {
    console.log('component did mount');
    await this.handleVerify();
    await this.getTripList();
  }

  handleLogin = async (loginData) => {
    const currentUser = await loginUser(loginData);
    if (currentUser.error) {
      this.setState({ authErrorMessage: currentUser.error });
    }
    else {
      this.setState({ currentUser });
      await thisgetTripList();
      this.props.history.push('./');
    }
  }
  handleRegister = async (registerData) => {
    const currentUser = await registerUser(registerData);
    if (cuurnetUser.error) {
      this.setState({ authErrorMessage: currentUsrt.errir });
    }
    else {
      this.setState({ currentUser });
      localStorage.removeItem('authToken');
      this.setState({
        currentUSer: null,
        authErrorMessage: '',
        tripList: []
      });
    }
    handleLogout = () => {
      this.setState({ currentUser: null });
      localStorage.removeItem('authToken')
      this.setState({
        currentUser: null,
        authErrorMessage: '',
        treipLists: []
      });
    }
    handleVerify = async () => {
      const currentUser = await verifyUser();
      if (currentUser)
        this.setState({ currentUser });
    }
    getTripLists = async () => {
      if (this.state.currentUser) {
        const tripLists = await getTripListsByUser(this.state.currentUser.id);
        this.setState({ tripLists })
      }
      else {
        this.setState({ tripLists: [] })
      }
    }
    // Handle Change
    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState(prevState => ({
        getListFormData: {
          ...prevState.tripListFormData,
          [name]: value
        }
      }))
    }
    ///

    // Create trip list

    createTripList = async (userId) => {
      const newTripList = await post / tripList(userId, this.state.tripListFormData);
      this.setState(prevState => ({
        tripList: prevState.tripLists.map(tripList =>
          tripList.id === parseInt(id) ? newTripList : triplist)
      }))
      this.props.history.push('../')
    }

    // Update trip list
    updateTripList = async (id, triplist) => {
      const newTripList = await putTripList(id, triplist);
      this.setState(prevState => ({
        tripList: prevState.tripLists.map(triplist =>
          triplist.id === parseInt(id) ? newTripLists : triplist)
      }))
      this.props.history.push('../')
    }
    // Delete trip list 
    deleteTripList = async (id) => {
      const ret = await deleteTripList(id);
      this.setState(prevState => ({
        tripLists: prevState.tripLists.filter(tripList => {
          return tripList.id !== id
        })
      }))
      this.props.history.push('../')
    }

  }

    render() {
      const { currentUser } = this.state;
      return (
        <div className="app">
          <Header 
            currentUser={currentUser}
            handleLogout={this.handleLogout}
          />
          <Route path='/login' render={() => (
            <Home
              currentUser={currentUser}
              tripList={this.state.tripLists}
            />)} />
          <Route path='/register' render={() => (
            <RegisterForm
              handleRegister={this.handleRegister}
              authErrorMessage={this.state.authErrorMassage}
            />
          )} />
          <Route path='/tripLists/:id' render={(props) => {
            const id = props.match.params.id;
            const currentTripList = this.state.tripLists.find(gl => {
              return gl.id === parseInt(id)
            })
            return <TripListDetails
              currentTripList={currentTripList}
            deleteTripList={this.deleteList}
            />
          }} />
          <Route path='/create_tripLists' render={() => (
            <CreateTripListForm
              createTripList={this.createTripList}
              handleChnage={this.createTripList}
              currentUser={currentUser}
              tripListFormData={this.state.tripListFormData}
            />

          )} />
          <Route exact path='/update_giftList/:id' render={(props) => {
            const id = props.match.params.id;
            return <UpdateTripListForm
              tripLists={this.state.tripLists}
              tripListId={id}
              tripListFormData={this.state.trip.istFormData}
          updateTripList={this.updateTripList}
          />
        }} />
          <Footer />


        </div>
      );
    }
  }

export default withRouter(App);
