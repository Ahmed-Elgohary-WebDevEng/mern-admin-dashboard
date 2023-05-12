import { faker } from "@faker-js/faker";
import Category from "../../models/Category.model.js";
import ProductStat from "../../models/ProductStat.model.js";
import Product from "../../models/Product.model.js";

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
export const categoryProductStatSeeder = async () => {

  // 1- Get all categories _id
  const categories = await Category.find();

  // Generate faker data for each month
  const monthlyData = [];
  for (let j = 0; j < 12; j++) {
    const month = months[j];
    const totalSales = faker.finance.amount(300, 10000, 2);
    const totalUnits = faker.datatype.number({ min: 10, max: 200 });
    monthlyData.push({ month, totalSales, totalUnits });
  }

  // generate faker data of each day of the month
  const dailyData = [];
  for (let k = 0; k < 30; k++) {
    const date = faker.date.recent();
    const totalSales = faker.finance.amount(50, 500, 2);
    const totalUnits = faker.datatype.number({ min: 2, max: 20 });
    dailyData.push({ date, totalSales, totalUnits });
  }


  const products = [];
  for (let i = 0; i < 75; i++) {
    const productStat = new ProductStat({
      yearlySalesTotal: faker.commerce.price(),
      yearlyTotalSoldUnits: faker.datatype.number({ min: 1, max: 1000 }),
      year: faker.date.past().getFullYear(),
      monthlyData: monthlyData,
      dailyData: dailyData,
    });

    await productStat.save();

    const product = new Product({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.lorem.sentences(),
      rating: faker.datatype.number({ min: 1, max: 5 }),
      supply: faker.datatype.number({ min: 1, max: 50 }),
      productStat: productStat,
      categoryId: categories[Math.floor(Math.random() * categories.length)]._id,
    });

    products.push(product);
  }

  // console.log(categories)
  // console.log(products)

  await Product.insertMany(products);

  console.log("Product with ProductStat Seeded Success")

  /*Promise.all(categories.map((category) => category.save()))
    .then(() => Promise.all(products.map((product) => product.save())))
    .then(() => {
      console.log("Database seeded with Category, Product, and ProductStat");
    })
    .catch((err) => {
      console.log(err);
    });*/
};
