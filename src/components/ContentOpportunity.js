import { useState, useEffect } from "react";
import Client from "../useContentful";
import ErrorData from "./ErrorData";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const ContentOpportunity = () => {
  
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getContents = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "contents"
        })
        console.log(res.items);
        if (!!res) {
          const items = res?.items.map(item => ({page: item?.fields?.page, title: item?.fields?.title, context: item?.fields?.context, id: item?.sys?.id})) || [];
          setContents(items);
          setLoading(false);
          }
      } catch (error) {
        // show user error retrieving member list
        console.log(`Error fetching members: ${error}`);
        setError(error);
        setLoading(false);
      }
    }
    getContents();
  }, []);

  if (error) {
    return (
      <ErrorData/>
    )
  }

  return (
    <div className="blockContentContainer">
      {
        loading
        ?
          "loading"
        :
          contents.length !== 0
          ?
            contents.length === 1
            ?
              contents[0].page === 'opportunity'
              ?
                contents[0].title
                  ? <>
                      <h3>{contents[0].title}</h3>
                      {documentToReactComponents(contents[0].context)}
                    </>
                  : <>
                      {documentToReactComponents(contents[0].context)}
                    </>
              : null 
            :
              contents.map((content, index) => {
                return (
                  <>
                  {
                  content.page === 'opportunity'
                  ?
                    content.title
                    ? <>
                        <h3>{content.title}</h3>
                        {documentToReactComponents(content.context)}
                      </>
                    : <>
                        {documentToReactComponents(content.context)}
                      </>
                  : null
                  }
                  </>
                )
              })
          : null
      }
    </div>
  )
}

export default ContentOpportunity;