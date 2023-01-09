import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import useContentful from "../useContentful";
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
                        console.log(rawData);
                        
                        const cleanData = rawData.map((data) => {
                            const { sys, fields } = data
                            const { id } = sys
                            const menuItems= fields.menuItems 
                            const updatedData = { id, menuItems }
                            return updatedData                            
                        });
                        setMenu(cleanData)
                        console.log(cleanData);
                        
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