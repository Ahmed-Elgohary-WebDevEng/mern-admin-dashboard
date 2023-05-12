import express from "express";
import SalesController from "../controllers/sales/sales.controller.js";

const salesRoutes = express.Router();

salesRoutes.get("/", SalesController.getAllSales);

export default salesRoutes;
