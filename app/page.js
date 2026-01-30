
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroPage from "@/components/HeroPage";
import TopicPage from "@/components/TopicPage";
import Works from "@/components/Works";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroPage/>
      <Features/>
      <Works/>
      <TopicPage/>
      <Footer/>
    </div>
  );
}
