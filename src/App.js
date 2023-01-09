import { Route, Routes } from 'react-router';
import './App.css';
import Footer from './components/Footer.js';
import Nav from './components/Nav.js';
import Home from "./pages/Home";
import Opportunity from './pages/Opportunity';
import CallToAction from './pages/CallToAction';
import NewsRoom from './pages/Newsroom';


function App() {

  return (
    <>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/TheOpportunity' element={<Opportunity/>}/>
      <Route path='/CallToAction'element={<CallToAction/>}/>
      <Route path='/newsroom' element={<NewsRoom/>} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
