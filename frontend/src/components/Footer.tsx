
import { Link } from "react-router-dom";
import { Heart, Mail, Linkedin, Instagram, ExternalLink } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-love-800/50 text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-love-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-love-400 to-purple-400 text-transparent bg-clip-text">
                AmorAI
              </span>
            </div>
            <p className="text-sm text-foreground/70 max-w-xs">
              Turning your love stories into beautiful songs with the power of AI. Share your journey, and let us create a melody that captures your unique romance.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-love-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-love-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://producthunt.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-love-400 transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <SignedOut>
                <li>
                  <Link to="/" className="text-sm text-foreground/70 hover:text-love-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-foreground/70 hover:text-love-400 transition-colors">
                    About Us
                  </Link>
                </li>
              </SignedOut>
              <li>
                <Link to="/pricing" className="text-sm text-foreground/70 hover:text-love-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/story" className="text-sm text-foreground/70 hover:text-love-400 transition-colors">
                  Create a Song
                </Link>
              </li>
            </ul>
          </div>

          {/* Support and Contact combined */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faqs" className="text-sm text-foreground/70 hover:text-love-400 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-foreground/70 hover:text-love-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-foreground/70 hover:text-love-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-foreground/70 hover:text-love-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li className="pt-3">
                <p className="text-sm text-foreground/70 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:contact@amorai.com" className="hover:text-love-400 transition-colors">
                    contact@amorai.com
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-love-800/30 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-foreground/60">
              © {currentYear} AmorAI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-foreground/60 hover:text-love-400 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-foreground/60 hover:text-love-400 transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-sm text-foreground/60 hover:text-love-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
