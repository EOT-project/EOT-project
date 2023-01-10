import { useEffect, useState } from "react";
import Client from "../useContentful";
import Logo from "./Logo";


const Footer = () => {

    const [ footer, setFooter ] = useState([]);

    useEffect(() => {
        const getFooter = async () => {
            try {
                const res = await Client.getEntries({
                    content_type: "footer"
                })
                if(!!res) {
                    const cleanUpData = (rawData) => {
                        console.log(rawData);
                        
                        const cleanData = rawData.map((data) => {
                            const { sys, fields } = data
                            const { id } = sys
                            const address = fields.address[0];
                            const email = fields.email
                            const socialMedia = fields.socialMedia
                            const updatedData = { id, address, email, socialMedia }
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
            }
        }
        getFooter();

        console.log(footer);
    },[])

    return (
        <footer>
            <div className="footerContainer">
              
                {
                    footer.length !== 0 && footer.map((item, index) => {
                        return (<>
                                    <div>
                                        <Logo />
                                            <p>{item.address.streetName}</p>
                                            <p>{item.address.city}, {item.address.province}, {item.address.country}</p>
                                            <p>{item.address.postalCode}</p>
                                    </div>
                                    <div className="socialMediaContainer">
                                        <p key={index}>{item.email}</p>
                                        <ul>
                                            {
                                                item.socialMedia.map((item, index) => {
                                                   return <li key={index}><a href="">{item}</a></li>
                                                })
                                            }
                                        </ul>
                                    </div> 
                                </>)
                    })
                }
               
            </div>
        </footer>
    );
}

export default Footer;