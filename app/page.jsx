import Navbar from "./components/homepage/navbar";
import Header from "./components/homepage/header";
import Mainswiper from "./components/homepage/mainswiper";
import ServicesSliderSection from "./components/homepage/servicesslider";
import FooterSection from "./components/homepage/footer";
import { Image } from 'antd';
import Brands from "./components/homepage/brands";
import OurProjects from "./components/homepage/projects";

export default function Home() {
  return (
    <div>
      <Header />
      <hr />
      <Navbar />

      <Mainswiper />

      <ServicesSliderSection />

      <div className="w-full">
        <Image
          className="w-full"
          src="/homepage/designDAGNGSGiLwIg3-wvYemc2BIlYukhRPMRgedit.png"
        />
      </div>

      <Brands />

      <OurProjects />

      <FooterSection />
    </div>
  );
}
