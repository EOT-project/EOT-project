import { useState, useEffect } from "react";
import useContentful from "../useContentful";

const Committee = () => {
  
  const [members, setMembers] = useState([]);
  const { client } = useContentful();

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await client.getEntries({
          content_type: "steeringCommittee"
        })
        if (!!res) {
          // setMembers(res.items)
          const cleanUpData = (rawData) => {
            const cleanData = rawData.map((data) => {
              const { sys, fields } = data
              const { id } = sys
              const dataTitle = fields.title
              const dataName = fields.name
              const dataProfilePic = fields.profilePic.fields.file.url
              const dataIntro = fields.intro
              const updatedData = {id, dataTitle, dataName, dataProfilePic, dataIntro}
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
  console.log(members);
  
  return (
    <div>
      {
        members.length !== 0
        ?
        <>
          <h3>Steering Committee</h3>
          {
            members.map((member) => 
              <div>
                <p>{member.dataName}</p>
                <img style={{width: 100, height: 100}} src={member.dataProfilePic} alt="" />
                <p>{member.dataIntro}</p>
              </div>
              )
          }
        </>
        : null
      }
    </div>
  )
}

export default Committee;