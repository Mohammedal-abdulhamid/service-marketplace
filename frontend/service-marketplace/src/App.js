
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; 
import ServiceProviders from './components/ServiceProviders'; 
import ServiceUsers from './components/ServiceUsers'; 
import GetOneService from './components/GetOneService';
import Form from './components/Form'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/api/allServices' element={<Home />} />
        <Route path='/api/allServices/providers' element={<ServiceProviders/>} />
        <Route path='/api/allServices/seekers' element={<ServiceUsers />} />
        <Route path='/api/allServices/:id' element={<GetOneService />} />
        <Route path='/api/allServices/form' element={<Form />} />
      </Routes>
       
    </Router>
  );
};

export default App;
