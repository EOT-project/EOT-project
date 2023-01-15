import Articles from "../components/Articles";
import ImageGallery from "../components/ImageGallery";
import ContentOpportunity from "../components/ContentOpportunity";

const Opportunity = () => {

    //send data from here to <ImageGallery/>

    return (
        <main className="wrapper">
            <Articles />
            <section className="factsStatements">
                <h2>The Benefits of Employee Ownership</h2>
                <ImageGallery content={true}/>
                <ContentOpportunity />
                <ImageGallery content={false}/>
                <ContentOpportunity />
                <ImageGallery  content={false}/>
            </section>
        </main>
    );
} 

export default Opportunity;