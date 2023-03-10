import { Route, Routes } from 'react-router';
import Nav from './components/Nav.js';
import Footer from './components/Footer.js';
import Home from "./pages/Home";
import Opportunity from './pages/Opportunity';
import CallToAction from './pages/CallToAction';
import NewsRoom from './pages/Newsroom';
import Resources from './pages/Resources';
import ErrorPage from './pages/ErrorPage';

function App() {

  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/opportunity' element={<Opportunity/>}/>
        <Route path='/action'element={<CallToAction/>}/>
        <Route path='/newsroom' element={<NewsRoom/>} />
        <Route path='/resources' element={<Resources/>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
