import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import ApplicantDashboard from './ApplicantDashboard';
import ApplicationDetails from './ApplicationDetails';  // Correct import for viewing application details
import EmployeeDashboard from './EmployeeDashboard';
import NewApplication from './NewApplication';
import CompanyProfile from './CompanyProfile';
import ApplicationStatus from './ApplicationStatus';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/applicant-dashboard" element={<ApplicantDashboard />} />
        <Route path="/new-application" element={<NewApplication />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/application-status" element={<ApplicationStatus />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />  {/* Employee dashboard */}
        <Route path="/application/:id" element={<ApplicationDetails />} />  {/* Correct component for viewing a specific application */}
        <Route path="/" element={<LoginPage />} />  {/* Default to login page */}
      </Routes>
    </Router>
  );
};

export default App;

