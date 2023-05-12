import User from "../../models/User.model.js";

const CustomerController = {
  getAllCustomers: async (req, res) => {
    try {
      const customers = await User.find({role: "user"}).select("-password");
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default CustomerController