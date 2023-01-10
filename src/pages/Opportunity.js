import Articles from "../components/Articles";
import ImageGallery from "../components/ImageGallery";
import ContentBlock from "../components/ContentBlock";

const Opportunity = () => {

    //send data from here to <ImageGallery/>

    return (
        <main className="wrapper">
            <Articles />
            <section className="factsStatements">
                <ImageGallery content={true}/>
                <ContentBlock />
                <ImageGallery content={false}/>
                <ContentBlock />
                <ImageGallery  content={false}/>
            </section>
        </main>
    );
}

export default Opportunity;