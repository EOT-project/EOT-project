import { useState, useEffect } from "react";
import Client from "../useContentful";
import ErrorData from "./ErrorData";

//create a member container displays maximum of 4 members
//retrieve profilePic, name, title, intro uploads from steeringCommittee content model
//show a loading member while retrieving data
//set state to members that were downloaded
//render members list

const Committee = () => {
  
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "steeringCommitte"
        })

        if (!!res) {
          const items = res?.items.map(item => ({profilePic: item?.fields?.profilePic?.fields?.file?.url, name: item?.fields?.name, title: item?.fields?.title, intro: item?.fields?.intro, id: item?.sys?.id})) || [];
          setMembers(items);
          setLoading(false);
          }
      } catch (error) {
        //ToDo: show user error retrieving member list
        console.log(`Error fetching members: ${error}`);
        setError(error);
        setLoading(false);
      }
    }
    getMembers();
  }, []);

  if (error) {
    return (
      <ErrorData/>
    )
  }

  return (
    <>
      {
        loading
        ?
          "loading"
        :
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
                      <img src={member.profilePic} alt={member.name} className="membersPic"/>
                      <h3 className="membersName">{member.name}</h3>
                      <h4 className="membersTitle">{member.title}</h4>
                      <p className="membersIntro">{member.intro}</p>
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