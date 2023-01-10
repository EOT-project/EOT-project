import { useState, useEffect } from "react";
import Client from "../useContentful";

const MediaList = () => {

  const [media, setMedia] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "mediaList"
        })
        console.log(res.items);
        if (!!res) {
          const items = res?.items.map(item => ({url: item?.fields?.url, logo: item?.fields?.icon?.fields?.file?.url})) || [];
          // const items = res?.items || [];
          // const itemsFields = items.map(item => ({url: item?.fields?.url}));
          // console.log(itemsFields);
          // const cleanData = itemsFields.map(item => ({url: item?.url}))
          // setMedia(cleanData);
          setMedia(items);
        }
      } catch (error) {
        console.log(`Error fetching members: ${error}`);
      }
    }
    getMedia();
  }, []);
  console.log(media);
  
  

  return (
    <section className="mediaList">
      <h2>Newsroom</h2>
      <ul className="mediaListContainer">
        {
          media.map((item, index) => {
            return (
              <li key={index}>
              <a href={item.url} target="blank"><img src={item.logo} alt=""/></a>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}

export default MediaList;
