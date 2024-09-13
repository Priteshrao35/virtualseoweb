import Navbar from "./homepage/navbar";
import Header from "./homepage/header";
import Mainswiper from "./homepage/mainswiper";
import ServicesSliderSection from "./homepage/servicesslider";
import FooterSection from "./homepage/footer";
import Brands from "./homepage/brands";
import Our_Projects from "./homepage/projects";
import InfoSection from "./homepage/testomonialsbackviews";
import AboutSection from "./homepage/footerabout";
import LatestBlog from "./homepage/latestblogs";
import CentralBanner from "./homepage/centralbanner";
import { Layout } from "antd";
import Service_price from "./homepage/services_price";
import GetQuite from "./homepage/getquite";

export default function Home() {
  return (
    <Layout >
      {/* style={{ overflow: "hidden" }} */}
      <Header />
      <hr />
      <Navbar />

      <Mainswiper />

      <ServicesSliderSection />

      <Service_price />

     <div className="md:mt-20 md:mb-20"> <CentralBanner /></div>

      <Brands />

      <Our_Projects />

      <InfoSection />

      <LatestBlog />

      <GetQuite />

      <AboutSection />

      <FooterSection />
    </Layout>
  );
}
