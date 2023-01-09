import * as contentful from "contentful";

const Client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    host: "cdn.contentful.com"
  });
export default Client;