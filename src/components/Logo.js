import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useContentful from "../useContentful";


const Logo = () => {

    const [ logo, setLogo ] = useState([]); 
    const { client } = useContentful();

    useEffect(() => {
        const getLogo = async () => {
            try {
                const res = await client.getEntries({
                    content_type: "logo"
                })
                console.log(res.items);

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
                        console.log(cleanData);
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

    console.log(logo);
    

    return (
        <Link to="/">
        <div className="logoContainer">
            {
                logo.length !== 0 && logo?.map((logo) => {
                   return <img src={logo.logoUrl} alt={logo.name}/>
                })
            }
            
        </div>
    </Link>
    );
} 

export default Logo;