import { useEffect, useState } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Client from "../useContentful";
import MainCard from "../UI/MainCard";
import ErrorData from "./ErrorData";
import LoaderMainCard from "../UI/LoaderMainCard";

const ArticleCallToAction = () => {

    const [ mainCard, setMainCard ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCardContent = async () => {
            try {
                const res = await Client.getEntries({
                    content_type: "articleCallToAction"
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
        loading
        ?
        <LoaderMainCard/>
        :
        mainCard.length !== 0
        ?
        <section className="article wrapper loading">
            {
            mainCard.length === 1
            ?
            <MainCard key={mainCard[0]} image={mainCard[0].image}>
                <h2>{mainCard[0].title}</h2>
                <div className="contentBlockContainer">
                    {documentToReactComponents(mainCard[0].content)}
                </div>
            </MainCard>
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
        : null
    );
}

export default ArticleCallToAction;