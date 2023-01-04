import { createClient } from "contentful";
import * as contentful from 'contentful';

const useContentful = () => {
  const client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    host: "cdn.contentful.com"
  });

  const getMembers = async () => {
    try {
      const entries = await client.getEntries({
      });
      return entries
    } catch (error) {
      console.log(`Error fetching members: ${error}`);
    }
  };

  return {getMembers};
};

export default useContentful;