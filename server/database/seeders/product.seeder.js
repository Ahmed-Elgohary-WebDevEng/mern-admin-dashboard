import { faker } from "@faker-js/faker";
import Product from "../../models/Product.model.js";
import Category from "../../models/Category.model.js";

export const productSeeder = async () => {
  // 1- Get all categories _id
  const categories = await Category.find();

  // 2- Generate 10 faker product
  const products = [];

  // const categoriesId = categories.map((category) => category._id.toString());
  for (let i = 0; i < 10; i++) {

    const product = new Product({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.lorem.paragraph(),
      productStat: categories[Math.floor(Math.random() * categories.length)]._id, // Replace with a valid category id
      rating: Math.floor(Math.random() * 5) + 1,
      supply: Math.floor(Math.random() * 100) + 1,
    });

    products.push(product);
  }

  await Product.insertMany(products);

  console.log("Product seeded Success");
};
