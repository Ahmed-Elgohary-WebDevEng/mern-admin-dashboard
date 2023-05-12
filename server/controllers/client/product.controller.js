import Product from "../../models/Product.model.js";


const ProductController = {
  getAllProducts: async (req, res) => {
    try {
        const products  = await Product.find().populate(['productStat', 'categoryId']);
        return res.status(200).json(products)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
  },
};

export default ProductController;
