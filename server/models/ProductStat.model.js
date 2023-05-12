import mongoose from "mongoose";

const productStatSchema = new mongoose.Schema(
  {
    yearlySalesTotal: {
      type: Number,
      required: true,
    },
    yearlyTotalSoldUnits: {
      type: Number,
      required: true,
    },
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        data: Date,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProductStat = mongoose.model("ProductStat", productStatSchema);
export default ProductStat;
