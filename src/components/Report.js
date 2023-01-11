import { useState, useEffect } from "react";
import Client from "../useContentful";
import ErrorData from "./ErrorData";

//create a report container displays 3 maximum reports per line
//get data set from reports content model
//show a loading report while retrieving data
//set state to report that were downloaded
//add link to report url on button
//render report list

const Report = () => {

  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReport = async () => {
      try {
        const res = await Client.getEntries({
          content_type: "reports"
        })
        console.log(res.items);
        if (!!res) {
          const items = res?.items.map(item => ({title: item?.fields?.title, type: item?.fields?.type, image: item?.fields?.asset?.fields?.file?.url, url: item?.fields?.url, id: item?.sys?.id})) || [];

          setReport(items);
          setLoading(false);
        }
      } catch (error) {
        //ToDo: show user error retrieving member list
        console.log(`Error fetching members: ${error}`);
        setError(error);
        setLoading(false);
      }
    }
    getReport();
  }, []);

  if (error) {
    return (
      <ErrorData/>
    )
  }

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
              <h2 className="reportTitle">{report[0].title}</h2>
              <a href={report[0].url} target="_blank" rel="noreferrer"><button className="reportButton">CTA</button></a>
            </div>
          </li>
          :
            report.map((item) => {
              return (
                <li key={item.id} className="reportContainer">
                  <div className="reportBg" style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: `cover`,
                    backgroundRepeat: `no-repeat`,
                    backgroundPosition: `center`
                  }}>
                    <h4 className="reportType">{item.type}</h4>
                    <h2 className="reportTitle">{item.title}</h2>
                    <button className="reportButton"><a href={item.url} target="_blank" rel="noreferrer"><p>READ</p></a></button>
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