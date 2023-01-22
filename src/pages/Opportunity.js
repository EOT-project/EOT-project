import Articles from "../components/Articles";
import InfographicWithContent from "../components/InfographicWithContent";
import ContentOpportunity from "../components/ContentOpportunity";
import InfographicOnly from "../components/InfographicOnly";

const Opportunity = () => {

    return (
        <main>
            <Articles />
            <section className="factsStatements wrapper">
                <ContentOpportunity order={1}/>
                <InfographicWithContent/>
                <ContentOpportunity order={2}/>
                <InfographicOnly order={1}/>
                <ContentOpportunity order={3}/>
                <InfographicOnly  order={2}/>
            </section>
        </main>
    );
} 

export default Opportunity;
