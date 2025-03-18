import Hero from "../components/HeroComponent/Hero";
import Popular from "../components/PopularComponent/Popular";
import Offers from "../components/OffersComponent/Offers";
import NewCollections from "../components/NewCollectionsComponent/NewCollections";
const Home = () => {
  return (
    <>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
    </>
  );
};

export default Home;
