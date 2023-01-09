import { useState, useEffect } from "react";
import { client } from "../useContentful";

const MediaList = () => {

  const [media, setMedia] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const res = await client.getEntries({
          content_type: "mediaList"
        })
        console.log(res.items);
        if (!!res) {
          const items = res?.items.map(item => ({url: item?.fields?.url})) || [];
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
      {
        media.map((item) => {
          return (
            <p>{item.url}</p>
          )
        })
      }
    </section>
  )
}

export default MediaList;