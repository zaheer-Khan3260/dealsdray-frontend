import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../helpers/Input';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/authSlice';

const Login = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
        setError("")
        console.log("userdata before apicall",data)
        const response = await axios.post("/api/users/login", data)
        if(response.data){
            const userData = response.data.data.user
        console.log("userdata after apicall",userData)
            dispatch(login(userData));
            navigate("/")
        }
    } catch (error) {
        setError(error.message)
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Login</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Don't have account <span className="font-bold text-indigo-500 hover:text-indigo-800" onClick={() => navigate('/signup')}>Signup</span>
          </p>

          {error && <p className="text-red-500 text-sm text-center mb-6">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Input
                {...register('username', {
                  required: 'username is required',
                })}
                label="Username"
                ClassName="w-full px-3 py-2 bg-gray-200 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="username"
                type="text"
                placeholder="Jhondoe"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
