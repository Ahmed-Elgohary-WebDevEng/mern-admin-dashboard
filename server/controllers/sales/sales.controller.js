import OverallStat from "../../models/OvarallStat.model.js";

const SalesController = {
  getAllSales: async (req, res) => {
    try {
      const overallStats = await OverallStat.find();

      res.status(200).json(overallStats[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default SalesController;
