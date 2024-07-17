import React, { useState, useContext, useEffect } from 'react';
import { EmployeeContext } from './EmployeeContext';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeForm = () => {
  const { fetchEmployees } = useContext(EmployeeContext);
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    address: '',
    photo: null
  });
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/employees/${id}`)
        .then(response => setEmployee(response.data))
        .catch(error => console.error('Error fetching employee:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEmployee({
      ...employee,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in employee) {
      formData.append(key, employee[key]);
    }

    try {
      if (id) {
        await axios.put(`/employees/${id}`, formData);
      } else {
        await axios.post('/employees', formData);
      }
      fetchEmployees();
      history.push('/');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit' : 'Add'} Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
            pattern="^[A-Za-z\s]+$"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={employee.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={employee.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Photo:</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
          />
        </div>
        <button type="submit">{id ? 'Update' : 'Add'} Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
