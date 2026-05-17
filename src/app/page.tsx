import Navbar from "@/components/public/Navbar";
import AnnouncementsTicker from "@/components/public/AnnouncementsTicker";
import HeroSection from "@/components/public/HeroSection";
import LatestAnnouncements from "@/components/public/LatestAnnouncements";
import AboutSection from "@/components/public/AboutSection";
import AcademicsSection from "@/components/public/AcademicsSection";
import FacilitiesSection from "@/components/public/FacilitiesSection";
import GallerySection from "@/components/public/GallerySection";
import AchievementsSection from "@/components/public/AchievementsSection";
import NoticeBoard from "@/components/public/NoticeBoard";
import AdmissionsSection from "@/components/public/AdmissionsSection";
import ContactSection from "@/components/public/ContactSection";
import MobileStickyCTA from "@/components/public/MobileStickyCTA";
import Footer from "@/components/public/Footer";
import {
  getHeroSection,
  getAboutSection,
  getAcademicLevels,
  getFacilities,
  getGalleryImages,
  getAchievements,
  getAnnouncements,
  getNotices,
  getContactDetails,
} from "@/lib/data";

export default async function HomePage() {
  const [hero, about, academics, facilities, gallery, achievements, announcements, notices, contact] =
    await Promise.all([
      getHeroSection(),
      getAboutSection(),
      getAcademicLevels(),
      getFacilities(),
      getGalleryImages(),
      getAchievements(),
      getAnnouncements(),
      getNotices(),
      getContactDetails(),
    ]);

  return (
    <>
      <Navbar />
      <AnnouncementsTicker data={announcements} />
      <main>
        <HeroSection data={hero} />
        <LatestAnnouncements data={announcements} />
        <AboutSection data={about} />
        <AcademicsSection data={academics} />
        <FacilitiesSection data={facilities} />
        <GallerySection data={gallery} />
        <AchievementsSection data={achievements} />
        <NoticeBoard data={notices} />
        <AdmissionsSection />
        <ContactSection data={contact} />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
