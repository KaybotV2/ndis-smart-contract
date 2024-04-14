import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// Components
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import NdaiPage from './pages/NdiaPage';
import ServiceProvidersPage from './pages/ServiceProvidersPage';
import ParticipantsPage from './pages/ParticipantsPage';


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
