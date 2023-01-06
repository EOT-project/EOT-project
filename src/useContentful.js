import { createClient } from "contentful";
// import * as contentful from 'contentful';

const useContentful = () => {
  const client = createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    host: "cdn.contentful.com"
  });

  // const cleanData = (rawData) => {
  //   rawData.map((data) => {
  //     const { sys, fields } = data
  //     const { id } = sys
  //     const dataTitle = fields.title
  //     const dataName = fields.name
  //     const dataProfilePic = fields.profilePic.fields.file.url
  //     const dataIntro = fields.intro
  //     const updatedData = {id, dataTitle, dataName, dataProfilePic, dataIntro}
  //     return updatedData
  //   })
  // }

  // const getMembers = async () => {
  //   try {
  //     const entries = await client.getEntries({
  //     });
  //     return entries
  //   } catch (error) {
  //     console.log(`Error fetching members: ${error}`);
  //   }
  // };

  // return {getMembers};
  return {client};
};

export default useContentful;