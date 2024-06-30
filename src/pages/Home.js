import SectionBrochure from "../components/SectionBrochure";
import SectionSpecials from "../components/SectionSpecials";


function Home() {
  return (
    <>
      <SectionBrochure
        title="Little lemon"
        subTitle="Chicago"
        description="We are a family owned Mediterranean resturant, focused on traditional
        recipes served with a modern twist."
      />
      <SectionSpecials />
    </>
  );
}

export default Home;
