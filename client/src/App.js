import React from "react";
import arrow from "./images/arrow-up.png";
import logo from "./images/login.jpg";
import { Route, withRouter } from "react-router-dom";
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
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
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
    // await this.fillTripListFormData(this.state.currentUser.id)
    Events.scrollEvent.register("begin", function() {
      console.log("begin", arguments);
    });
    this.scrollToTop = this.scrollToTop.bind(this);
    
  };
  //   if (this.tripLists) {
  //   await this.fillTripListFormData(this.state.currentUser.id)
  //   Events.scrollEvent.register("begin", function () {
  //     console.log("begin", arguments);
  //   });
  //   this.scrollToTop = this.scrollToTop.bind(this);
  // }
  // }

  scrollToTop() {
    scroll.scrollToTop();
  }

  scrollToWithContainer() {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register("end", () => {
        resolve();
      });
      Events.scrollEvent.remove("end");
    });
  }
  // Get trip lists
  getTripLists = async () => {
    if (this.state.currentUser) {
      const tripLists = await getTripListsByUser(this.state.currentUser.id);
      this.setState({ tripLists });
    } else {
      this.setState({ tripLists: [] });
    }
  };

  // get current
  // getCurrentTrip = async id => {
  //   const currentTrip = await currentTripListId(id);
  //   const tripId = id;
  //   this.setState({ currentTrip });
  // };

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
      this.props.history.push("/");
    }
  };
  handleRegister = async registerData => {
    const currentUser = await registerUser(registerData);
    if (currentUser.error) {
      this.setState({ authErrorMessage: currentUser.error });
    } else {
      this.setState({ currentUser });
      this.props.history.push("/");
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
    this.props.history.push("/login");
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


  // Create trip list
  createTripList = async userId => {
    const newTriplist = await postTripList(userId, this.state.tripListFormData);
    this.setState(prevState => ({
      tripLists: [...prevState.tripLists, newTriplist]
    }));
    this.props.history.push("/");
  };

  // Update trip list
  updateTripList = async (id, triplist) => {
    debugger;
    const userId = this.state.currentUser.id;
    const newTripList = await putTripList(userId, id, triplist);
    this.setState(prevState => ({
      tripLists: prevState.tripLists.map(triplist =>
        triplist.id === parseInt(id) ? newTripList : triplist
      )
    }));
    this.props.history.push("../");
  };
  // Delete trip list
  deleteTripList = async id => {
    await deleteTripList(this.state.currentUser.id, id);
    this.setState(prevState => ({
      tripLists: prevState.tripLists.filter(tripList => {
        return tripList.id !== id;
      })
    }));
    this.props.history.push("/");
  };

  render() {
    // console.log(this.state)
    const { currentUser } = this.state;
    return (
      <div className="app">
        <Header currentUser={currentUser} handleLogout={this.handleLogout} />

        <Link // scrolling link
          activeClass="active"
          className="test1"
          to="test1"
          spy={true}
          smooth={true}
          duration={500}
        >
          {this.state.tripLists && (
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  currentUser={currentUser}
                  tripLists={this.state.tripLists}
                />
              )}
            />
          )}
        </Link>
        {!this.state.currentUser && (
          <LoginForm
            handleLogin={this.handleLogin}
            authErrorMessage={this.state.authErrorMessage}
          />
        )}
        <Route
          path="/login"
          render={() => (
            <LoginForm
              handleLogin={this.handleLogin}
              authErrorMessage={this.state.authErrorMessage}
            />
          )}
        />

        <Route
          path="/register"
          render={() => (
            <RegisterForm
              handleRegister={this.handleRegister}
              authErrorMessage={this.state.authErrorMessage}
            />
          )}
        />
        {this.state.tripLists && (
          <>
            <Element name="test1" className="element" duration={500}>
              <Route
                path="/triplists/:id"
                render={props => {
                  const id = props.match.params.id;
                  const currentTripList = this.state.tripLists.find(tl => {
                    return tl.id === parseInt(id);
                  });
                  return (
                    <TripListDetails
                      currentUser={this.state.currentUser}
                      currentTripList={currentTripList}
                      deleteTripList={this.deleteTripList}
                      getCurrentTrip={this.getCurrentTrip}
                    />
                  );
                }}
              />
            </Element>

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
                const currentTripList = this.state.tripLists.find(tl => {
                  return tl.id === parseInt(id);
                });
                return (
                  <UpdateTripListForm
                    tripLists={this.state.tripLists}
                    tripListId={id}
                    currentTripList={currentTripList}
                    updateTripList={this.updateTripList}
                  />
                );
              }}
            />
          </>
        )}
        <div className="stage">
          <img className="arrow-up bounce" src={arrow} onClick={this.scrollToTop} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
