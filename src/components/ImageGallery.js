import { useState } from "react";
import img from "../assets/banner.jpg";

const ImageGallery = ({content}) => {

    const dummyContent = [
        {
            id: 1,
            name: "", 
            image: img, 
            title: "Creates economic resilience", 
            description: "A search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like."
        },
        {
            id: 2, 
            name: "", 
            image: img, 
            title: "Creates economic resilience", 
            description: "A search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like."
        },
        {
            id: 3, 
            name: "", 
            image: img, 
            title: "Creates economic resilience", 
            description: "A search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like."
        },
        {
            id: 4, 
            name: "", 
            image: img, 
            title: "Creates economic resilience", 
            description: "A search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like."
        }
    ];


    const [ facts ] = useState(dummyContent);

    return (
        <>
        <ul className="galleryContainer">
        {
             facts.map((item) => {
                    return <li key={item.id}>
                               
                                <div className="roundImgContainer"><img src={item.image} alt={item.name}/></div>
                                    {
                                        content && (<><h4>{item.title}</h4>
                                        <p>{item.description}</p></>)
                                    }
                                                       
                           </li>
                })
        } 
         </ul>
        </>
    );
}

export default ImageGallery;