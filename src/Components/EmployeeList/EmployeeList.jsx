import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const fetchEmployees = async ({
    search = '',
    course = '',
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
}) => {
    try {
        const response = await axios.get(`/api/employees`, {
            params: {
                search,
                course,
                page,
                limit,
                sortBy,
                sortOrder
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response.data.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [courseTerm, setCourseTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        loadEmployees();
    }, [searchTerm, courseTerm, currentPage, sortBy, sortOrder]);

    const loadEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchEmployees({
                search: searchTerm,
                course: courseTerm,
                page: currentPage,
                sortBy,
                sortOrder
            });
            setEmployees(result.employees);
            setTotalPages(result.totalPages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (field) => {
        if (field === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`/api/employees/${id}`);
                loadEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
                setError('Failed to delete employee');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="">
                {/* Sidebar */}
                <aside className="w-full bg-yellow-400 p-4">
                    <ul>
                        <li className="font-bold">Employee List</li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-grow p-6 bg-white">
                    {/* Employee List Heading */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-4">
                            <span className="text-gray-600">Total Count: {employees.length}</span>
                            <Link to={"/createEmployee"}>
                            <button className="bg-green-500 text-white py-1 px-3 rounded">Create Employee</button>
                            </Link>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="flex justify-end mb-4">
                        {/* <div className="flex items-center space-x-2">
                            <span className="font-semibold">Search Course:</span>
                            <input 
                                type="text" 
                                placeholder="Enter Course" 
                                className="border px-2 py-1 rounded"
                                value={courseTerm}
                                onChange={(e) => setCourseTerm(e.target.value)}
                            />
                        </div> */}
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">Enter Search Keyword:</span>
                            <input 
                                type="text" 
                                placeholder="Keyword" 
                                className="border px-2 py-1 rounded"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Error message */}
                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    {/* Loading indicator */}
                    {loading && <div className="text-blue-500 mb-4">Loading...</div>}

                    {/* Employee Table */}
                    <div className="overflow-auto">
                        <table className="table-auto w-full text-left border-collapse">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="border p-2 cursor-pointer" onClick={() => handleSort('id')}>Unique ID</th>
                                    <th className="border p-2">Image</th>
                                    <th className="border p-2 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
                                    <th className="border p-2 cursor-pointer" onClick={() => handleSort('email')}>Email</th>
                                    <th className="border p-2">Mobile No</th>
                                    <th className="border p-2">Designation</th>
                                    <th className="border p-2">Gender</th>
                                    <th className="border p-2">Course</th>
                                    <th className="border p-2 cursor-pointer" onClick={() => handleSort('createdAt')}>Create Date</th>
                                    <th className="border p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee._id}>
                                        <td className="border p-2">{employee._id}</td>
                                        <td className="border p-2"><img src={employee.image} alt="Employee" className="w-10 h-10" /></td>
                                        <td className="border p-2">{employee.name}</td>
                                        <td className="border p-2">
                                            <a href={`mailto:${employee.email}`} className="text-blue-600 underline">{employee.email}</a>
                                        </td>
                                        <td className="border p-2">{employee.mobileno}</td>
                                        <td className="border p-2">{employee.designaton}</td>
                                        <td className="border p-2">{employee.gender}</td>
                                        <td className="border p-2">{employee.course}</td>
                                        <td className="border p-2">{new Date(employee.createdAt).toLocaleDateString()}</td>
                                        <td className="border p-2">
                                            <Link to={`/updateEmployee/${employee._id}`}>
                                            <button className="text-white bg-blue-500 w-12 rounded-xl text-xl mr-2 p-1">Edit</button>
                                            </Link>
                                            <button className="text-white bg-red-500 w-16 text-center rounded-xl text-xl p-1 " onClick={() => handleDelete(employee._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-4 flex justify-center">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="mx-1 px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                        >
                            Previous
                        </button>
                        <span className="mx-2">Page {currentPage} of {totalPages}</span>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="mx-1 px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default EmployeeList;