//Fetch API for creating a house
const create = (house) => {
  return fetch('/api/house', {
    method: 'POST',
    body: house
    }).then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

// Fetch API for listing all houses admin
const list = () => {
  return fetch('/api/admin/houses', {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

// Fetch API for listing all houses for sale
const listBuy = () => {
  return fetch('/api/buy', {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

// Fetch API for listing all houses for rent
const listRent = () => {
  return fetch('/api/rent', {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

//List a few houses on homepage for sale
const homeBuy = () => {
  return fetch('/api/homepageBuy', {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

//List a few houses on homepage for rent
const homeRent = () => {
  return fetch('/api/homepageRent', {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

// Fetch API for reading a house
const read = (params) => {
  return fetch('/api/house/'+params.houseId, {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

// Fetch API for Updating a house
const update = (params, credentials, houses) => {
  return fetch('/api/house/update/'+params.houseId, {
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
  return fetch('/api/house/remove'+params.houseId, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer '+credentials.t
    }
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

export { create, list, listBuy, listRent, homeBuy, homeRent, read, update, remove };
