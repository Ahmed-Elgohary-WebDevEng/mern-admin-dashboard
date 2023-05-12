import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import clientRoutes from "./routes/client.routes.js";
import generalRoutes from "./routes/general.routes.js";
import managementRoutes from "./routes/management.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import { userSeeder } from "./database/seeders/user.seeder.js";
import listEndPoints from "express-list-endpoints";
import { categorySeeder } from "./database/seeders/category.seeder.js";
import { productSeeder } from "./database/seeders/product.seeder.js";
import { productStatSeeder } from "./database/seeders/product-stat.seeder.js";
import { categoryProductStatSeeder } from "./database/seeders/category-product-stat.seeder.js";
import { transactionSeeder } from "./database/seeders/transaction-seeder.js";
import OverallStat from "./models/OvarallStat.model.js";
import { dataOverallStat } from "./data/data.js";
import affiliatestatSeeder from "./database/seeders/affiliatestat-seeder.js";

/**
 * Configuration
 */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/**
 * Routes
 */
app.use("/api/general", generalRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/sales", salesRoutes);

/**
 * Database Connection
 */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at PORT: ${process.env.PORT}`);
      console.log("Database connected successfully");
      console.log(listEndPoints(app));
    });

    /**
     * Database Seeders
     */
    // userSeeder();
    // categorySeeder();
    // categoryProductStatSeeder();
    // transactionSeeder();
    // affiliatestatSeeder()
/*    OverallStat.insertManyd(dataOverallStat)
      .then(() => {
        console.log("Seeded Success");
      })
      .catch((error) => {
        console.log(error);
      });*/
  })
  .catch((err) => {
    console.log(err.message);
  });
