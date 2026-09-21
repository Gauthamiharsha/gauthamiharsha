import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MeetGauthami from "@/components/MeetGauthami";
import SelectedLooks from "@/components/SelectedLooks";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Hero />
        <MeetGauthami />
        <SelectedLooks />
         <FinalCTA />
      </main>

      <Footer />
    </>
  );
}