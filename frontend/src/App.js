import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Submit from './Submit';
import Results from './Results';
import Recommendation from './Recommendation';
import DriftMonitor from './DriftMonitor'; // New import

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'dashboard' && <Dashboard onPageChange={handlePageChange} />}
      {currentPage === 'submit' && <Submit onPageChange={handlePageChange} />}
      {currentPage === 'results' && <Results onPageChange={handlePageChange} />}
      {currentPage === 'recommendation' && <Recommendation onPageChange={handlePageChange} />}
      {currentPage === 'driftmonitor' && <DriftMonitor onPageChange={handlePageChange} />} {/* New route */}
    </div>
  );
}

export default App;