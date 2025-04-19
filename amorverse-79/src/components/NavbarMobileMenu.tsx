
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import MobileMenuLink from "./MobileMenuLink";
import CreditsDisplay from "./CreditsDisplay";
import { useCredits } from "@/contexts/CreditsContext";

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  handleSignIn: () => void;
}

const NavbarMobileMenu = ({ 
  isOpen, 
  onClose, 
  handleSignIn 
}: NavbarMobileMenuProps) => {
  const location = useLocation();
  const { credits } = useCredits();
  
  // Public navigation links
  const publicNavLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Pricing", path: "/pricing" },
  ];

  // Authenticated navigation links
  const authenticatedLinks = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "My Songs", path: "/songs" },
    { title: "Create Song", path: "/story" },
    { title: "Pricing", path: "/pricing" },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      className="md:hidden bg-card/95 backdrop-blur-sm shadow-lg border-b border-love-800/30"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <SignedOut>
          {publicNavLinks.map((link) => (
            <MobileMenuLink
              key={link.path}
              to={link.path}
              currentPath={location.pathname}
              onClick={onClose}
            >
              {link.title}
            </MobileMenuLink>
          ))}
        </SignedOut>
        
        <SignedIn>
          {authenticatedLinks.map((link) => (
            <MobileMenuLink
              key={link.path}
              to={link.path}
              currentPath={location.pathname}
              onClick={onClose}
            >
              {link.title}
            </MobileMenuLink>
          ))}
        </SignedIn>
        
        <div className="pt-4 pb-3 border-t border-love-800/30">
          <SignedIn>
            <div className="flex items-center px-3 mb-3">
              <CreditsDisplay credits={credits} maxCredits={12} />
            </div>
            <div className="flex items-center px-3">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-10 w-10"
                  }
                }}
              />
              <span className="ml-3 text-sm text-foreground/70">Manage Account</span>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="mt-3 px-3 space-y-2">
              <Button 
                variant="outline" 
                className="w-full border-love-700/50 hover:border-love-600 hover:text-love-400"
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Link to="/sign-up" onClick={onClose}>
                <Button 
                  className="w-full love-button"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </SignedOut>
        </div>
      </div>
    </motion.div>
  );
};

export default NavbarMobileMenu;
