import React from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import App from './App'
import CreateProperty from './components/CreateProperty';
import PropertyList from './components/GetProperties';
import MyProperties from './components/MyProperties';
import PropertyDetails from './components/PropertyDetails';
 

function AppRoutes() {

  return (
    <>
      <BrowserRouter>
  <Routes>
    <Route path="/" element={<App/>} />
    <Route path="/createproperty" element={<CreateProperty/>} />
    <Route path="/propertylist" element={<PropertyList/>} />
    <Route path="/myproperties" element={<MyProperties/>} />
    <Route path="/property/:id" element={<PropertyDetails />} />

  </Routes>
</BrowserRouter>
    </>
  );
}

export default AppRoutes;