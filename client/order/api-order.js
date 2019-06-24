// Create an order
const create = (params, credentials, order) => {
  return fetch('/api/orders/'+params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(order)
    })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

// List all orders of a user
const list = (params, credentials) => {
  return fetch('/api/orders/user/'+params.userId, {
    method: 'GET',
    headers: {
     'Accept': 'application/json',
     'Authorization': 'Bearer ' + credentials.t
   }
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

// Read one specific order of a user
const read = (params, credentials) => {
  return fetch('/api/order/' + params.orderId, {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

// Delete an order of a User
const remove = (params, credentials) => {
  return fetch('/api/orders/'+ params.orderId, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

export { create, list, read, remove }
