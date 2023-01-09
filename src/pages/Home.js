import Articles from "../components/Articles";
import Uploads from "../components/Uploads";
import Advisory from "../components/Advisory";
import Supporters from "../components/Supporters";
import Committee from "../components/Committee";

const Home = () => {
  return (
    <main>
      <Articles />
      <Uploads />
      <section className="members">
        <Committee />
        <Advisory />
        <Supporters />
      </section>
    </main>
  )
}

export default Home;