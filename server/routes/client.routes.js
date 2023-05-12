import express from "express";
import ProductController from "../controllers/client/product.controller.js";
import CustomerController from "../controllers/client/customer.controller.js";
import TransactionController from "../controllers/client/transaction.controller.js";
import GeographyController from "../controllers/client/geography.controller.js";

const clientRoutes= express.Router()

clientRoutes.get("/products", ProductController.getAllProducts);
clientRoutes.get("/customers", CustomerController.getAllCustomers)
clientRoutes.get("/transactions", TransactionController.getAllTransactions)
clientRoutes.get("/geography", GeographyController.getGeography)

export default clientRoutes
