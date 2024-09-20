import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    
    axios.get('http://localhost:8080/api/applications/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setApplications(response.data); // Store the applications in state
    })
    .catch((err) => {
      setError('Failed to fetch applications');
      console.error(err);
    });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (applications.length === 0) {
    return <p>No applications available</p>;
  }

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <ul>
        {applications.map((application) => (
          <li key={application.id}>
            <Link to={`/application/${application.id}`}>
              Application #{application.id} - {application.company.name} (Status: {application.status})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDashboard;
