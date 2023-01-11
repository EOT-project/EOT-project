import { useEffect, useState } from "react";
import Logo from "./Logo";
import NavItem from "./NavItem";
import Client from "../useContentful";

const Nav = () => {

    const [ menu, setMenu ] = useState([]); 

    useEffect(() => {
        const getMenu = async () => {
            try {
                const res = await Client.getEntries({
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