import React, { useContext } from 'react';
import { EmployeeContext } from './EmployeeContext';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const { employees } = useContext(EmployeeContext);

  return (
    <div>
      <h1>Employee List</h1>
      <Link to="/add">
        <button>Add Employee</button>
      </Link>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.name} - {employee.email}
            <Link to={`/edit/${employee.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const deleteEmployee = async (id) => {
  try {
    await axios.delete(`/employees/${id}`);
    fetchEmployees();
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
};

export default EmployeeList;
