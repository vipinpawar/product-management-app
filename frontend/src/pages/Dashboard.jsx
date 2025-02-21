import React,{useState, useEffect} from 'react'
import Logout from '../components/Logout'
import axiosInstance from '../utils/apiInstance';
import { ToastContainer, toast } from 'react-toastify';

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      category: '',
      InStock: true
    });
    const [editingId, setEditingId] = useState(null);
    const [searchId, setSearchId] = useState(""); // State for search input
    const [searchResult, setSearchResult] = useState(null);
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data);
      } catch (error) {
        toast.error('Error fetching products');
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (editingId) {
          await axiosInstance.put(`/products/${editingId}`, formData);
          toast.success('Product updated successfully');
        } else {
          await axiosInstance.post(`/products`, formData);
          toast.success('Product added successfully');
        }
        setFormData({
          name: '',
          price: '',
          category: '',
          InStock: true
        });
        setEditingId(null);
        fetchProducts();
      } catch (error) {
        toast.error('Error saving product');
      }
    };
  
    const handleEdit = (product) => {
        setFormData({
            ...product,
            InStock: Boolean(product.InStock)
          });
          setEditingId(product._id);
    };

    const handleSearch = async () => {
        if (!searchId) {
          toast.error("Please enter a product ID");
          return;
        }
        try {
          const response = await axiosInstance.get(`/products/${searchId}`);
          setSearchResult(response.data);
          toast.success("Product found!");
        } catch (error) {
          setSearchResult(null);
          toast.error("Product not found");
        }
      };
  
    const handleDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        try {
          await axiosInstance.delete(`/products/${id}`);
          toast.success('Product deleted successfully');
          fetchProducts();
        } catch (error) {
          toast.error('Error deleting product');
        }
      }
    };

    const adminName = localStorage.getItem("username");
  
    return (
      <div className="container mx-auto px-4 py-8">
        <nav className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Product Management System</h1>
        <h4 className="text-lg">Admin: {adminName}</h4>
        <Logout />
      </nav>

      <div>
        <input
          className='m-4 outline'
          type="text"
          placeholder="Enter Product ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className='m-4' onClick={handleSearch}>Search</button>
      </div>
      {searchResult && (
        <div>
          <h3>Search Result:</h3>
          <p><strong>ID:</strong> {searchResult._id}</p>
          <p><strong>Name:</strong> {searchResult.name}</p>
          <p><strong>Price:</strong> ${searchResult.price}</p>
          <button onClick={() => handleDelete(searchResult._id)}>Delete Product</button>
        </div>
      )}
        <form onSubmit={handleSubmit} className="m-8 max-w-lg">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 mb-2">In Stock</label>
            <select
              value={formData.InStock}
              onChange={(e) => setFormData({...formData,InStock: e.target.value === 'true'})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded p-4">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-semibold">Price: Rs.{product.price}</p>
              <p>Category: {product.category}</p>
              <p>Stock: {product.stockQuantity}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
    );
  }

export default Dashboard
