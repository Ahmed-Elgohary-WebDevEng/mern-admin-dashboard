import Category from "../../models/Category.model.js";
import { faker } from "@faker-js/faker";

export const categorySeeder = async () => {
  try {
    // Create an array to store the generated categories
    const categories = [];

    // Generate 10 fake categories using the faker library
    for (let i = 0; i < 10; i++) {
      const category = {
        title: faker.commerce.department(),
        description: faker.lorem.sentence(),
      };
      categories.push(category);
    }

    // Save the categories to the database
    await Category.insertMany(categories);

    console.log('Seed complete: categories generated successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};
