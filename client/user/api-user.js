// Fetch API to create user
const create = (user) => {
  return fetch('/api/users/', {
    method: 'POST',
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then((response) => {
    return response.json();
  })
  .catch((err) => console.log(err));
}

// Fetch API to read a user
const read = (params, credentials) => {
  return fetch('/api/users/'+params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+credentials.t
    }
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

// Fetch API to update a user
const update = (params, credentials, users) => {
  return fetch('/api/users/'+params.userId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ credentials.t
    },
    body: JSON.stringify(user)
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

// Fetch API to delete a user
const remove = (params, credentials) => {
  return fetch('/api/users/'+params.userId, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+credentials.t
    }
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

export { create, list, read, update, remove };
