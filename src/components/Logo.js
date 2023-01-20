import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Client from "../useContentful";
import ErrorData from "./ErrorData";

const Logo = () => {

    const [ logo, setLogo ] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLogo = async () => {
            try {
                const res = await Client.getEntries({
                    content_type: "logo"
                })
                
                if(!!res) {
                    const items = res?.items.map(item => ({id: item?.sys?.id, logoUrl: item?.fields?.logo?.fields?.file?.url, name: item?.fields?.companyLogo })) || [];
                    setLogo(items);
                }
            } catch (error) {
                console.log(`Error fetching logo: ${error}`);
                setError(error);
            }           
        }
        getLogo();
    },[]);    

    if (error) {
        return (
            <ErrorData/>
        )
    }

    return (
        <Link to="/">
        <div className="logoContainer loading">
            {
                logo.length !== 0 && logo?.map((logo) => {
                   return <img key={logo.id} src={logo.logoUrl} alt={logo.name}/>
                })
            }
            
        </div>
        </Link>
    );
} 

export default Logo;