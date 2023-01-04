import { useState, useEffect } from "react";
import useContentful from "../useContentful";


const Committee = () => {
  
  const [members, setMembers] = useState([]);
  const { client } = useContentful();

  const getMembers = async () => {
    try {
      const res = await client.getEntries({
        content_type: "steeringCommittee"
      })
      setMembers(res.items)
    } catch (error) {
      console.log(`Error fetching members: ${error}`);
    }
  }
  
  useEffect(() => {
    
    getMembers();
    
  }, []);
  console.log(members);
  
  // return {getMembers};
    // getMembers({content_type: "steeringCommittee"}).then((res) => console.log(res.items));

  
  return (
    <div>
      <h3>Steering Committee</h3>
      {
        members.map((member)=><p>{member.fields.name}</p>)
      }
    </div>
  )
}

export default Committee;