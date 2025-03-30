import Hero from "../components/HeroComponent/Hero";
import Popular from "../components/PopularComponent/Popular";
import Offers from "../components/OffersComponent/Offers";
import NewCollections from "../components/NewCollectionsComponent/NewCollections";
import NewsLetter from "../components/NewsLetterComponent/newsLetter";
import { Helmet } from "react-helmet-async";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>JYStore</title>
      </Helmet>
      <>
        <Hero />
        <Popular />
        <Offers />
        <NewCollections />
        <NewsLetter />
      </>
    </>
  );
};

export default Home;
