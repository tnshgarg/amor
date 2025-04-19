
import { Link } from "react-router-dom";

interface MobileMenuLinkProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const MobileMenuLink = ({ to, currentPath, children, onClick }: MobileMenuLinkProps) => {
  const isActive = currentPath === to;
  
  return (
    <Link
      to={to}
      className={`block px-4 py-2.5 rounded-md text-base font-medium transition-all duration-200 ${
        isActive
          ? "bg-love-900/40 text-love-400 border-l-2 border-love-400"
          : "hover:bg-love-900/30 hover:text-love-300"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default MobileMenuLink;
