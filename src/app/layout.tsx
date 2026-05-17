import type { Metadata } from "next";
import { Inter, Crimson_Pro } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chatriya Nadar Matriculation Higher Secondary School | Kamuthi, Tamil Nadu",
  description:
    "Chatriya Nadar Matriculation Higher Secondary School is a premier English medium institution in Kamuthi, Tamil Nadu offering classes from Pre-KG to 12th Standard with excellent academics, facilities, and holistic development.",
  keywords:
    "school, matriculation, higher secondary, Kamuthi, Tamil Nadu, education, English medium, Pre-KG, primary, middle, high school",
  authors: [{ name: "Chatriya Nadar Matriculation Higher Secondary School" }],
  openGraph: {
    title: "Chatriya Nadar Matriculation Higher Secondary School",
    description:
      "Premier English medium school in Kamuthi, Tamil Nadu. Classes Pre-KG to 12th Standard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${crimsonPro.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
