import express from "express";
import AdminController from "../controllers/management/admin.controller.js";
import AffiliatestatController from "../controllers/management/affiliatestat.controller.js";

const managementRoutes = express.Router();

managementRoutes.get("/admins", AdminController.getAdmins);
managementRoutes.get(
  "/performance/:id",
  AffiliatestatController.getUserPerformance
);
export default managementRoutes;
