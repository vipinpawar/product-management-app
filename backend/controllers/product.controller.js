import Product from "../models/product.model.js";

export const getProducts=async(req,res)=>{
    try {
        const products = await Product.find();
        res.json(products);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export const postProducts=async(req,res)=>{
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        inStock: req.body.InStock,
      });
    
      try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

export const updateProduct=async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
    
        Object.assign(product, req.body);
        product.updatedAt = Date.now();
        
        const updatedProduct = await product.save();
        res.json(updatedProduct);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

export const deleteProduct=async(req,res)=>{
    console.log(req.params.id);
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
      }
}

export const getProductBYId=async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}