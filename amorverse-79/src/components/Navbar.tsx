
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import NavbarLogo from "./NavbarLogo";
import NavbarDesktopLinks from "./NavbarDesktopLinks";
import NavbarActions from "./NavbarActions";
import NavbarMobileMenu from "./NavbarMobileMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isSignedIn } = useAuth();
  
  // Custom function to open sign in that doesn't depend on useClerk directly
  const handleSignIn = () => {
    window.location.href = "/sign-in";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/70 backdrop-blur-md border-b border-love-800/30 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavbarLogo onClick={closeMobileMenu} />

          {/* Desktop Navigation */}
          <NavbarDesktopLinks />

          {/* Actions */}
          <NavbarActions handleSignIn={handleSignIn} />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <NavbarMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        handleSignIn={handleSignIn}
      />
    </header>
  );
};

export default Navbar;
