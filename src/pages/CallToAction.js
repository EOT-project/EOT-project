import ArticleCallToAction from "../components/ArticleCallToAction";
import ContentCallToAction from "../components/ContentCallToAction";

const CallToAction = () => {
    return (
        <main>
            <ArticleCallToAction />
            <section className="factsStatements wrapper">
                <ContentCallToAction order={1} />
            </section>
        </main>
    );
} 

export default CallToAction;