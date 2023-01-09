import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_black.png";
import useContentful from "../useContentful";


const Footer = () => {

    const [ footer, setFooter ] = useState([]);
    const { client } = useContentful();

    useEffect(() => {
        const getFooter = async () => {
            try {
                const res = await client.getEntries({
                    content_type: "footerInfo"
                })
            } catch (error) {
                
            }
        }
    })

    return (
        <footer>
            <div>
                <Link to="/">
                    <div className="logoContainer">
                        <img src={logo} alt="logo"/>
                    </div>
                </Link>
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
            </div>
        </footer>
    );
}

export default Footer;