import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_black.png"
import useContentful from "../useContentful";

const Nav = () => {

    const [ menu, setMenu ] = useState([]); 
    const { client } = useContentful();

    useEffect(() => {
        const getMenu = async () => {
            try {
                const res = await client.getEntries({
                    content_type: "navHeader"
                })
                if(!!res) {
                    const cleanUpData = (rawData) => {
                        console.log(rawData);
                        
                        const cleanData = rawData.map((data) => {
                            const { sys, fields } = data
                            const { id } = sys
                            const menuItems= fields.menuItems 
                            // const logo = fields.logo.fields.file.url
                            const updatedData = { id, menuItems }
                            return updatedData                            
                        });
                        setMenu(cleanData)
                    }
                    cleanUpData(res.items);
                } else {
                    setMenu([])
                }
                
            } catch (error) {
                console.log(`Error fetching menu: ${error}`);         
            }

        }
        getMenu();
    },[]);

    console.log(menu);
    

    return (
        <header>
            <nav>
                <ul>
            {
                menu.map((item) => {
                    return <li>{item.menuItems}</li>
                })
            }
                </ul>
            </nav>
            
            {/* <nav>
                <Link to="/">
                    <div className="logoContainer">
                        <img src={logo} alt="logo"/>
                    </div>
                </Link>
                <ul>   
                    <Link to="/the-opportunity"><li>The opportunity</li></Link>
                    <Link to="/call-to-action"><li>Call To Action</li></Link>
                    <Link to="/newsroom"><li>Newsroom</li></Link>
                </ul>
            </nav> */}
        </header>
    )
};

export default Nav;