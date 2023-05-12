import Transaction from "../../models/Transaction.model.js";

const TransactionController = {
  getAllTransactions: async (req, res) => {
    try {
      // Set default values for pagination, sorting, and search
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20;
      const sort = req.query.sort ? req.query.sort : "-createdAt";
      const search = req.query.search ? req.query.search : "";

      // Set up the query to get all transactions
      let query = Transaction.find();

      // Add filters for username and product name based on the search parameter
      if (search) {
        const regex = new RegExp(search, "i");
        query = query
          .or([{ cost: { $regex: regex } }])
          .populate({
            path: "userId",
            select: "-password",
          })
          .populate({
            path: "products",
            select: "-userId",
          });
      } else {
        query = query
          .populate({ path: "userId", select: "-password" })
          .populate({ path: "products" });
      }

      // Add pagination and sorting to the query
      query = query
        .sort(sort)
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      // Execute the query
      const transactions = await query;

      // Get the total count of transactions for pagination
      const totalCount = await Transaction.countDocuments();

      const prevPage = page > 1 ? page - 1 : null;
      const nextPage = page <= totalCount ? page + 1 : null;

      // Return the transactions with pagination metadata
      return res.status(200).json({
        page: page,
        prevPage: prevPage,
        nextPage: nextPage,
        pageSize: pageSize,
        totalCount: totalCount,
        transactions: transactions,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default TransactionController;
