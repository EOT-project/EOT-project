import { useState, useEffect } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Client from "../useContentful";
import ErrorData from "./ErrorData";
import LoaderContentOpportunity from "../UI/LoaderContentOpportunity";

const ContentOpportunity = (props) => {

  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getContents = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "contentOpportunity",
          order: "fields.order"
        })
        
        if (!!res) {
          const items = res?.items.map(item => ({title: item?.fields?.title, context: item?.fields?.context, id: item?.sys?.id})) || [];
          setContents(items);
          setLoading(false);
          }
      } catch (error) {
        // show user error retrieving member list
        console.log(`Error fetching contents: ${error}`);
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
    loading
    ?
    <LoaderContentOpportunity/>
    :
      contents.length !== 0
      ?
        contents.length >= props.order
        ?
        <div className="blockContentContainer loading">
          {
          contents[props.order - 1].title
          ? <>
              <div className="pageTitleContainer opportunityTitle">
                <h2 className="pageTitle">{contents[props.order - 1].title}</h2>
              </div>
              {documentToReactComponents(contents[props.order - 1].context)}
            </>
          : <>
              {documentToReactComponents(contents[props.order - 1].context)}
            </>
          }
        </div>
        : null
      : null
  )
}

export default ContentOpportunity;