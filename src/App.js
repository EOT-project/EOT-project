import './App.css';
import { useEffect, useState } from 'react';
import useContentful from './useContentful';


function App() {

  const [members, setMembers] = useState([]);
  const { getMembers } = useContentful();

  useEffect(() => {
    getMembers().then((res) => console.log(res));
  })

  return (
    <div className="App">
      <h1>working?</h1>
    </div>
  );
}

export default App;
