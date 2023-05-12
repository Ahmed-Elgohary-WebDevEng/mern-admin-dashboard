import User from "../../models/User.model.js";
import Transaction from "../../models/Transaction.model.js";
import AffiliateStat from "../../models/AffiliateStat.model.js";
import mongoose from "mongoose";

const AffiliatestatController = {
  getUserPerformance: async (req, res) => {
    try {
      const { id } = req.params;

      const userWithStats = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "affiliatestats",
            localField: "_id",
            foreignField: "userId",
            as: "affiliateStats",
          },
        },
        { $unwind: "$affiliateStats" },
      ]);

      const saleTransactions = await Promise.all(
        userWithStats[0].affiliateStats.affiliateSales.map((id) => {
          return Transaction.findById(id);
        })
      );
      const filteredSaleTransactions = saleTransactions.filter(
        (transaction) => transaction !== null
      );

      res
        .status(200)
        .json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default AffiliatestatController;
