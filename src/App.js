import { Route, Routes } from 'react-router';
import './App.css';
import Footer from './components/Footer.js';
import Nav from './components/Nav.js';
import Home from "./pages/Home";
import Opportunity from './pages/Opportunity';
import CallToAction from './pages/CallToAction';


function App() {

  return (
    <>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/the opportunity' element={<Opportunity/>}/>
      <Route path='/call to action'element={<CallToAction/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
