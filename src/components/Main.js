import React from "react";
import "./Main.css";
import SectionBrochure from "./SectionBrochure";
import SectionSpecials from "./SectionSpecials";

function Main() {
  return (
    <main>
      <SectionBrochure
        title="Little lemon"
        subTitle="Chicago"
        description="We are a family owned Mediterranean resturant, focused on traditional
        recipes served with a modern twist."
      />
      <SectionSpecials />
    </main>
  );
}

export default Main;
