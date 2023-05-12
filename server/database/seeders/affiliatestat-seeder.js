import User from "../../models/User.model.js";
import Transaction from "../../models/Transaction.model.js";
import AffiliateStat from "../../models/AffiliateStat.model.js";

const affiliateStatSeeder = async () => {
  try {
    // Fetch all users and transactions
    const users = await User.find({});
    const transactions = await Transaction.find({});

    const affiliateStatRecords = [];

    for (let i = 0; i < 50; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomTransactions = transactions.slice(
        0,
        Math.floor(Math.random() * transactions.length)
      );

      const affiliateStat = new AffiliateStat({
        userId: randomUser._id,
        affiliateSales: randomTransactions.map(
          (transaction) => transaction._id
        ),
      });

      affiliateStatRecords.push(affiliateStat);
    }

    // Insert the generated records into the database
    await AffiliateStat.insertMany(affiliateStatRecords);

    console.log("AffiliateStat records seeded successfully!");
  } catch (error) {
    console.error("Error seeding AffiliateStat records:", error);
  }
};

export default affiliateStatSeeder;
