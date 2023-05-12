import mongoose from "mongoose";

const affiliateStatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  affiliateSales: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Transaction",
  },
});

const AffiliateStat = mongoose.model("AffiliateStat", affiliateStatSchema);
export default AffiliateStat;
