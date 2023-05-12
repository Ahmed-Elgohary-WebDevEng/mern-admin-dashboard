import express from "express";
import {getUserById} from "../controllers/general.controller.js";
import DashboardController from "../controllers/dashboard.controller.js";

const generalRoutes= express.Router()

generalRoutes.get("/user/:id", getUserById)
generalRoutes.get("/dashboard", DashboardController.getDashboardStats);
export default generalRoutes
