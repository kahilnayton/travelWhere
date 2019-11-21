import React from "react";
import logo from "./logo.svg";
import { Route, withRouter, Link } from "react-router-dom";
import {
  registerUser,
  loginUser,
  verifyUser,
  getTripListsByUser,
  postTripListsByUser,
  postTripList,
  putTripList,
  deleteTripList,
  currentTripListId
} from "./services/api-helper";
import {
  DirectLink,
  Element,
  Events,
  animateScroll as scroll, scrollSpy, scroller
} from 'react-scroll'
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateTripListForm from "./components/CreateTripListForm";
import UpdateTripListForm from "./components/UpdateTripListForm";
import TripListDetails from "./components/TripListDetails";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import "./App.css";

class App extends React.Component {
  state = {
    currentTrip: null,
    currentUser: null,
    authErrorMessage: "",
    tripLists: [],
    tripListFormData: {
      title: "",
      description: "",
      image_link: "",
      travel_date: ""
    }
  };
  
  
  componentDidMount = async () => {
    await this.handleVerify();
    await this.getTripLists();
    Events.scrollEvent.register('begin', function () {
      console.log('begin', arguments)
    })
    this.scrollToTop = this.scrollToTop.bind(this);
  };

  scrollToTop() {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0
    })
  }


  // Get trip lists
  getTripLists = async () => {
    if (this.state.currentUser) {
      const tripLists = await getTripListsByUser(this.state.currentUser.id);
      this.setState({ tripLists });
    }

    //   else {
    //     this.setState({ tripLists: [] });
    //   }
  };
  // get current
  getCurrentTrip = async id => {
    const currentTrip = await currentTripListId(id);
    debugger;
    const tripId = id;
    this.setState({ currentTrip });
  };

  handleVerify = async () => {
    const currentUser = await verifyUser();
    if (currentUser) this.setState({ currentUser });
    await this.getTripLists();
  };

  handleLogin = async loginData => {
    const currentUser = await loginUser(loginData);
    if (currentUser.error) {
      this.setState({ authErrorMessage: currentUser.error });
    } else {
      this.setState({ currentUser });
      await this.getTripLists();
      this.props.history.push("./");
    }
  };
  handleRegister = async registerData => {
    const currentUser = await registerUser(registerData);
    if (currentUser.error) {
      this.setState({ authErrorMessage: currentUser.error });
    } else {
      this.setState({ currentUser });
      this.props.history.push("./");
    }
  };

  handleLogout = () => {
    this.setState({ currentUser: null });
    localStorage.removeItem("authToken");
    this.setState({
      currentUser: null,
      authErrorMessage: "",
      tripLists: []
    });
  };

  // Handle Change
  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      tripListFormData: {
        ...prevState.tripListFormData,
        [name]: value
      }
    }));
  };
  ///

  // Create trip list
  createTripList = async userId => {
    const newTripLists = await postTripList(
      userId,
      this.state.tripListFormData
    );
    this.setState(prevState => ({
      tripLists: [...prevState.tripLists, newTripLists]
    }));
    this.props.history.push("./");
  };

  // Update trip list
  updateTripList = async (id, triplist) => {
    const newTripList = await putTripList(id, triplist);
    this.setState(prevState => ({
      tripLists: prevState.tripLists.map(triplist =>
        triplist.id === parseInt(id) ? newTripList : triplist
      )
    }));
    this.props.history.push("../");
  };
  // Delete trip list
  deleteTripList = async id => {
    const deleteList = await deleteTripList(id);
    this.setState(prevState => ({
      tripLists: prevState.tripLists.filter(tripList => {
        return tripList.id !== id;
      })
    }));
    this.props.history.push("../");
  };

  render() {
    // console.log(this.state)
    const { currentUser } = this.state;
    return (
      <div className="app">
        <Header currentUser={currentUser} handleLogout={this.handleLogout} />

        <Route
          path="/"
          render={() => (
            <Home currentUser={currentUser} tripLists={this.state.tripLists} />
          )}
        />

        <Route
          path="/login"
          render={() => (
            <LoginForm
              handleLogin={this.handleLogin}
              authErrorMessage={this.state.authErrorMassage}
            />
          )}
        />

        <Route
          path="/register"
          render={() => (
            <RegisterForm
              handleRegister={this.handleRegister}
              authErrorMessage={this.state.authErrorMassage}
            />
          )}
        />

        <Route
          path="/tripLists/:id"
          render={props => {
            const id = props.match.params.id;
            const currentTripList = this.state.tripLists.find(tl => {
              return tl.id === parseInt(id);
            });
            return (
                <TripListDetails
                  currentTripList={currentTripList}
                  deleteTripList={this.deleteList}
                  getCurrentTrip={this.getCurrentTrip}
                />
            );
          }}
        />

        <Route
          path="/create_tripLists"
          render={() => (
            <CreateTripListForm
              createTripList={this.createTripList}
              handleChange={this.handleChange}
              currentUser={currentUser}
              tripListFormData={this.state.tripListFormData}
            />
          )}
        />
        <Route
          exact
          path="/update_tripList/:id"
          render={props => {
            const id = props.match.params.id;
            return (
              <UpdateTripListForm
                tripLists={this.state.tripLists}
                tripListId={id}
                tripListFormData={this.state.tripListFormData}
                updateTripList={this.updateTripList}
                currentTrip={this.state.currentTrip}
                getCurrentTrip={this.getCurrentTrip}
              />
            );
          }}
        />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
