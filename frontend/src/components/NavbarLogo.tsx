
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface NavbarLogoProps {
  onClick?: () => void;
}

const NavbarLogo = ({ onClick }: NavbarLogoProps) => {
  return (
    <Link 
      to="/" 
      className="flex items-center space-x-2"
      onClick={onClick}
    >
      <motion.div 
        className="flex items-center"
        whileHover={{ scale: 1.05 }}
      >
        <Heart className="h-6 w-6 text-love-500 animate-pulse-heart" />
        <span className="ml-2 text-xl font-bold bg-gradient-to-r from-love-400 to-purple-400 text-transparent bg-clip-text">
          AmorAI
        </span>
      </motion.div>
    </Link>
  );
};

export default NavbarLogo;
