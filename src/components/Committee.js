import { useState, useEffect, useCallback } from "react";
import useContentful from "../useContentful";


const Committee = () => {
  
  const [members, setMembers] = useState([]);
  const { client } = useContentful();

  // const cleanUpData = useCallback((rawData) => {
  //   const cleanData = rawData.map((data) => {
  //     const { sys, fields } = data
  //     const { id } = sys
  //     const dataTitle = fields.title
  //     const dataName = fields.name
  //     const updatedData = {id, dataTitle, dataName}
  //     return updatedData
  //   })

  //   setMembers(cleanData)
  // }, [])
  
  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await client.getEntries({
          content_type: "steeringCommittee"
        })
        if (!!res) {
          // setMembers(res.items)
          // cleanUpData(res.items)
          const cleanUpData = (rawData) => {
            const cleanData = rawData.map((data) => {
              const { sys, fields } = data
              const { id } = sys
              const dataTitle = fields.title
              const dataName = fields.name
              const updatedData = {id, dataTitle, dataName}
              return updatedData
            })
            setMembers(cleanData)
          }
          cleanUpData(res.items)
        } else {
          setMembers([])
        }
      } catch (error) {
        console.log(`Error fetching members: ${error}`);
      }
    }
    
    getMembers();

  }, []);
//   console.log(members);
  
  // return {getMembers};
    // getMembers({content_type: "steeringCommittee"}).then((res) => console.log(res.items));

  
  return (
    <div>
      <h3>Steering Committee</h3>
      {
        members.map((member)=><p>{member.dataName}</p>)
      }
    </div>
  )
}

export default Committee;