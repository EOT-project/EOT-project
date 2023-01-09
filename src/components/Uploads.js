import { useState, useEffect } from "react";
import Client from "../useContentful";
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactPlayer from 'react-player';

//create a container that is full width
//get uploads from video content model
//show a loading video while retrieving media
//set state to videos that were downloaded
//render video carousel

const Uploads = () => {
  
  const [videos,setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "uploads"
        })
        
        if(!!res){
          const items = res?.items.map(item => ({title: item?.fields?.title, video: item?.fields?.video})) || [];
          
          setVideos(items);
          setLoading(false)
        }
      } catch (error) {
        //todo: show user error retrieving videos
        console.log(error)
        setLoading(false)
      }
    }
    getVideos();
  }, [])

  return (
    <section className="uploads wrapper">
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
              <ReactPlayer width='100%' height='500px' url={item.video}/>
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
                <div className='video'>
                  <ReactPlayer width='100%' height='500px' url={item.video}/>
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