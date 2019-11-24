import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001"
});

// Auth
export const registerUser = async registerData => {
  try {
    const resp = await api.post("/auth/register", registerData);
    api.defaults.header.common.authorization = `Bearer ${resp.data.token}`;
    localStorage.authToken = resp.data.token;
    return resp.data.user;
  } catch (err) {
    return { error: "Invalid credentials" };
  }
};

export const loginUser = async loginData => {
  try {
    const resp = await api.post("/auth/login", loginData);
    localStorage.authToken = resp.data.token;
    return resp.data.user;
  } catch (err) {
    return { error: "Invalid credentials" };
  }
};
// Verify
export const verifyUser = async () => {
  const token = localStorage.authToken;
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    const resp = await api.get("/auth/verify");
    return resp.data;
  }
  return false;
};

// Trip List  - get all lists
export const getTripListsByUser = async userId => {
  try {
    const resp = await api.get(`/users/${userId}/triplists`);
    return resp.data.triplists;
  } catch (err) {
    return { error: "Unable to retrieve trip lists" };
  }
};


export const postTripListsByUser = async (userId, tripListData) => {
  const resp = await api.post(`/users/${userId}/triplists`, tripListData);
  return resp.data.triplists;
};

// Create a trip list
export const postTripList = async (userId,data) => {
  try {
    debugger;
    const resp = await api.post(`/users/${userId}/triplists`,data);
    return resp.data.triplist;
  } catch (err) {
    return { error: "Unable to retrieve Trips" };
  }
};

// current trip list id
export const currentTripListId = async (userId,id) => {
  try {
    const resp = await api.get(`/users/${userId}/triplists/${id}`);
    return resp.data.triplists.id;
  } catch (err) {
    return { error: "Unable to retrieve Trips Id" };
  }
};

// Get location by list details
export const getLocationsByTripList = async (userId,tripListId) => {
  try {
    const resp = await api.get(
      `users/${userId}/triplists/${tripListId}/locations`);
    return resp.data.locations; // returns the trip list details
  } catch (err) {
    return { error: "Unable to retrieve locations" };
  }
};

// Update trip list
export const putTripList = async (userId ,id, tripListData) => {
  const resp = await api.put(`/users/${userId}/triplists/${id}`, tripListData);
  return resp.data.triplist;
};

// Delete a trip list
export const deleteTripList = async (userId,id) => {
  const resp = await api.delete(`/users/${userId}/triplists/${id}`);
  return resp.data;
};

// Create location
export const postLocation = async (tripListId, locationData) => {
  const resp = await api.post(
    `./locationlist/${tripListId}/locations`,
    locationData
  );
  return resp.data.location;
};

// Update location - put
export const putLocation = async (locationId, locationData) => {
  // debugger;
  const resp = await api.put(
    `/locationlists/yeah/locations/${locationId}`,
    locationData
  );
  return resp.data.location;
};

// Delete location
export const deleteLocation = async locationId => {
  const resp = await api.delete(
    `/localtionList/anything/locations/${locationId}`
  );
  return "Deleted";
};
