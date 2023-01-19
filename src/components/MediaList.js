import { useState, useEffect } from "react";
import Client from "../useContentful";
import ErrorData from "./ErrorData";
import LoaderMediaList from "../UI/LoaderMediaList";

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
          const items = res?.items.map(item => ({type: item?.fields?.name, title: item?.fields?.title, url: item?.fields?.url, image: item?.fields?.icon?.fields?.file?.url, imageTitle: item?.fields?.icon?.fields?.title, id: item?.sys?.id})) || [];
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
    loading
    ?
    <LoaderMediaList/>
    :
    <section className="media loading">
      <div className="pageTitleContainer">
        <h2 className="pageTitle">Newsroom</h2>
      </div>
      <ul className="mediaList">
        {
          media.length !== 0
          ?
            media.length === 1
            ?
            <li key={media[0].id} className="mediaContainer">
              <div className="mediaTextContainer">
                <h4 className="mediaType">{media[0].type}</h4>
                <h3 className="mediaTitle">{media[0].title}</h3>
              </div>
              <div className="mediaLogoContainer">
                <img src={media[0].image} alt={media[0].title} className="mediaLogo"/>
              </div>
              <div className="mediaButtonContainer">
                <a href={media[0].url} target="_blank" rel="noreferrer" className="mediaButton">Read More</a>
              </div>
            </li>
            :
            media.map((item) => {
              return (
                <li key={item.id} className="mediaContainer">
                  <div className="mediaTextContainer">
                    <h4 className="mediaType">{item.type}</h4>
                    <h3 className="mediaTitle">{item.title}</h3>
                  </div>
                  <div className="mediaLogoContainer">
                    <img src={item.image} alt={item.title} className="mediaLogo"/>
                  </div>
                  <div className="mediaButtonContainer">
                    <a href={item.url} target="_blank" rel="noreferrer" className="mediaButton">Read More</a>
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
