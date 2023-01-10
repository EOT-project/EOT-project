import { useEffect, useState } from "react";
import MainCard from "../UI/MainCard";
import Client from "../useContentful";

const Articles = () => {

    const [ mainCard, setMainCard ] = useState([]);

    useEffect(() => {
        const getCardContent = async () => {
            try {
                const res = await Client.getEntries({
                    content_type: "articles"
                })
                if(!!res) {
                    const cleanUpData = (rawData) => {
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
        <section className="Article">
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
        </section>
    )
}

export default Articles;