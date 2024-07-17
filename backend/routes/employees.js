const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const Employee = require('./models/Employee'); // Adjust the path as necessary

const app = express();
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });

// Create Employee
app.post('/employees', upload.single('photo'), async (req, res) => {
  try {
    const { name, age, email, dateOfBirth, address } = req.body;
    const photo = req.file ? req.file.path : null;
    const employee = await Employee.create({ name, age, email, dateOfBirth, address, photo });
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Employee by ID
app.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Employee
app.put('/employees/:id', upload.single('photo'), async (req, res) => {
  try {
    const { name, age, email, dateOfBirth, address } = req.body;
    const photo = req.file ? req.file.path : null;
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    await employee.update({ name, age, email, dateOfBirth, address, photo });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Employee
app.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    await employee.destroy();
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
