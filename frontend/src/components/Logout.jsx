import React from 'react'
import axiosInstance from '../utils/apiInstance'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axiosInstance.get("/auth/logout");
            
            localStorage.removeItem('username');
           
            delete axiosInstance.defaults.headers.common['Authorization'];
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
            Logout
        </button>
    )
}

export default Logout;