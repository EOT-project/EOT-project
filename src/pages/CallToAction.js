import Articles from "../components/Articles";
import ContentBlock from "../components/ContentBlock";

const CallToAction = () => {
    return (
        <div className="wrapper">
            <Articles />
            <section className="factsStatements">
                <ContentBlock />
            </section>
        </div>
    );
} 

export default CallToAction;