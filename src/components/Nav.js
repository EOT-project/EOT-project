import { useEffect, useState } from "react";
import Logo from "./Logo";
import NavItem from "./NavItem";
import Client from "../useContentful";
import ErrorData from "./ErrorData";
import LoaderNav from "../UI/LoaderNav"
import NavMobile from "./NavMobile";
import { FiMenu } from "react-icons/fi"
import { IoClose } from "react-icons/io5";


const Nav = () => {

  const [ menu, setMenu ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ isClicked, setIsClicked ] = useState(false);


  useEffect(() => {
    const getMenu = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "navHeader",
          order: "fields.order"
        })
        
        if(!!res) {
          const items = res?.items.map(item => ({name: item?.fields?.name, value: item?.fields?.value, id: item?.sys?.id})) || [];
          setMenu(items);
          setLoading(false);
        }
      } catch (error) {
        console.log(`Error fetching menu: ${error}`);
        setError(error);
        setLoading(false);
      }
    }
    getMenu();
  },[]);

  if (error) {
    return (
      <ErrorData/>
    )
  }

  return (
            loading
            ?
              <LoaderNav/>
            :
            <header>
              <nav>
                <Logo/>
                <h1 className="visually-hidden">Canadian Employee Ownership Coalition</h1>
                <ul className="desktopMenu">
                    
                  
                  { menu.length !== 0
                    ?
                      menu.length === 1
                      ?
                        <NavItem key={menu[0].id} name={menu[0].name} value={menu[0].value}/>
                      :
                        menu.map((item) => {
                          return (
                            <NavItem key={item.id} name={item.name} value={item.value} isClicked={isClicked} setIsClicked={setIsClicked}/>
                          )
                        })
                    :null
                  }               
                  </ul>
                <div className={`menuMobile ${isClicked ? 'showMenu' : ''}`}>
                <IoClose onClick={() => setIsClicked(false)} className="closeMenuIcon"/>
                  <ul className={`menuMobileItems ${isClicked ? 'showMenuItems' : ''}`}>
                    
                  { menu.length !== 0
                    ?
                      menu.length === 1
                      ?
                        <NavItem key={menu[0].id} name={menu[0].name} value={menu[0].value}/>
                      :
                        menu.map((item) => {
                          return (
                            <NavItem key={item.id} name={item.name} value={item.value} isClicked={isClicked} setIsClicked={setIsClicked}/>
                          )
                        })
                    :null
                  }               
                  </ul>
            </div>
            <button className="burgerMenu" onClick={() => setIsClicked(!isClicked)}> <FiMenu className="burgerIcon"/></button>  
            <NavMobile className="" isClicked={isClicked} setIsClicked={setIsClicked}/>  
      </nav>
    </header>
  )
};

export default Nav;