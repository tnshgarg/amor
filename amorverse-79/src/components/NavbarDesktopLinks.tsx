
import { useLocation } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import NavLink from "./NavLink";

const NavbarDesktopLinks = () => {
  const location = useLocation();
  
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

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <SignedOut>
        {publicNavLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            currentPath={location.pathname}
          >
            {link.title}
          </NavLink>
        ))}
      </SignedOut>
      
      <SignedIn>
        {authenticatedLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            currentPath={location.pathname}
          >
            {link.title}
          </NavLink>
        ))}
      </SignedIn>
    </nav>
  );
};

export default NavbarDesktopLinks;
