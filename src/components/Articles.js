import { useEffect, useState } from "react";
import MainCard from "../UI/MainCard";
import Client from "../useContentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ErrorData from "./ErrorData";

//create a article(aka main card) component
// retrieve backgroundImage, title, and content from articles content model
// show a loading card while retrieving data
// set state to mainCard that were downloaded
// render mainCard

const Articles = () => {

    const [ mainCard, setMainCard ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCardContent = async () => {
            try {
                const res = await Client.getEntries({
                    content_type: "articles"
                })
                
                if(!!res) {
                    const items = res?.items.map(item => ({id: item?.sys?.id, title: item?.fields?.title, image: item?.fields?.backgroundImage?.fields?.file?.url, content: item?.fields?.content})) || [];
                    setMainCard(items);
                    setLoading(false);
                }
            } catch (error) {
                console.log(`Error fetching card content: ${error}`);
                setError(error);
                setLoading(false);
            }
        }
        getCardContent();
    },[]);

    if (error) {
    return (
        <ErrorData/>
    )
    }

    return (
        <section className="article">
            {
                loading
                ?
                "loading"
                :
                mainCard.map((item) => {
                    return <MainCard key={item} image={item.image}>
                        <h2>{item.title}</h2>
                        <div className="contentBlockContainer">
                            {documentToReactComponents(item.content)}
                        </div>
                    </MainCard>

                })
            }                
        </section>
    )
}

export default Articles;