import { useState, useEffect } from "react";
import Client from "../useContentful";
import ErrorData from "./ErrorData";
import LoaderReport from "../UI/LoaderReport";

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

        if (!!res) {
          const items = res?.items.map(item => ({title: item?.fields?.title, type: item?.fields?.type, image: item?.fields?.backgroundImage?.fields?.file?.url, url: item?.fields?.url, file: item?.fields?.asset?.fields?.file?.url, id: item?.sys?.id})) || [];

          setReport(items);
          setLoading(false);
        }
      } catch (error) {
        //show user error retrieving member list
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
    loading
    ?
    <LoaderReport/>
    :
    <section className="report">
      <div className="pageTitleContainer">
        <h2 className="pageTitle">Resources</h2>
      </div>
      <ul className="reportList">
        {
          report.length !== 0
          ?
            report.length === 1
            ?
            <li key={report[0].id} className="reportContainer">
              <div className="reportBg" style={{
                  backgroundImage: `url(${report[0].image})`,
                  backgroundSize: `cover`,
                  backgroundRepeat: `no-repeat`,
                  backgroundPosition: `center`
                }}>
                <h4 className="reportType">{report[0].type}</h4>
                <h3 className="reportTitle">{report[0].title}</h3>
                <a href={report[0].url?report[0].url:report[0].file} target="_blank" rel="noreferrer" className="reportButton">READ</a>
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
                    <h3 className="reportTitle">{item.title}</h3>
                    <a href={item.url?item.url:item.file} target="_blank" rel="noreferrer" className="reportButton">READ</a>
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

export default Report;