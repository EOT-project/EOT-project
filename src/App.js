// import { Route, Routes } from 'react-router';
import './App.css';
import Footer from './components/Footer.js';
import Nav from './components/Nav.js';
import { useEffect, useState } from 'react';
import useContentful from './useContentful';
// import Committee from './components/Committee';
import Home from './pages/Home';

function App() {

  // const [members, setMembers] = useState([]);
  // const { getMembers } = useContentful();

  // useEffect(() => {
  //   getMembers({content_type: "steeringCommittee"}).then((res) => console.log(res.items));
  // })

  return (
    <>
    <Nav/>
  
    {/* <Footer/> */}
    {/* <div className="App">
      <h1>working?</h1>
      </div>
      
      {/* <Footer/> */}
    <Home />
    </>

  );
}

export default App;
