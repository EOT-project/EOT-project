import ContentCallToAction from "./ContentCallToAction";
import ContentOpportunity from "./ContentOpportunity";

import { useState, useEffect } from "react";
import Client from "../useContentful";
import ErrorData from "./ErrorData";

// create a contentContainer
// retrieve context, title, page uploads from Contents content model
// show a loading contents while retrieving data
// set state to contents
// render contents

const ContentBlock = () => {
  
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
        //ToDo: show user error retrieving member list
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
    <>
      {
        loading
        ?
          "loading"
        :
          contents.length !== 0
          ?
            contents.length === 1
            ?
              contents[0].page === 'action'
              ?
                <ContentCallToAction title={contents[0].title} context={contents[0].context} />
              :
                contents[0].page === 'opportunity'
                ?
                  <ContentOpportunity title={contents[0].title} context={contents[0].context} />
                : null
            :
              contents.map((content, index) => {
                return (
                  <>
                  {
                  content.page === 'action'
                  ?
                  <ContentCallToAction title={content.title} context={content.context} id={content.id} i={index}/>
                  : 
                  content.page === 'opportunity'
                    ?
                    <ContentOpportunity title={content.title} context={content.context} id={content.id}/>
                    : null
                  }
                  </>
                )
              })
          : null
      }
    </>
  )
}

export default ContentBlock;
