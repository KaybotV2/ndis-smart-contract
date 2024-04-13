import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';

// Components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import NdaiPage from './components/NdiaPage';
import ServiceProvidersPage from './components/ServiceProvidersPage';
import ParticipantsPage from './components/ParticipantsPage';


const App = () => {
  return (
    <Router>
     <Navbar />
     <main className="main-content">
       <Routes>
         <Route path="/" element={<Dashboard />} />
         <Route path='/ndia'element={<NdaiPage/>}/>
         <Route path="/participants" element={<ParticipantsPage />} />
         <Route path="/service-providers" element={<ServiceProvidersPage />} />
       </Routes>
     </main>
   </Router> 
  );
}

export default App;
