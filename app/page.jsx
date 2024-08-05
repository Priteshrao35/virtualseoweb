import Image from "next/image";
import Navbar from "./components/homepage/navbar";
import Header from "./components/homepage/header";
import Mainswiper from "./components/homepage/mainswiper";
import ServicesSliderSection from "./components/homepage/servicesslider";
import FooterSection from "./components/homepage/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <hr/>
      <Navbar />

      <Mainswiper />

      <ServicesSliderSection />

      <FooterSection />
    </div>
  );
}
