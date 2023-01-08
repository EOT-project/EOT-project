import { Route, Routes } from 'react-router';
import './App.css';
import Footer from './components/Footer.js';
import Nav from './components/Nav.js';
import useContentful from './useContentful';
import Home from "./pages/Home";
import Opportunity from './pages/Opportunity';
import NewsRoom from './pages/Newsroom';


function App() {

  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/opportunity' element={<Opportunity/>}/>
        <Route path='/newsroom' element={<NewsRoom/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
