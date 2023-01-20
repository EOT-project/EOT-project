import { useEffect, useState } from "react";
import LoaderInfWithContent from "../UI/LoaderInfWithContent";
import Client from "../useContentful";
import ErrorData from "./ErrorData";

const InfographicWithContent = () => {

    const [ infoAndContent, setInfoAndContent ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getInfoAndContent = async () => {
            try {
                const res = await Client.getEntries({
                    content_type: "infographicAndContentOpp",
                    order: "fields.order"
                })
                if(!!res) {
                    const items = res?.items.map(item => ({id: item?.sys?.id, content: item?.fields?.content, image: item?.fields?.image?.fields?.file?.url, title: item?.fields?.title})) || [];
                    setInfoAndContent(items);
                    setLoading(false);
                }

            } catch (error) {
                console.log(`Error fetching infographics: ${error}`);
                setError(error);
                setLoading(false);
            }
            
        }
        getInfoAndContent();
        
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
                <LoaderInfWithContent/>
                :
                <>
                <div className="pageTitleContainer opportunityTitle">
                    <h2 className="pageTitle loading">The Benefits of Employee Ownership</h2>
                </div>
                    <ul className="galleryContainer">
                        {
                            infoAndContent.map((item) => {
                                return <li key={item.id}>
                                            <div className="roundImgContainer">
                                                <img className="loading" src={item.image} alt={item.title}/>
                                            </div>
                                            <div className="infographicTitle">
                                                <h4>{item.title}</h4>
                                            </div>
                                            <div className="infographicContent">
                                                <p>{item.content}</p>
                                            </div>
                                        </li>
                            })
                        }

                    </ul>
                </>
            }
        </>
    );
}

export default InfographicWithContent;