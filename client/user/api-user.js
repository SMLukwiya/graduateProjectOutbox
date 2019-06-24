// Fetch API to create user
const create = (user) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
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
  return fetch('/api/user/'+params.userId, {
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


export { create, read };
