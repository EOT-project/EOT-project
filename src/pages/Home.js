import ArticleHome from "../components/ArticleHome";
import Committee from "../components/Committee";
import Advisory from "../components/Advisory";
import Supporters from "../components/Supporters";

const Home = () => {
  return (
    <main>
      <ArticleHome />
      <section className="members wrapper">
        <Committee />
        <Advisory />
        <Supporters />
      </section>
    </main>
  )
}

export default Home;