import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const logoutUser = async() => {
       try {
        const res =  await axios.get("/api/users/logout")
        if(res.data){
         dispatch(logout())
         navigate("/login")
        }
       } catch (error) {
        console.log(error)
       }
        
    }

  return (
    <header className="bg-blue-200 py-4 shadow-lg cursor-pointer">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-xl font-bold">Logo</div>
          <nav className="flex space-x-12">
            <Link to={"/"}>
            <p className="text-gray-700 font-semibold">Home</p>
            </Link>
            <Link to={"/employeeList"}>
            <p className="text-gray-700 font-semibold">Employee List</p>
            </Link>
            <div className="flex items-center space-x-2 ml-10">
              <span className="text-gray-700 font-semibold">{userData?.fullname}</span>
              <p className="text-red-500 font-semibold"
              onClick={logoutUser}
              >Logout</p>
            </div>
          </nav>
        </div>
    </header>
  )
}

export default Header
