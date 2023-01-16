import { useState, useEffect } from "react";
import Client from "../useContentful";
import ErrorData from "./ErrorData";

//create a blog container displays 3 maximum blogs per line
//get data set from blogList content model
//show a loading blog while retrieving data
//set state to blog that were downloaded
//add link to blog url on button
//render blog list

const BlogList = () => {

  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "blogList",
          order: "fields.title"
        })
        
        if (!!res) {
          const items = res?.items.map(item => ({title: item?.fields?.title, name: item?.fields?.author?.fields?.name, image: item?.fields?.background?.fields?.file?.url, url: item?.fields?.url, id: item?.sys?.id})) || [];

          setBlog(items);
          setLoading(false);
        }
      } catch (error) {
        //show user error retrieving member list
        console.log(`Error fetching members: ${error}`);
        setError(error);
        setLoading(false);
      }
    }
    getBlog();
  }, []);

  if (error) {
    return (
      <ErrorData/>
    )
  }


  return (
    <section className="blog">
      <h2 className="pageTitle">Resources</h2>
      <ul className="blogList">
      {
        loading
        ?
          "loading"
        :
          blog.length !== 0
          ?
            blog.length === 1
            ?
            <li key={blog[0].id} className="blogContainer">
              <div style={{
                  backgroundImage: `url(${blog[0].image})`,
                  backgroundSize: `cover`,
                  backgroundRepeat: `no-repeat`,
                  backgroundPosition: `center`
                }}>
                <h4 className="blogName">{blog[0].name}</h4>
                <h3 className="blogTitle">{blog[0].title}</h3>
                <a href={blog[0].url} target="_blank" rel="noreferrer" className="blogButton">READ</a>
              </div>
            </li>
            :
              blog.map((item) => {
                return (
                  <li key={item.id} className="blogContainer">
                    <div className="blogBg" style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: `cover`,
                      backgroundRepeat: `no-repeat`,
                      backgroundPosition: `center`
                    }}>
                      <h4 className="blogName">{item.name}</h4>
                      <h3 className="blogTitle">{item.title}</h3>
                      <a href={`https://${item.url}`} target="_blank" rel="noreferrer" className="blogButton">READ</a>
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

export default BlogList;