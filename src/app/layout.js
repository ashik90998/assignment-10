const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { Providers } from "./providers";
import Footer from "@/components/common/Footer";


const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800", "900"]
});

export const metadata = {
  title: "SaveBlood",
  description: "Blood Donation Application",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${robotoSlab.className} h-full antialiased`}
      suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white text-slate-900 dark:bg-[#061325] dark:text-white transition-colors duration-300">
        <Providers>
          <Navbar />
          <main >
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}