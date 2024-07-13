import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './Components/Login/Signup';
import Header from './Components/Header';
import Login from './Components/Login/Login';
import { UserContextProvider } from './UserContext';
import Home from './Components/Home/Home';
import AddProperty from './Components/Property/AddProperty';
import PropertySuccess from './Components/Property/PropertySuccess';
import PropertyList from './Components/Property/PropertyList';
import PropertyDetail from './Components/Property/PropertyDetails';
import MyProperties from './Components/Property/MyProperties';

function App() {
  return (
    <div className="App h-screen">
      <UserContextProvider>
      <Header/>
      <Routes>
<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/home' element={<Home/>}/>
<Route path='/' element={<Signup/>}/>
<Route path='/addProperty' element={<AddProperty/>}/>
<Route path='/propertySuccess/:id' element={<PropertySuccess/>}/>
<Route path='/allProperty' element={<PropertyList/>}/>
<Route path='/property/:id' element={<PropertyDetail/>}/>
<Route path='/myProperty' element={<MyProperties/>}/>







      </Routes>
      </UserContextProvider>
      
    </div>
  );
}

export default App;
