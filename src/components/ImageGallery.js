import { useState } from "react";
import img from "../assets/banner.jpg";

const ImageGallery = () => {

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
        },
        // {
        //     id: 5,
        //     name: "", 
        //     image: img,
        //     title: null,
        //     description: null
        // },
        // {
        //     id: 6, 
        //     name: "", 
        //     image: img,
        //     title: null,
        //     description: null
        // },
        // {
        //     id: 7, 
        //     name: "", 
        //     image: img,
        //     title: null,
        //     description: null
        // },
        // {
        //     id: 8, 
        //     name: "", 
        //     image: img,
        //      title: null,
        //     description: null
        // },
    ];

    const onlyImgContent =[
        {
            id: 5,
            name: "", 
            image: img,
            title: null,
            description: null
        },
        {
            id: 6, 
            name: "", 
            image: img,
            title: null,
            description: null
        },
        {
            id: 7, 
            name: "", 
            image: img,
            title: null,
            description: null
        },
        {
            id: 8, 
            name: "", 
            image: img,
             title: null,
            description: null
        },
    ]

    const [ facts, setFacts ] = useState(dummyContent);
    const [ onlyImg, setOnlyImg ] = useState(onlyImgContent);

    return (
        <>
        <ul className="galleryContainer">
        {
             facts.map((item) => {
                    return <li key={item.id}>
                                {/* <div className="roundImgContainer"><img src={item.image} alt={item.name}/></div> */}
                                <div className="roundImgContainer"><img src={item.image} alt={item.name}/></div>
                                    <h4>{item.title}</h4>
                                <p>{item.description}</p>
                                                        
                           </li>
                })
        } 
         </ul>

        <ul className="galleryContainer">
        {
            onlyImg.map((item) => {
                return <li>
                    <div className="roundImgContainer"><img src={item.image} alt={item.name}/></div>
                </li>
            })
        }  
        </ul>  
        </>
    );
}

export default ImageGallery;