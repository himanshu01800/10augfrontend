
import './App.css';


import { BrowserRouter as Router,Routes,Route, } from 'react-router-dom';
import Login from './Login';
import Singup from './Singup';
import { Home } from './Home';
import Crud from './Crud';

function App() {
 return (
  <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/> 
      <Route path='/singup' element={<Singup/>}/> 
      <Route path='/crud' element={<Crud/>}/> 
      
    </Routes>
  </Router>
      
    );
  }

export default App;
