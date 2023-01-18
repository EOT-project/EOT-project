import Articles from "../components/Articles";
import ContentOpportunity from "../components/ContentOpportunity";
import InfographicWithContent from "../components/InfographicWithContent";
import InfographicOnly from "../components/InfographicOnly";

const Opportunity = () => {

    return (
        <main className="wrapper">
            <Articles />
            <section className="factsStatements">
                <div className="pageTitleContainer">
                    <h2 className="pageTitle">The Benefits of Employee Ownership</h2>
                </div>
                <InfographicWithContent/>
                <ContentOpportunity order={1}/>
                <InfographicOnly order={1}/>
                <ContentOpportunity order={2}/>
                <InfographicOnly  order={2}/>
            </section>
        </main>
    );
} 

export default Opportunity;
