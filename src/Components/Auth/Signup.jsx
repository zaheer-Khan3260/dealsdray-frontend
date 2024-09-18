import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from "../helpers/Input.jsx"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    try {
        setError("")
        console.log("userdata ",data)
        const response = await axios.post("/api/users/register", data)
        if(response.data){
            navigate("/login")
        }
    } catch (error) {
        setError(error.message)
        console.log(error)
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-lg p-8">

          <h2 className="text-3xl font-semibold text-gray-900 mb-2 text-center">Sign Up</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Already have an account? <span className="font-bold text-indigo-500 hover:text-indigo-800" onClick={() => navigate('/login')}>Login</span>
          </p>
          {error && <p className="text-red-500 text-sm mb-6 text-center">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="mb-4">
              
              <Input
                label="Name"
                {...register('fullname', { required: 'Full Name is required' })}
                ClassName="w-full px-3 py-2 bg-gray-200 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="fullName"
                type="text"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>

            {/* Username */}
            <div className="mb-4">
              <Input
                {...register('username', { required: 'Username is required' })}
                label="Username"
                ClassName="w-full px-3 py-2 bg-gray-200 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="username"
                type="text"
                placeholder="Username"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <Input
              label="Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
                ClassName="w-full px-3 py-2 bg-gray-200 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="email"
                type="email"
                placeholder="example@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="mb-6">
              <Input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                label="Password"
                ClassName="w-full px-3 py-2 bg-gray-200 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="password"
                type="password"
                placeholder="********"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
