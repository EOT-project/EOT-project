import ArticleCallToAction from "../components/ArticleCallToAction";
import ContentBlock from "../components/ContentBlock";

const CallToAction = () => {
    return (
        <div className="wrapper">
            <ArticleCallToAction />
            <section className="factsStatements">
                <ContentBlock />
            </section>
        </div>
    );
} 

export default CallToAction;