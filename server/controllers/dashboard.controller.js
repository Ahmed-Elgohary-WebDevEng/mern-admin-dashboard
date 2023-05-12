import Transaction from "../models/Transaction.model.js";
import OverallStat from "../models/OvarallStat.model.js";

const DashboardController = {
  getDashboardStats: async (req, res) => {
    // constant values
    const currentMonth = "April";
    const currentYear = 2021;
    const currentDay = "2021-05-01";
    try {
      // get recent transactions
      const transactions = await Transaction.find()
        .limit(50)
        .sort({ createdAt: -1 });

      // overallStat
      const overallStat = await OverallStat.find({ year: currentYear });
      const {
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
      } = overallStat[0];

      const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
        return month === currentMonth;
      });

      const todayStats = overallStat[0].dailyData.find(({ date }) => {
        return date === currentDay;
      });

      res.status(200).json({
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
        thisMonthStats,
        todayStats,
        transactions,
      });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default DashboardController;
