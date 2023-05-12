import User from "../../models/User.model.js";

const AdminController = {
  getAdmins: async (req, res) => {
    try {
      const admins = await User.find({ role: "admin" }).select("-password");

      return res.status(200).json(admins);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default AdminController;
