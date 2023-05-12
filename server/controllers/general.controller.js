import User from "../models/User.model.js";

export const getUserById = async (req, res) => {
  // get the user id
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
