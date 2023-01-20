import { useEffect, useState } from "react";
import Client from "../useContentful";
import Logo from "./Logo";
import ErrorData from "./ErrorData";
import LoaderFooter from "../UI/LoaderFooter";


const Footer = () => {

    const [ footer, setFooter ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getFooter = async () => {
            try {
                const res = await Client.getEntries({
                    content_type: "footer"
                })
                if(!!res) {
                    const cleanUpData = (rawData) => {                        
                        const cleanData = rawData.map((data) => {
                            const { sys, fields } = data
                            const { id } = sys
                            
                            const email = fields.email
                            const socialMedia = fields.socialMedia
                            const updatedData = { id, email, socialMedia }
                            return updatedData
                        })
                        setFooter(cleanData)
                    }
                    cleanUpData(res.items)
                } else {
                    setFooter([])
                }
            } catch (error) {
                console.log(`Error fetching footer: ${error}`);
                setError(error);
                setLoading(false);     
            }
        }
        getFooter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    if (error) {
        return (
          <ErrorData/>
        )
      }

    return (
       
        <footer>  
               
            {
                loading
                ?
                <LoaderFooter/>
                :
                footer.length !== 0 && footer.map((item, index) => {
                    return (
                            <div className="footerContainer" key={item.id}>
                                <Logo />
                                <div className="socialMediaContainer">
                                    <p>{item.email}</p>
                                    <ul >
                                        {
                                            item.socialMedia.map((item, index) => {
                                                //WILL ADD href WHEN PROVIDED BY CLIENT
                                                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                                return <li key={index}><a href=""><p>{item}</p></a></li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        )
                })
            }
        </footer>
    );
}

export default Footer;