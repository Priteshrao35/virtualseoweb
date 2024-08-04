import Image from "next/image";
import Navbar from "./components/homepage/navbar";
import Header from "./components/homepage/header";
import Mainswiper from "./components/homepage/mainswiper";

export default function Home() {
  return (
    <div>
      <Header />
      <hr/>
      <Navbar />

      <Mainswiper />
    </div>
  );
}
