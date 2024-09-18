import React from 'react'
import EmployeeForm from '../Components/EmployeeForm/EmployeeForm.jsx'
import { useNavigate } from 'react-router-dom'

function CreateEmployeePage() {
  const navigate = useNavigate()
  return (
    <div>
      <EmployeeForm onSubmitSuccess={(newEmployee) => {
        if(newEmployee){
          navigate("/employeeList")
        }
    }}/>
    </div>
  )
}

export default CreateEmployeePage
