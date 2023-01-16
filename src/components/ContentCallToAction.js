import { useState, useEffect } from "react";
import Client from "../useContentful";
import ErrorData from "./ErrorData";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Loader from "../UI/Loader";

const ContentCallToAction = (props) => {
  
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getContents = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "contentCallToAction"
        })
        
        if (!!res) {
          const items = res?.items.map(item => ({title: item?.fields?.title, context: item?.fields?.context, id: item?.sys?.id})) || [];
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
        <Loader/>
        :
          contents.length !== 0
          ?
            contents.length >= props.order
            ?
              contents[props.order - 1].title
              ? <>
                  <h3>{contents[props.order - 1].title}</h3>
                  {documentToReactComponents(contents[props.order - 1].context)}
                </>
              : <>
                  {documentToReactComponents(contents[props.order - 1].context)}
                </>
            : null
          : null
      }
    </div>
  )
}

export default ContentCallToAction;