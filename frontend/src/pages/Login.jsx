import React, { useState } from 'react'
import axiosInstance from '../utils/apiInstance';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/auth/login", {
                email, password
            });
            if (response.data.username) {
                localStorage.setItem('username', response.data.username);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.username}`;
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className='text-3xl font-bold text-center mb-6'>Admin Login</h1>
                
                <div className="space-y-4">
                    <input 
                        type="email" 
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input 
                        type="password" 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button 
                        type='submit'
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </div>
                <h6 className=' text-center m-3'>Don't have account <Link className='underline' to={"/signup"}>singup now</Link> </h6>
            </form>
        </div>
    )
}

export default Login