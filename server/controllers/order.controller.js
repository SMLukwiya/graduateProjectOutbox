import Order from '../models/order.model'
import _ from 'lodash'
import errorHandler from '../helpers/dbErrorHandler'

// Create an order
const create = (req, res) => {
  const order = new Order(req.body)
  order.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.status(200).json(result)
  })
}

// List order by user
const listByUser = (req, res) => {
  Order.find({"user": req.profile._id})
    .sort('-created')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        })
      }
      res.json(orders)
    })
}

// Find order by order Id
const orderById = (req, res, next, id) => {
  Order.findById(id).populate('houses').populate('user').exec((err, order) => {
    if (err || !order)
      return res.status('400').json({
        error: "Order not found"
      }
    )
    req.order = order
    next()
  })
}

// Read specific order
const read = (req, res) => {
  return res.json(req.order)
}

// Remove order
const remove = (req, res, next) => {
  let order = req.order
  order.remove((err, deletedOrder) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(deletedOrder)
  })
}

export default { create, listByUser, orderById, read, remove }
