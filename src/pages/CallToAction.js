import ArticleCallToAction from "../components/ArticleCallToAction";
import ContentCallToAction from "../components/ContentCallToAction";

const CallToAction = () => {
    
    return (
        <div className="wrapper">
            <ArticleCallToAction />
            <section className="factsStatements">
                <ContentCallToAction order={1} />
            </section>
        </div>
    );
} 

export default CallToAction;