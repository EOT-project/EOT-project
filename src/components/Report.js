import { useState, useEffect } from "react";
import Client from "../useContentful";

const Report = () => {

  const [report, setReport] = useState([]);

  useEffect(() => {
    const getReport = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "reports"
        })
        console.log(res.items);
        if (!!res) {
          const items = res?.items.map(item => ({title: item?.fields?.title, type: item?.fields?.type, image: item?.fields?.backgroundImage?.fields?.file?.url})) || [];

          setReport(items);
        }
      } catch (error) {
        console.log(`Error fetching members: ${error}`);
      }
    }
    getReport();
  }, []);
  console.log(report);

  return (
    <section className="report">
      <p>where report goes</p>
      {
        report.map((item) => {
          return (
            <div style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: `cover`,
              backgroundRepeat: `no-repeat`,
              backgroundPosition: `center`,
              height: `100px`
            }}>
              <p>{item.type}</p>
              <p>{item.title}</p>
              <button>CTA</button>
            </div>
          )
        })
      }
    </section>
  )
}

export default Report;