import { Route, Routes } from 'react-router';
import './App.css';
import Footer from './components/Footer.js';
import Nav from './components/Nav.js';
import useContentful from './useContentful';
import Home from "./pages/Home";
import Opportunity from './pages/Opportunity';


function App() {

  return (
    <div className='wrapper'>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/opportunity' element={<Opportunity/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
