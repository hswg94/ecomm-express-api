import express from "express";

import {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders,
  } from '../controllers/orderController.js';

import { userAuth, adminAuth } from '../middleware/authMiddleware.js'

  const router = express.Router();

  router.route("/")
  .get(userAuth, adminAuth, getAllOrders)
  .post(userAuth, createOrder)

  router.route("/myorders")
  .get(userAuth, getUserOrders)

  router.route("/:id")
  .get(userAuth, getOrderById);

  router.route("/:id/pay")
  .put(userAuth, updateOrderToPaid);

  router.route("/:id/deliver")
  .put(userAuth, updateOrderToDelivered);

  export default router;