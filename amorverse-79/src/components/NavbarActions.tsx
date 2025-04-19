
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import CreditsDisplay from "./CreditsDisplay";
import { useCredits } from "@/contexts/CreditsContext";

interface NavbarActionsProps {
  handleSignIn: () => void;
}

const NavbarActions = ({ handleSignIn }: NavbarActionsProps) => {
  const { credits } = useCredits();
  
  return (
    <div className="hidden md:flex items-center space-x-4">
      <SignedIn>
        <CreditsDisplay credits={credits} maxCredits={12} />
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox: "h-8 w-8"
            }
          }}
        />
      </SignedIn>
      <SignedOut>
        <Button 
          variant="outline" 
          size="sm"
          className="border-love-700/50 hover:border-love-600 hover:text-love-400"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Link to="/sign-up">
          <Button 
            size="sm"
            className="love-button"
          >
            Get Started
          </Button>
        </Link>
      </SignedOut>
    </div>
  );
};

export default NavbarActions;
