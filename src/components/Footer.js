import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_black.png";
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
                            const address = fields.address
                            const streetName = fields.streetName
                            const provinceAndCountry = fields.provinceAndCountry
                            const postalCode = fields.postalCode
                            const email = fields.email
                            const socialMedia = fields.socialMedia
                            const updatedData = { id, streetName, provinceAndCountry, postalCode, email, socialMedia }
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
    },[])

    return (
        <footer>
            <div className="footerContainer">
              
                {
                    footer.length !== 0 && footer.map((item) => {
                        return (<>
                                    <div>
                                        <Logo />
                                        <p key={item.id}>{item.streetName}</p>
                                        <p key={item.id}>{item.provinceAndCountry}</p>
                                        <p key={item.id}>{item.postalCode}</p>
                                    </div>
                                    <div className="socialMediaContainer">
                                        <p key={item.id}>{item.email}</p>
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


            {/* <div>
                <Logo />
                <p>Employee Ownership</p>
                <p>Ottawa, ON, Canada</p>
                <p>O1A 1W1</p>
            </div>
            <div className="socialMediaContainer">
                <p>info@employee-ownership.ca</p>
                <ul>
                    <li><a href="">twitter</a></li>
                    <li><a href="">facebook</a></li>
                    <li><a href="">linkedin</a></li>
                    <li><a href="">youtube</a></li>
                    <li><a href="">pinterest</a></li>
                </ul>
            </div> */}
        </footer>
    );
}

export default Footer;