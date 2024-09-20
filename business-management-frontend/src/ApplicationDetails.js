import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ApplicationDetails = () => {
  const { id } = useParams();  // Get the application ID from the URL
  const [application, setApplication] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8080/api/applications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setApplication(response.data);
    })
    .catch((err) => {
      setError('Failed to fetch application details');
      console.error(err);
    });
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!application) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Application Details</h1>
      <p>Company Name: {application.company.name}</p>
      <p>Status: {application.status}</p>
      <p>Submitted By: {application.submittedBy.username}</p>
      <p>Submitted At: {application.submittedAt}</p>
      <p>Purpose: {application.company.purpose}</p>
      <p>Location: {application.company.mainLocation}</p>
      <p>Members: {application.company.members.join(', ')}</p>

      {/* Accept or Reject buttons */}
      <button onClick={() => handleApproval(application.id, 'APPROVE')}>Accept</button>
      <button onClick={() => handleApproval(application.id, 'REJECT')}>Reject</button>
    </div>
  );
};

const handleApproval = (applicationId, action) => {
  const token = localStorage.getItem('token');
  const endpoint = action === 'APPROVE' ? `/api/applications/approve/${applicationId}` : `/api/applications/reject/${applicationId}`;

  axios.put(`http://localhost:8080${endpoint}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    alert(`Application ${action === 'APPROVE' ? 'approved' : 'rejected'} successfully`);
    // You might want to redirect to a different page after success
  })
  .catch(err => {
    console.error(`Failed to ${action.toLowerCase()} application`, err);
    alert(`Failed to ${action.toLowerCase()} application`);
  });
};

export default ApplicationDetails;
