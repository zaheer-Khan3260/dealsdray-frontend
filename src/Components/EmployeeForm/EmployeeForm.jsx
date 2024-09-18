import React, { useState, useEffect } from 'react';
import axios from 'axios';


const EmployeeForm = ({ employee, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileno: '',
    designation: 'HR',
    gender: '',
    course: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  useEffect(() => {
    if (employee) {
      setFormData({
        ...employee,
        image: null,
      });
    }
  }, [employee]);

  // Handler for form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // File upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFormData({
        ...formData,
        image: file,
      });
    } else {
      setErrors({ ...errors, image: 'Only JPG/PNG files are allowed' });
    }
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.mobileno) newErrors.mobileno = 'Mobile is required';
    if (!/^\d{10}$/.test(formData.mobileno)) newErrors.mobileno = 'Mobile must be 10 digits';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!employee && !formData.image) newErrors.image = 'Image is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitMessage('');

      try {
        const formDataToSend = new FormData();
        for (const key in formData) {
          if (key !== 'image' || formData[key] !== null) {
            formDataToSend.append(key, formData[key]);
          }
        }

        let response;
        if (employee) {
          console.log("employee in emoploye form: ",employee)
          response = await axios.put(`/api/employees/${employee?._id}`, formDataToSend);
        } else {
          response = await axios.post(`/api/employees`, formDataToSend);
        }

        setSubmitMessage('Employee saved successfully!');
        if (onSubmitSuccess) {
          onSubmitSuccess(response.data);
        }
      } catch (error) {
        if (error.response) {
          setSubmitMessage(error.response.data.message || 'An error occurred while saving the employee.');
        } else {
          setSubmitMessage('An error occurred while saving the employee.');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form className="w-full max-w-lg bg-white p-8 shadow-lg rounded" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-6">{employee ? 'Edit Employee' : 'Create Employee'}</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <label className="block text-gray-700">Mobile No</label>
          <input
            type="text"
            name="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
          {errors.mobileno && <p className="text-red-500 text-sm">{errors.mobileno}</p>}
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label className="block text-gray-700">Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none"
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
          </div>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        {/* Course */}
        <div className="mb-4">
          <label className="block text-gray-700">Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none"
          >
            <option value="">Select a course</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
          </select>
          {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700">Image Upload</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileUpload}
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button 
            type="submit" 
            className="w-full bg-green-500 text-white py-2 rounded disabled:bg-green-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : (employee ? 'Update' : 'Submit')}
          </button>
        </div>

        {/* Submission Message */}
        {submitMessage && (
          <div className={`text-center ${submitMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default EmployeeForm;