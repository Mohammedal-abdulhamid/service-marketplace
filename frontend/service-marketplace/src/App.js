
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
        <Route path='/' element={<Home />} />
        <Route path='/providers' element={<ServiceProviders/>} />
        <Route path='/seekers' element={<ServiceUsers />} />
        <Route path='/:id' element={<GetOneService />} />
        <Route path='/form' element={<Form />} />
      </Routes>
       
    </Router>
  );
};

export default App;
