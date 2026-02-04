import { PAGES } from "@/config/pages.config";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className=" text-white  pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-primary py-16 rounded-xl">
        <div className="flex items-center justify-between w-full pb-10">
          <div>
            <Link href={PAGES.HOME}>
              <Image
                src="/assets/laundrie-logo-light.png"
                alt="Logo"
                width={300}
                height={100}
              />
            </Link>
          </div>
          <div className="flex gap-3 mb-4 md:mb-0">
            <Link
              href="#"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-colors"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-colors"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-white/80 text-4xl md:text-5xl font-bold">
              Laundry Tips and Exclusive Offers Await!
            </p>
          </div>

          {/* Menu */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-white/60">
              Menu
            </h4>
            <div className="space-y-2 text-sm">
              <Link
                href={PAGES.HOME}
                className="block text-white/80 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href={PAGES.ABOUT}
                className="block text-white/80 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                href={PAGES.HOME}
                className="block text-white/80 hover:text-white transition-colors"
              >
                Service
              </Link>
              <Link
                href={PAGES.PRICING}
                className="block text-white/80 hover:text-white transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Utility Pages */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-white/60">
              Utility Pages
            </h4>
            <div className="space-y-2 text-sm">
              <Link
                href={PAGES.HOME}
                className="block text-white/80 hover:text-white transition-colors"
              >
                Privacy policy
              </Link>
              <Link
                href={PAGES.HOME}
                className="block text-white/80 hover:text-white transition-colors"
              >
                Terms & conditions
              </Link>
              <Link
                href={PAGES.HOME}
                className="block text-white/80 hover:text-white transition-colors"
              >
                Coming soon
              </Link>
              <Link
                href={PAGES.HOME}
                className="block text-white/80 hover:text-white transition-colors"
              >
                404
              </Link>
            </div>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-white/60">
              Contact us
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="w-4 h-4" />
                <span>+1-307-285-7290</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4" />
                <span>hello@laundry.com</span>
              </div>
              <div className="flex items-start gap-2 text-white/80">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>6391 Elgin St. Celina, Delaware 10299</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-12 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm">Copyright © 2025 Laundry</p>
        </div>
      </div>
    </footer>
  );
};
