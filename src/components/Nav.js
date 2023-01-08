import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useContentful from "../useContentful";
import Logo from "./Logo";
import NavItem from "./NavItem";

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
                        const cleanData = rawData.map((data) => {
                            const { sys, fields } = data
                            const { id } = sys
                            const menuItems= fields.menuItems 
                            const urlName = fields.urlName                            
                            const updatedData = { id, menuItems, urlName }
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
 

    return (
        <header>
            <nav>
                <Logo/>
                <ul>
                    {
                        menu.length !== 0 && menu[0]?.menuItems?.map((item) => {
                            return <NavItem key={item} item={item}/>
                        })    

                    }                   
                </ul>
            </nav>
        </header>
    )
};

export default Nav;