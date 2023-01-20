import { useEffect, useState } from "react";
import Client from "../useContentful";
import ErrorData from "./ErrorData";
import LoaderInfographic from "../UI/LoaderInfographic";

const InfographicOnly = (props) => {

    const [ infographic, setInfographic ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getInfographics =  async () => {
            try {
                const res = await Client.getEntries({
                    content_type: "infographicOnlyOpportunity",
                    order: "fields.subOrder"
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
      loading
      ?
        <LoaderInfographic/>
      :
        infographic.length !== 0
        ?
        <ul className="galleryContainer loading">
          {
            infographic.length === 1
            ?
              infographic[0].order === props.order
              ?
                <li className="imgOnly" key={infographic[0].id}>
                  <div className="roundImgContainer ">
                      <img src={infographic[0].image} alt={infographic[0].title}/>
                  </div>
                </li>
              : null
            :
              infographic.map((item) => {
                return (
                  item.order === props.order
                  ?
                    <li className="imgOnly" key={item.id}>
                      <div className="roundImgContainer ">
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
    );
}

export default InfographicOnly;