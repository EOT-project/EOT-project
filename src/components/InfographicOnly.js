import { useEffect, useState } from "react";
import Loader from "../UI/Loader";
import Client from "../useContentful";
import ErrorData from "./ErrorData";

const InfographicOnly = (props) => {

    const [ infographic, setInfographic ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getInfographics =  async () => {
            try {
                const res = await Client.getEntries({
                    content_type: "infographicOnlyOpportunity",
                    order: "fields.order"
                })
                if(!!res) {
                    
                    const items = res?.items.map(item =>({id: item?.sys?.id, image: item?.fields?.image?.fields?.file?.url, order: item?.fields?.order})) || [];
                    setInfographic(items);
                    setLoading(false);
                }
            } catch (error) {
                console.log(`Error fetching infographics: ${error}`);
                setError(error);
                setLoading(false);
            }
        }
        getInfographics();
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
            infographic.length !== 0
            ?
              <ul className="galleryContainer">
                {
                  infographic.map((item) => {
                    return (
                      item.order === props.order
                      ?
                        <li key={item.id}>
                          <div className="roundImgContainer imgOnly">
                              <img src={item.image} alt={item.title}/>
                          </div>
                        </li>
                      : null
                      )
                    })
                }
              </ul>
          :
          null
        }
      </>
    );
}

export default InfographicOnly;