import { Route, Routes } from 'react-router';
import Nav from './components/Home/Nav.js';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Nav />}/>
    </Routes>
  );
}

export default App;
