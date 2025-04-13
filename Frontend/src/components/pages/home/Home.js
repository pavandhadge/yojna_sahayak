import AboutUs from "./components/AboutUs";
import Categories from "./components/Categories";
import FAQ from "./components/FAQ";
import HeroSection from "./components/HeroSection";
import HowToApply from "./components/HowToApply";
import TotalSchemes from "./components/TotalSchemes";
import Recommendations from './components/Recommendations';
import "./home.css";
import TranslateToggle from "../../common/translate/googleTranslater";
const Home = () => {
    return (
        <div className="overflow-x-hidden bg-white">
            <div className="w-full">
                <HeroSection />
                {/* <TranslateToggle /> */}
                <TotalSchemes />
                <Categories />
                <HowToApply />
                <AboutUs />
                <FAQ />
                <Recommendations />
            </div>
        </div>
    );
};

export default Home;
