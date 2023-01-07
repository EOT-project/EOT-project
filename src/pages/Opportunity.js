import Articles from "../components/Articles";
import ImageGallery from "../components/ImageGallery";
import ContentBlock from "../components/ContentBlock";

const Opportunity = () => {
    return (
        <div className="wrapper">
            <Articles />
            <section className="factsStatements">
                <ImageGallery/>
                <ContentBlock />
                <ImageGallery/>
                <ContentBlock />
                <ImageGallery/>
            </section>
        </div>
    );
}

export default Opportunity;