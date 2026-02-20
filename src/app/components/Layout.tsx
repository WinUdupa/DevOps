import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import imgUntitledDesign81 from "@/assets/2b44a7372f60ed89c1fcfbd8d85884b03690fbe4.png";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Home", page: "home" },
    { label: "Registration", page: "registration" },
    { label: "Committee", page: "committees" },
    { label: "Speakers", page: "speakers" },
    { label: "Venue", page: "venue" },
    { label: "Contact", page: "contact" }
  ];

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const isActivePage = (item: typeof navItems[0]) => {
    return currentPage === item.page;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">
      {/* Top Bar - Like HRIC 2026
      <div className="bg-[#0B1F3A] text-white py-2 px-4 hidden sm:block">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="mailto:conference@bnmit.ac.in" className="flex items-center gap-2 hover:text-[#F97316] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              bnmitconference@bnmit.in
            </a>
            <span className="text-white/50">|</span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              April 16-17, 2026
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com/bnmit_official" target="_blank" rel="noopener noreferrer" className="hover:text-[#F97316] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="https://www.linkedin.com/school/bnmit/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F97316] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.instagram.com/bnmit_official/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F97316] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.youtube.com/@bnmit" target="_blank" rel="noopener noreferrer" className="hover:text-[#F97316] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div> */}

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick("home")} 
              className="flex items-center gap-3 lg:gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4ED8] rounded-lg"
            >
              <img src={imgUntitledDesign81} alt="BNMIT" className="h-12 sm:h-14 lg:h-16 xl:h-20 w-auto" />
            </button>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3 xl:px-4 py-2 font-['Open_Sans',sans-serif] text-[14px] xl:text-[15px] font-medium transition-all duration-200 rounded-md hover:bg-[#F1F5F9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4ED8] ${
                    isActivePage(item) 
                      ? "text-[#1E4ED8] bg-[#EFF6FF]" 
                      : "text-[#334155] hover:text-[#1E4ED8]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#F1F5F9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4ED8] transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <motion.div
                animate={mobileMenuOpen ? "open" : "closed"}
                className="w-6 h-5 flex flex-col justify-between"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                  className="w-full h-0.5 bg-[#0B1F3A] rounded-full origin-left transition-all"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="w-full h-0.5 bg-[#0B1F3A] rounded-full transition-all"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                  className="w-full h-0.5 bg-[#0B1F3A] rounded-full origin-left transition-all"
                />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 lg:hidden z-40"
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu Panel */}
              <motion.nav
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl lg:hidden z-50 overflow-y-auto"
              >
                <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between">
                  <span className="font-semibold text-[#0B1F3A]">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors"
                    aria-label="Close menu"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="py-4">
                  {navItems.map((item) => (
                    <div key={item.page} className="border-b border-[#F1F5F9] last:border-b-0">
                      <button
                        onClick={() => handleNavClick(item.page)}
                        className={`block w-full text-left px-6 py-4 text-[15px] font-medium transition-colors ${
                          currentPage === item.page 
                            ? "text-[#1E4ED8] bg-[#EFF6FF]" 
                            : "text-[#334155] hover:bg-[#F8FAFC]"
                        }`}
                      >
                        {item.label}
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Mobile Menu CTA */}
                <div className="p-6 border-t border-[#E2E8F0]">
                  <button
                    onClick={() => handleNavClick("registration")}
                    className="w-full bg-gradient-to-r from-[#1E4ED8] to-[#0B1F3A] text-white py-3 px-6 rounded-lg font-semibold text-[15px] hover:shadow-lg transition-shadow"
                  >
                    Register Now
                  </button>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer - Academic Conference Style */}
      <footer className="bg-[#0B1F3A] text-white">
        {/* Main Footer Content */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Institution Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img src={imgUntitledDesign81} alt="BNMIT" className="h-16 w-auto brightness-0 invert" />
              </div>
              <h3 className="text-lg font-semibold mb-2">BNM Institute of Technology</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Department of Business Administration<br />
                Banashankari II Stage<br />
                Bangalore - 560070, Karnataka, India
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base font-semibold mb-4 text-white border-b border-[#F97316] pb-2 inline-block">Quick Links</h4>
              <ul className="space-y-2 mt-2">
                {[
                  { label: "Home", page: "home" },
                  { label: "About Conference", page: "about-conference" },
                  { label: "Call for Papers", page: "call-for-papers" },
                  { label: "Tracks", page: "tracks" },
                  { label: "Registration", page: "registration" },
                  { label: "Schedule", page: "schedule" }
                ].map((link) => (
                  <li key={link.page}>
                    <button 
                      onClick={() => handleNavClick(link.page)} 
                      className="text-sm text-gray-400 hover:text-[#F97316] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-base font-semibold mb-4 text-white border-b border-[#F97316] pb-2 inline-block">Contact Us</h4>
              <ul className="space-y-3 text-sm mt-2">
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:bnmitconference@bnmit.in" className="text-gray-400 hover:text-[#F97316] transition-colors">
                    bnmitconference@bnmit.in
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+918012345678" className="text-gray-400 hover:text-[#F97316] transition-colors">
                    +91 80 1234 5678
                  </a>
                </li>
              </ul>
              {/* Social Links
              <div className="flex items-center gap-3 mt-6">
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F97316] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F97316] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F97316] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div> */}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700/50 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
              <p className="text-gray-500 text-center sm:text-left">
                &copy; 2026 BNM Institute of Technology. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-gray-500">
                <button onClick={() => handleNavClick("contact")} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
                <span>|</span>
                <button onClick={() => handleNavClick("contact")} className="hover:text-white transition-colors">
                  Terms of Use
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}