import React, { useEffect, useState } from 'react'
import EmployeeForm from '../Components/EmployeeForm/EmployeeForm.jsx'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'


function UpdateEmployeePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [existingEmployeeData, setExistingEmployeeData] = useState(null)

    useEffect(() => {
        console.log("id in updateemoloyee", id)
            const fetchEmployee = async () => {
                const response = await axios.get(`/api/employees/${id}`)
                console.log("response data in upi",response)
                if(response.data) {
                    setExistingEmployeeData(response.data.data)
                }
                
            }
        fetchEmployee()
    },[id])

    console.log("existingEmployeeData", existingEmployeeData)
  return (
    <div>
      <EmployeeForm 
        employee={existingEmployeeData} 
        onSubmitSuccess={(updatedEmployee) => {
            if(updatedEmployee){
                navigate("/employeeList")
            }
        }} 
        />
    </div>
  )
}

export default UpdateEmployeePage
