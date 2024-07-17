import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { EmployeeProvider } from './EmployeeContext';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';

const App = () => (
  <Router>
    <EmployeeProvider>
      <Switch>
        <Route path="/" exact component={EmployeeList} />
        <Route path="/add" component={EmployeeForm} />
        <Route path="/edit/:id" component={EmployeeForm} />
      </Switch>
    </EmployeeProvider>
  </Router>
);

export default App;
