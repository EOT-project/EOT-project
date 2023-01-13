import Advisory from "../components/Advisory";
import Supporters from "../components/Supporters";
import Committee from "../components/Committee";
import ArticleHome from "../components/ArticleHome";

const Home = () => {
  return (
    <main className="wrapper">
      <ArticleHome />
      <section className="members">
        <Committee />
        <Advisory />
        <Supporters />
      </section>
    </main>
  )
}

export default Home;