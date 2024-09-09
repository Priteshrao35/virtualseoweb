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

      <CentralBanner />

      <Brands />

      <Our_Projects />

      <InfoSection />

      <LatestBlog />

      <AboutSection />

      <FooterSection />
    </Layout>
  );
}
