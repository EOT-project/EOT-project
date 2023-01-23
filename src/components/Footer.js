import { useEffect, useState } from "react";
import Client from "../useContentful";
import Logo from "./Logo";
import ErrorData from "./ErrorData";
import LoaderFooter from "../UI/LoaderFooter";

const Footer = () => {

    const [contact, setContact] = useState([]);
    const [socialMedia, setSocialMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getContact = async () => {
            try {
                const res = await Client.getEntries({
                    content_type: "contact"
                })

                if(!!res) {
                    const items = res?.items.map(item => ({type: item?.fields?.type, url: item?.fields?.url, id: item?.sys?.id})) || [];
                    setContact(items);
                    setLoading(false);
                }
            } catch (error) {
                console.log(`Error fetching footer: ${error}`);
                setError(error);
                setLoading(false);     
            }
        }
        getContact();

        const getSocialMedia = async () => {
            try {
                const res = await Client.getEntries({
                    content_type: "socialMedia"
                })

                if(!!res) {
                    const items = res?.items.map(item => ({type: item?.fields?.type, url: item?.fields?.url, id: item?.sys?.id})) || [];
                    setSocialMedia(items);
                    setLoading(false);
                }
            } catch (error) {
                console.log(`Error fetching footer: ${error}`);
                setError(error);
                setLoading(false);     
            }
        }
        getSocialMedia();

    },[]);

    if (error) {
        return (
            <ErrorData/>
        )
    }

    return (
        <footer>  
            {
                loading
                ?
                <LoaderFooter/>
                :
                <>
                <div className="footerContainer">
                <Logo />
                    <div className="socialMediaContainer">
                        {
                        contact.map((contact) => {
                            return (
                                <p key={contact.id}>{contact.url}</p>
                            )
                        })
                        }
                        <ul>
                        {
                        socialMedia.map((media) => {
                            return (
                                    <li key={media.id}><a href={media.url} target="_blank" rel="noreferrer"><p>{media.type}</p></a></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                </>
            }
        </footer>
    );
}

export default Footer;