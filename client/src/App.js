import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import { registerUser, loginUser, verifyUser, getTripListsByUser, postTripList, putTripList, deleteTripList } from './services/api-helper';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateTripListForm from './components/CreateTripListForm';
import TripListDetails from './components/TripDetails';
import UpdateTripListForm from './components/UpdateTripListForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';



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
    // await this.handleVerify();
    // await this.getTripList();
  }

  handleLogin = async (loginData) => {
    const currentUser = await loginUser(loginData);
    if (currentUser.error) {
      this.setState({ authErrorMessage: currentUser.error });
    }
    else {
      this.setState({ currentUser });
      await this.getTripList();
      this.props.history.push('./');
    }
  }
  handleRegister = async (registerData) => {
    const currentUser = await registerUser(registerData);
    if (currentUser.error) {
      this.setState({ authErrorMessage: currentUser.error });
    }
    else {
      this.setState({ currentUser });
      this.props.history.push('./');
    }
  }

    handleLogout = () => {
      this.setState({ currentUser: null });
      localStorage.removeItem('authToken')
      this.setState({
        currentUser: null,
        authErrorMessage: '',
        tripLists: []
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
      const newTripList = await postTripList(userId, this.state.tripListFormData);
      this.setState(prevState => ({
        tripList: [...prevState.tripLists, newTripList] 
      }))
      this.props.history.push('./');
    }

    // Update trip list
    updateTripList = async (id, triplist) => {
      const newTripList = await putTripList(id, triplist);
      this.setState(prevState => ({
        tripList: prevState.tripLists.map(triplist =>
          triplist.id === parseInt(id) ? newTripList : triplist)
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


    render() {
      const { currentUser } = this.state;
      return (
        <div className="app">
          <h2>My travel app</h2>
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
