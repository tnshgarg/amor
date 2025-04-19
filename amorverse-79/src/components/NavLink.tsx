
import { Link } from "react-router-dom";

interface NavLinkProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavLink = ({ to, currentPath, children, onClick, className = "" }: NavLinkProps) => {
  const isActive = currentPath === to;
  
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-love-400 relative group ${
        isActive
          ? "text-love-400"
          : "text-foreground/80"
      } ${className}`}
      onClick={onClick}
    >
      {children}
      <span 
        className={`absolute -bottom-1 left-0 w-full h-0.5 bg-love-400 transform origin-left transition-transform duration-300 ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`} 
      />
    </Link>
  );
};

export default NavLink;
