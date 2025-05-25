import Mainswiper from "./homepage/mainswiper";
import ServicesSliderSection from "./homepage/servicesslider";
import Brands from "./homepage/brands";
import Our_Projects from "./homepage/projects";
import LatestBlog from "./homepage/latestblogs";
import { Layout } from "antd";
import Service_price from "./homepage/services_price";
import OurTeam from "./homepage/ourteam";
import GetSalesSection from "./homepage/getselessection";
import FreeSEOAuditPage from "./homepage/auditreport";
import Creativity from "./homepage/creativity";
import Whychose from "./homepage/whychose";
import Testimonials from "./homepage/testomonials";

export default function Home() {
  return (
    <Layout>

      <Mainswiper />

      <Whychose />

      <ServicesSliderSection />

      <GetSalesSection />

      <Service_price />

      <FreeSEOAuditPage />

      <Creativity />

      <Our_Projects />

      <Testimonials />

      <OurTeam />

      <LatestBlog />

      <Brands />

    </Layout>
  );
}
