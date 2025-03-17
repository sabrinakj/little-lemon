import SectionBrochure from "../components/SectionBrochure";
import SectionSpecials from "../components/SectionSpecials";
import Testimonials from "../components/Testimonials";
import About from "./About";


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
      <Testimonials />
      <About isInHome={true}/>
    </>
  );
}

export default Home;
