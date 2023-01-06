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
          const cleanUpData = (initData) => {
            const cleanData = initData.map((data) => {
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
  // console.log(members);
  
  return (
    <>
      {
        members.length !== 0
        ?
        <div className="committee">
          <h4>Meet our committee</h4>
          <h2>Steering Committee</h2>
          <ul className="membersListContainer">
            {
              members.map((member) => {
                return (
                  <li key={member.id} className="membersList">
                    <img src={member.dataProfilePic} alt={member.dataName} className="membersPic"/>
                    <h3 className="membersName">{member.dataName}</h3>
                    <h4 className="membersTitle">{member.dataTitle}</h4>
                    <p className="membersIntro">{member.dataIntro}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
        : null
      }
    </>
  )
}

export default Committee;