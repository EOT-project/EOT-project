import { useEffect, useState } from "react";
import MainCard from "../UI/MainCard";
import useContentful from "../useContentful";

const Articles = () => {

    const [ mainCard, setMainCard ] = useState([]);
    const { client } = useContentful();

    useEffect(() => {
        const getCardContent = async () => {
            try {
                const res = await client.getEntries({
                    content_type: "articles"
                })
                if(!!res) {
                    const cleanUpData = (rawData) => {
                        console.log(rawData);
                        const cleanData = rawData.map((data) => {
                            const { sys, fields } = data
                            const { id } = sys
                            const title = fields.title
                            const content = fields.content.content[0].content[0].value
                            const image = fields.backgroundImage.fields.file.url  
                            const updatedData = { id, title, content, image }
                            return updatedData                          
                        })
                        setMainCard(cleanData)
                    }
                    cleanUpData(res.items)
                }else {
                    setMainCard([])
                }
            } catch (error) {
                console.log(`Error fetching card content: ${error}`);          
            }
        }
        getCardContent();
    },[]);

    return (
        <>
            {
                mainCard.map((item) => {
                    return <MainCard image={item.image}>
                        <h2>{item.title}</h2>
                        <div className="contentBlockContainer">
                            <p>{item.content}</p>
                        </div>

                    </MainCard>

                })
            }
            {/* <h2>The Opportunity</h2>
            <div className="contentBlockContainer">
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                <p> The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text</p>
                <p>And a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>   
                </div> */}
                  
        </>
    );
}

export default Articles;