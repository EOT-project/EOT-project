import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Client from "../useContentful";


const Logo = () => {

    const [ logo, setLogo ] = useState([]); 

    useEffect(() => {
        const getLogo = async () => {
            try {
                const res = await Client.getEntries({
                    content_type: "logo"
                })
                if(!!res) {
                    const cleanUpData = (rawData) => {
                        const cleanData = rawData.map((data) => {
                            const { sys, fields } = data
                            const { id } = sys
                            const name = fields.companyLogo
                            const logoUrl = fields.logo.fields.file.url
                            const updatedData = { name, id, logoUrl }
                            return updatedData
                        });
                        setLogo(cleanData);
                    }
                    cleanUpData(res.items);
                } else {
                    setLogo([]);
                }
            } catch (error) {
                console.log(`Error fetching logo: ${error}`);      
            }           
        }
        getLogo();
    },[]);    

    return (
        <Link to="/">
        <div className="logoContainer loading">
            {
                logo.length !== 0 && logo?.map((logo) => {
                   return <img key={logo} src={logo.logoUrl} alt={logo.name}/>
                })
            }
            
        </div>
    </Link>
    );
} 

export default Logo;