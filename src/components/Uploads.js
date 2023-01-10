import { useState, useEffect } from "react";
import Client from "../useContentful";
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactPlayer from 'react-player';
import ErrorData from "./ErrorData";

//create a container that is full width
//get uploads from video content model
//show a loading video while retrieving media
//set state to videos that were downloaded
//render video carousel

const Uploads = () => {
  
  const [videos,setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "uploads"
        })
        
        if(!!res){
          const items = res?.items.map(item => ({title: item?.fields?.title, video: item?.fields?.video, id: item?.sys?.id})) || [];
          
          setVideos(items);
          setLoading(false)
        }
      } catch (error) {
        //todo: show user error retrieving videos
        console.log(`Error fetching members: ${error}`);
        setError(error);
        setLoading(false)
      }
    }
    getVideos();
  }, [])

    if (error) {
    return (
      <ErrorData/>
    )
  }

  return (
    <section className="uploads">
      <div className="uploadsContainer">
      {
        loading
        ? 
          "loading"
        : 
          videos.length === 1
          ?
          videos.map((item) => {
            return (
              <ReactPlayer width='100%' height='90vh' url={item.video}/>
            )
          })
          :
          <Carousel infiniteLoop
          centerMode='true'
          centerSlidePercentage	='100'
          renderArrowPrev={(clickHandler, hasPrev, label) => hasPrev && (
            <button className="prevArrow" onClick={clickHandler}>ᐸ</button>
          )}
          renderArrowNext={(clickHandler, hasNext, label) => hasNext && (
            <button className="nextArrow" onClick={clickHandler}>ᐳ</button>
          )}
          renderThumbs={() => null}
          >
            {
              videos.map((item)=> {
                return(
                <div className='video' key={item.id}>
                  <ReactPlayer width='100%' height='80vh' url={item.video}/>
                </div>
              )
            })
            }
          </Carousel>
      }
      </div>
    </section>
  )
}

export default Uploads;