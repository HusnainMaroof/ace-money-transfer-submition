import HeroSection from "./components/HeroSection";
import Navigation from "./components/NavBar";
import Scroll from "./components/Scroll";

const page = () => {
  return (
    <div className="w-full bg-canvas">
      <Navigation />
      <HeroSection />
      <Scroll />
    </div>
  );
};

export default page;
