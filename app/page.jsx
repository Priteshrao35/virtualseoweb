import Navbar from "./components/homepage/navbar";
import Header from "./components/homepage/header";
import Mainswiper from "./components/homepage/mainswiper";
import ServicesSliderSection from "./components/homepage/servicesslider";
import FooterSection from "./components/homepage/footer";
import { Image } from "antd";
import Brands from "./components/homepage/brands";
import Our_Projects from "./components/homepage/projects";
import InfoSection from "./components/homepage/info";
import AboutSection from "./components/homepage/about";
import LatestBlog from "./components/homepage/latestblogs";

export default function Home() {
  return (
    <div>
      <Header />
      <hr />
      <Navbar />

      <Mainswiper />

      <ServicesSliderSection />

      <div className="w-full bg-white">
        <Image
          className="w-full"
          preview={false}
          src="/homepage/designDAGNGSGiLwIg3-wvYemc2BIlYukhRPMRgedit(1).png"
        />
      </div>

      <Brands />

      <Our_Projects />

      <InfoSection />

      <LatestBlog />

      <AboutSection />

      <FooterSection />
    </div>
  );
}
