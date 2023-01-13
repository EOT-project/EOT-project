import { useState, useEffect } from "react";
import Client from "../useContentful";
import ErrorData from "./ErrorData";

//create a news container displays name of media, title and link of the report
// get data set from media list content model
// show a loading media while retrieving data
// set state to report that were downloaded
// add link on button
// render media list

const MediaList = () => {

  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "mediaList"
        })
        
        if (!!res) {
          const items = res?.items.map(item => ({type: item?.fields?.name, title: item?.fields?.title, url: item?.fields?.url, image: item?.fields?.icon?.fields?.file?.url})) || [];

          setMedia(items);
          setLoading(false);
        }
      } catch (error) {
        //show user error retrieving member list
        console.log(`Error fetching members: ${error}`);
        setError(error);
        setLoading(false);
      }
    }
    getMedia();
  }, []);  
  
    if (error) {
    return (
      <ErrorData/>
    )
  }

  return (
    <section className="media">
      <h2 className="pageTitle">Newsroom</h2>
      <ul className="mediaList">
        {
          loading
          ?
            "loading"
          :
            media.length !== 0
            ?
              media.length === 1
              ?
              <li key={media[0].id} className="mediaContainer">
                <div style={{
                    backgroundImage: `url(${media[0].image})`,
                    backgroundSize: `contain`,
                    backgroundRepeat: `no-repeat`,
                    backgroundPosition: `center`
                  }}>
                  <h4 className="mediaType">{media[0].type}</h4>
                  <h3 className="mediaTitle">{media[0].title}</h3>
                  <a href={media[0].url} target="_blank" rel="noreferrer" className="mediaButton">READ</a>
                </div>
              </li>
              :
                media.map((item) => {
                  return (
                    <li key={item.id} className="mediaContainer">
                      <div className="mediaBg" style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: `contain`,
                        backgroundRepeat: `no-repeat`,
                        backgroundPosition: `center`
                      }}>
                        <h4 className="mediaType">{item.type}</h4>
                        <h3 className="mediaTitle">{item.title}</h3>
                        <a href={item.url} target="_blank" rel="noreferrer" className="mediaButton">READ</a>
                      </div>
                    </li>
                  )
                })
            : null
        }
      </ul>
    </section>
  )
}

export default MediaList;
