import { useState, useEffect } from "react";
import Client from "../useContentful";

//create a container that is full width
//get uploads from video content model
//show a loading video while retrieving media
//set state to videos that were downloaded
//render video carousel

const Uploads = () => {
  
  const [videos,setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  // const {client} = useContentful();
  const [current, setCurrent] = useState(0);
  const length = videos.length;
  
  const nxtVideo = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }
  const prevVideo = () => {
    setCurrent(current === 0 ? length - 1 : current -1)
  }

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "uploads"
        })
        // console.log(res.items)
        if(!!res){
          const items = res?.items || [];
          const itemFields = items.map(item => ({title: item?.fields?.title, video: item?.fields?.video}))
          // console.log(itemFields)
          const cleanedItems = itemFields.map( (item) => {
            const title = item.title
            const video = item.video
            let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
            const videoId = regex.exec(video)[3];
            const updatedData = {title, videoId}
            return updatedData
          })
          setVideos(cleanedItems)
          setLoading(false)

        //   if(!!res){
        //   const items = res?.items || [];
        //   const itemFields = items.map(item => ({title: item?.fields?.title, video: item?.fields?.video}))
        //   console.log(itemFields)
        //   const cleanedItems = itemFields.map(item => ({video: item?.video, title: item?.title}))
        //   setVideos(cleanedItems)
        //   setLoading(false)
        // }

        }
      } catch (error) {
        //todo: show user error retrieving videos
        console.log(error)
        setLoading(false)
      }
    }
    getVideos();
  }, [])
  console.log(videos)

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
              <iframe className="uploadVideo" src={`https://www.youtube.com/embed/${item.videoId}`} title={item.title}></iframe>
            )
          })
          :
          <>
            <button className="leftArrow" onClick={prevVideo}>ᐸ</button>
            {
            videos.map((item, index) => {
              return (
                <iframe className={index === current ? 'uploadVideo' : 'video'} src={`https://www.youtube.com/embed/${item.videoId}`} title={item.title}></iframe>
                )
              })
            }
            <button className="rightArrow" onClick={nxtVideo}>ᐳ</button>
          </>
      }
      </div>
    </section>
  )
}

export default Uploads;