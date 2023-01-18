import { useEffect, useState } from "react";
import Logo from "./Logo";
import NavItem from "./NavItem";
import Client from "../useContentful";
import ErrorData from "./ErrorData";
import Loader from "../UI/Loader";

const Nav = () => {

  const [ menu, setMenu ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "navHeader",
          order: "fields.order"
        })
        console.log(res.items);
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
    <header>
      <nav>
        <Logo/>
        <h1 className="visually-hidden">Canadian Employee Ownership Coalition</h1>
        <ul>
          {
            loading
            ?
              <Loader/>
            :
              menu.length !== 0
              ?
                menu.length === 1
                ?
                  <NavItem id={menu[0].id} name={menu[0].name} value={menu[0].value}/>
                :
                  menu.map((item) => {
                    return (
                      <NavItem id={item.id} name={item.name} value={item.value} />
                    )
                  })
              :null
          }                   
        </ul>
      </nav>
    </header>
  )
};

export default Nav;