//Fetch API for creating a house
const create = (house) => {
  return fetch('/api/buy', {
    method: 'POST',
    body: house
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

// Fetch API for listing all houses
const list = () => {
  return fetch('/api/buy', {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

// Fetch API for reading a house
const read = (params) => {
  return fetch('/api/buyhouse/'+params.houseId, {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

// Fetch API for Updating a house
const update = (params, credentials, houses) => {
  return fetch('/api/buyhouse/'+params.houseId, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer '+credentials.t
    },
    body: houses
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

// Fetch API for deleting a house
const remove = (params, credentials) => {
  return fetch('/api/buyhouse/'+params.houseId, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer '+credentials.t
    }
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

export { create, list, read, update, remove };
