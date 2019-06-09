//Fetch API for creating house
const create = (house) => {
  return fetch('/api/rent/', {
    method: 'POST',
    body: house
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

//Fetch API for listing all houses
const list = () => {
  return fetch('/api/rent', {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

//Fetch API for reading one house
const read = (params) => {
  return fetch('/api/renthouse/'+params.houseId, {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

//Fetch API for updating a house
const update = (params, credentials, houses) => {
  return fetch('/api/rent/update/'+params.houseId, {
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
  return fetch('/api/rent/remove'+params.houseId, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer '+credentials.t
    }
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

export { create, list, read, update, remove };
