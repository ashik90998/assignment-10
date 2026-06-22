import Banner from "@/components/home/BannerSlider";
import ContactUs from "@/components/home/ContactUs";
import FeaturedSection from "@/components/home/FeaturedSection";
import SavedLivesSection from "@/components/home/SavedLifeSection";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedSection />
      <ContactUs />
      <SavedLivesSection />
    </div>
  );
}
