import Product from "../../models/Product.model.js";
import { faker } from "@faker-js/faker";
import ProductStat from "../../models/ProductStat.model.js";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const productStatSeeder = async () => {
  // Retrieve product ids
  const productIds = await Product.find({}, "_id").lean();

  // Generate ProductStat records for each product
  const productStats = [];
  for (const productIdObj of productIds) {
    const productId = productIdObj._id;

    const yearlySalesTotal = faker.commerce.price();
    const yearlyTotalSoldUnits = faker.datatype.number({ min: 1, max: 1000 });

    const year = faker.date.recent().getFullYear();

    const monthlyData = [];

    for (let j = 0; j < 12; j++) {
      const month = months[j];
      const totalSales = faker.finance.amount(300, 10000, 2);
      const totalUnits = faker.datatype.number({ min: 10, max: 200 });
      monthlyData.push({ month, totalSales, totalUnits });
    }

    const dailyData = [];
    for (let k = 0; k < 30; k++) {
      const date = faker.date.recent();
      const totalSales = faker.finance.amount(50, 500, 2);
      const totalUnits = faker.datatype.number({ min: 2, max: 20 });
      dailyData.push({ date, totalSales, totalUnits });
    }

    const productStat = new ProductStat({
      productId,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      year,
      monthlyData,
      dailyData,
    });

    productStats.push(productStat);
  }

  // Insert ProductStat records into the database
  await ProductStat.insertMany(productStats);

  console.log("ProductStat seeded successfully");
};
