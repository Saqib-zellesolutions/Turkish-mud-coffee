const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../../.env" });

const PaginationCategoryWthProduct = async (req, res) => {
    const branch = req.params.branch;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const number = branch === 'branch1'
            ? 1
            : branch === 'branch2'
                ? 2
                : branch === 'branch3'
                    ? 3
                    : branch === 'branch4'
                        ? 4
                        : null;

        if (number === null) {
            return res.status(400).json({ message: 'Invalid branch' });
        }

        const DBURI = process.env[`MONGODB_URL_BRANCH${number}`] + '?retryWrites=true&w=majority';
        const conn = mongoose.createConnection(DBURI);
        const CategoryModel = conn.model(`category_${branch}`, require('../../models/CategorySchema'));
        const SimpleProductModel = conn.model(`simpleProduct_${branch}`, require('../../models/SimpleProductSchema'));
        const VariableProductModel = conn.model(`variableProduct_${branch}`, require('../../models/VariableProductSchema'));
        const BeveragesModel = conn.model(`Beverages_${branch}`, require('../../models/BeveragesSchema'));

        // Fetch total number of categories
        const totalCategories = await CategoryModel.countDocuments();

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Fetch categories with pagination
        const categories = await CategoryModel.find().skip(skip).limit(limit);

        // Fetch associated products for each category
        const categoriesWithProducts = await Promise.all(categories.map(async (category) => {
            const simpleProducts = await SimpleProductModel.find({ parent_id: category.uniqueId });
            const variableProducts = await VariableProductModel.find({ parent_id: category.uniqueId });
            const beveragesProducts = await BeveragesModel.find({ parent_id: category.uniqueId });

            return {
                id: category._id,
                name: category.name,
                products: [...simpleProducts, ...variableProducts, ...beveragesProducts],
            };
        }));

        res.json({
            categories: categoriesWithProducts,
            currentPage: page,
            totalPages: Math.ceil(totalCategories / limit)
        });
    } catch (error) {
        console.error('Error fetching categories with products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = PaginationCategoryWthProduct;
