import User from "../../models/User.model.js";
import Product from "../../models/Product.model.js";
import Transaction from "../../models/Transaction.model.js";

export const transactionSeeder = async () => {
  // Fetch all users and products from their respective collections
  const users = await User.find();
  const products = await Product.find();

  // Create an array to hold all the transactions
  const transactions = [];

  // Loop through 50 times to create 50 transactions
  for (let i = 0; i < 95; i++) {
    // Randomly select a user and cost for the transaction
    const user = users[Math.floor(Math.random() * users.length)];
    const cost = (Math.floor(Math.random() * 1000) + 1).toString();

    // Randomly select between 1 and 5 products for the transaction
    const numProducts = Math.floor(Math.random() * 5) + 1;
    const productIds = [];
    for (let j = 0; j < numProducts; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      productIds.push(product._id);
    }

    // Create the new transaction record
    const transaction = new Transaction({
      userId: user._id,
      cost: cost,
      products: productIds,
    });

    // Add the transaction to the array of transactions
    transactions.push(transaction);
  }

  // Insert all the transactions into the collection
  await Transaction.insertMany(transactions);

  console.log("Transaction seeder complete!");
};
