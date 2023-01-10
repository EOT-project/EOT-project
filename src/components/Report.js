import { useState, useEffect } from "react";
import Client from "../useContentful";

//create a report container displays 3 maximum reports per line
//get data set from reports content model
//show a loading report while retrieving data
//set state to report that were downloaded
//add link to report url on button
//render report list

const Report = () => {

  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReport = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "reports"
        })
        
        if (!!res) {
          const items = res?.items.map(item => ({title: item?.fields?.title, type: item?.fields?.type, image: item?.fields?.backgroundImage?.fields?.file?.url, url: item?.fields?.url, id: item?.sys?.id})) || [];

          setReport(items);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getReport();
  }, []);
console.log(report);
  return (
    <section className="report">
      <ul className="reportList">
      {
        loading
        ?
          "loading"
        :
          report.length === 1
          ?
          <li key={report[0].id} className="reportContainer">
            <div style={{
                backgroundImage: `url(${report[0].image})`,
                backgroundSize: `cover`,
                backgroundRepeat: `no-repeat`,
                backgroundPosition: `center`
              }}>
              <h4 className="reportType">{report[0].type}</h4>
              <h3 className="reportTitle">{report[0].title}</h3>
              <a href={report[0].url} target="_blank"><button className="reportButton">CTA</button></a>
            </div>
          </li>
          :
            report.map((item) => {
              return (
                <li key={item.id} className="reportContainer">
                  <div style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: `cover`,
                    backgroundRepeat: `no-repeat`,
                    backgroundPosition: `center`,
                  }}>
                    <h4 className="reportType">{item.type}</h4>
                    <h3 className="reportTitle">{item.title}</h3>
                    <a href={item.url} target="_blank"><button className="reportButton">CTA</button></a>
                  </div>
                </li>
              )
            })
      }
      </ul>
    </section>
  )
}

export default Report;