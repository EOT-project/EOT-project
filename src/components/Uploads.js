import { useState, useEffect } from "react";
import useContentful from "../useContentful";

//create a container that is full width
//get uploads from video content model
//show a loading video while retrieving media
//set state to videos that were downloaded
//render video carousel

const Uploads = () => {
  const [videos,setVideos] = useState([]);
  const [loading, setLoading] = useState(true)
  const {client} = useContentful();
  useEffect(() => {
    
    const getVideos = async () => {
      try {
        const res = await client.getEntries({
          content_type: "uploads"
        })
        console.log(res.items)
        if(!!res){
          const items = res?.items || [];
          const itemFields = items.map(item => ({title: item?.fields?.title, video: item?.fields?.video}))
          console.log(itemFields)
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
        }
      } catch (error) {
        //todo: show user error retrieving videos
        console.log(error)
        setLoading(false)
      }
    }
    getVideos();
  }, [])
  // console.log(videos)

  return (
    <section className="uploads">
      <div className="uploadsContainer">
      {
        loading
        ? 
          "loading"
        : 
          videos.map((item) => {
            return (
              <iframe className="uploadVideo" src={`https://www.youtube.com/embed/${item.videoId}`} title={item.title}></iframe>
            )
          })
      }
      </div>
    </section>
  )
}

export default Uploads;