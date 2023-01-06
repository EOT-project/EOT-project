import MainCard from "../UI/MainCard";

//Articles component takes content object
//content object contains properties title, context, backgroundImage
//Articles component renders MainCard component displaying title, context, and backgroundImage
const Articles = (content) => {
    return (
        <MainCard>
            {!!content && (
                <>
                <h2>{content?.title || "The Opportunity"}</h2>
                <div className="contentBlockContainer">
                    <p>{content?.context || "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."}</p>
                </div>
                </>
            )}
            
        </MainCard>
    );
}

export default Articles;