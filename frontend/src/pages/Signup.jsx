import React, { useState } from 'react'
import axiosInstance from '../utils/apiInstance';
import { useNavigate,Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/auth/signup", {
                username, email, password
            });
            if (response) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className='text-3xl font-bold text-center mb-6'>Admin Signup</h1>
                
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="email" 
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="password" 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type='submit'
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Signup
                    </button>
                </div>
                <h6 className='text-center mb-3'> Already have an account <Link to={"/login"} className='underline'>login now</Link> </h6>
            </form>
        </div>
    )
}

export default Signup