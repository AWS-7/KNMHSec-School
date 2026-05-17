import Navbar from "@/components/public/Navbar";
import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import AcademicsSection from "@/components/public/AcademicsSection";
import FacilitiesSection from "@/components/public/FacilitiesSection";
import GallerySection from "@/components/public/GallerySection";
import AchievementsSection from "@/components/public/AchievementsSection";
import AdmissionsSection from "@/components/public/AdmissionsSection";
import ContactSection from "@/components/public/ContactSection";
import Footer from "@/components/public/Footer";
import {
  getHeroSection,
  getAboutSection,
  getAcademicLevels,
  getFacilities,
  getGalleryImages,
  getAchievements,
  getContactDetails,
} from "@/lib/data";

export default async function HomePage() {
  const [hero, about, academics, facilities, gallery, achievements, contact] =
    await Promise.all([
      getHeroSection(),
      getAboutSection(),
      getAcademicLevels(),
      getFacilities(),
      getGalleryImages(),
      getAchievements(),
      getContactDetails(),
    ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection data={hero} />
        <AboutSection data={about} />
        <AcademicsSection data={academics} />
        <FacilitiesSection data={facilities} />
        <GallerySection data={gallery} />
        <AchievementsSection data={achievements} />
        <AdmissionsSection />
        <ContactSection data={contact} />
      </main>
      <Footer />
    </>
  );
}
