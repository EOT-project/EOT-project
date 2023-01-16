import { useState, useEffect } from "react";
import Loader from "../UI/Loader";
import Client from "../useContentful";
import ErrorData from "./ErrorData";

//create a member container displays maximum of 4 members
//retrieve profilePic, name, title, intro uploads from supporters content model
//show a loading member while retrieving data
//set state to members that were downloaded
//render members list

const Supporters = () => {
  
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "supporters"
        })

        if (!!res) {
          const items = res?.items.map(item => ({profilePic: item?.fields?.profilePic?.fields?.file?.url, name: item?.fields?.name, title: item?.fields?.title, id: item?.sys?.id})) || [];
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
        <Loader/>
        :
          members.length !== 0
          ?
          <div className="supporters">
            <h4 className="memberSection">Meet our supporters</h4>
            <h2 className="memberType">Supporters</h2>
            <ul className="membersListContainer">
              {
                members.length === 1
                ?
                <li key={members[0].id} className="membersList" >
                  <div className='picContainer'>
                    {
                      !members[0].profilePic
                      ?
                      <img src={`https://eu.ui-avatars.com/api/?name=${members[0].name}&size=350`
                      } alt={members[0].name} className="membersPic"/>
                      :
                      <img src={members[0].profilePic} alt={members[0].name} className="membersPic"/>
                    }
                  </div>
                  <div className="membersName"><h3>{members[0].name}</h3></div>
                  <div className="membersTitle"><h4>{members[0].title}</h4></div>
                </li>
                :
                members.map((member) => {
                  return (
                    <li key={member.id} className="membersList" >
                      <div className='picContainer'>
                        {
                          !member.profilePic
                          ?
                          <img src={`https://eu.ui-avatars.com/api/?name=${member.name}&size=350`
                          } alt={member.name} className="membersPic"/>
                          :
                          <img src={member.profilePic} alt={member.name} className="membersPic"/>
                        }
                      </div>
                      <div className="membersName"><h3>{member.name}</h3></div>
                      <div className="membersTitle"><h4>{member.title}</h4></div>
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

export default Supporters;