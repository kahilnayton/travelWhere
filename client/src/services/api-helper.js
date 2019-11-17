import axios from 'axios';
const api = axios.create({
  baseURL: "http://localhost:3001"
})

// Auth 
export const registerUser = async (registerData) => {
  try {
    const resp = await api.post('/auth/register', registerData);
    api.defaults.header.common.authorization = `Bearer ${resp.data.token}`;
    localStorage.authToken = resp.data.token;
    return resp.data.user;
  }
  catch (err) {
    return { error: 'Invalid credentials'}
  }
}

export const loginUser = async (loginData) => {
  try {
    const resp = await api.post('/auth/login', loginData);
    localStorage.authToken = resp.data.token;
    return resp.data.user;
  }
  catch (err) {
    return { error: 'Invalid credentials'}
  }
}
export const verifyUser = async () => {
  const token = localStorage.authToken;
  if (token) {
    api.default.headers.common.authorization = `Bearer ${token}`;
    const resp = await api.get('/auth/verify');
    return resp.data;
  }
  return false;
}

// Trip List  - get all lists

export const getListsByUser = async (userId) => {
  try {
    const resp = await api.get(`/triplists/${userId}/`);
    return resp.data.triplists;
  }
  catch (err) {
    return { error: 'Unable to retrieve trip lists'}
  }
}
    
// Create Trip List 
export const getTripListsByUser = async (userId, tripListData) => {
  const resp = await api.post(`/user/${userId}/triplists`, tripListData)
  return resp.data.tripList
}

export const postTripList = async (id) => {
  try {
    const resp = await api.get(`triplists/${id}/trips`);
    return resp.data.trips;
  }
  catch (err) {
    return { error: 'Unable to retrieve Trips'}
  }
}

// Update trip
export const putTripList = async (id, tripListData) => {
  const resp = await api.put(`/triplists${ id }`, tripListData)
  return resp.data.tripList
}

// Delete a trip list
export const deleteTripList = async (id, tripListData) => {
  const resp = await api.put(`/triplists/${id}`);
  return resp.data;
}

// Create location 
export const postLocation = async (tripListId, locationData) => {
  const resp = await api.post(`./locationList/${tripListId}/trips`, locationData)
  return resp.data.location
}

// Create location - put
export const putLocation = async (locationId, locationData) => {
  const resp = await api.put(`/locationList/anything/locations/${locationId}`, locationData)
  return resp.data.location
}

// Delete location 
export const deleteLocation = async (locationId) => {
  const resp = await api.delete(`/localtionList/anything/locations/${locationId}`)
  return 'Deleted';
};
