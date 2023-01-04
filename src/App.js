import './App.css';
import { useEffect, useState } from 'react';
import useContentful from './useContentful';
import Committee from './components/Committee';

function App() {

  // const [members, setMembers] = useState([]);
  // const { getMembers } = useContentful();

  // useEffect(() => {
  //   getMembers({content_type: "steeringCommittee"}).then((res) => console.log(res.items));
  // })

  return (
    <div className="App">
      <h1>working?</h1>
      <Committee />
    </div>
  );
}

export default App;
