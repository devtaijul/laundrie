"use client";

import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import Image from "next/image";
import { useSession } from "next-auth/react";

const navLinks = [
  { href: "/services", label: "Our Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
];

export const Header = () => {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = usePathname();
  const isHomePage = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const showTransparent = isHomePage && !isScrolled;
  const textColor = showTransparent ? "text-white" : "text-foreground";
  const logoFilter = showTransparent ? "brightness-0 invert" : "";

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${
          showTransparent
            ? "bg-transparent"
            : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href={PAGES.HOME} className="flex items-center space-x-2">
              <Image
                src="/assets/laundrie-logo.png"
                alt="Laundrie"
                className={`h-8 transition-all duration-300 ${logoFilter}`}
                width={130}
                height={30}
              />
            </Link>

            {/* Desktop Navigation */}
            {/* <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors text-sm font-medium hover:opacity-80 ${textColor}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav> */}

            <div className="flex items-center space-x-4">
              {/* Sign In */}
              {status === "loading" ? (
                <span className="text-sm font-medium">Loading...</span>
              ) : status === "authenticated" ? (
                <Link
                  href={PAGES.ACCOUNT.ROOT}
                  className={`transition-colors text-sm font-medium hover:opacity-80 ${textColor}`}
                >
                  Signed in as {session?.user?.name}
                </Link>
              ) : (
                <Link href={PAGES.LOGIN} className="hidden md:block">
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium ${textColor} hover:bg-white/10`}
                  >
                    Sign In
                  </Button>
                </Link>
              )}

              {/* Desktop Button */}
              <Link href={PAGES.LAUNDRIE} className="hidden md:block">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full transition-all duration-300">
                  Schedule a Pickup
                </Button>
              </Link>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`md:hidden p-2 rounded-lg transition-colors ${textColor} hover:bg-white/10`}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-background transition-all duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`relative h-full flex flex-col transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-border">
            <Link
              href={PAGES.HOME}
              onClick={handleLinkClick}
              className="flex items-center space-x-2"
            >
              <Image
                src="/assets/laundrie-logo.png"
                alt="Laundrie"
                className="h-8"
                width={150}
                height={30}
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col items-center justify-center space-y-8 px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-3xl font-semibold text-foreground hover:text-primary transition-colors transform hover:scale-105 duration-300"
              >
                {link.label}
              </Link>
            ))}
            {status === "loading" ? (
              <span className="text-3xl font-semibold text-foreground">
                Loading...
              </span>
            ) : status === "authenticated" ? (
              <span className="text-3xl font-semibold text-foreground">
                Signed in as {session?.user?.name}
              </span>
            ) : (
              <Link
                href={PAGES.LOGIN}
                onClick={handleLinkClick}
                className="text-3xl font-semibold text-foreground hover:text-primary transition-colors transform hover:scale-105 duration-300"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* CTA Button */}
          <div className="p-8">
            <Link
              href={PAGES.LAUNDRIE}
              onClick={handleLinkClick}
              className="block"
            >
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-full text-lg font-semibold transition-all duration-300">
                Schedule a Pickup
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
