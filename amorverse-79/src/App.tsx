import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { 
  SignIn, 
  SignUp,  
  SignedIn, 
  SignedOut, 
  RedirectToSignIn,
  useAuth
} from "@clerk/clerk-react";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import StoryInput from "./pages/StoryInput";
import SongGenerator from "./pages/SongGenerator";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import SharedSong from "./pages/SharedSong";
import MySongs from "./pages/MySongs";
import LyricsPage from "./pages/LyricsPage";
import { useEffect } from "react";
import { CreditsProvider } from "./contexts/CreditsContext";
import PaymentLoading from "./pages/PaymentLoading";

const queryClient = new QueryClient();

// ScrollToTop component to ensure pages start from the top
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// HomeRedirect component to redirect to story page when signed in
const HomeRedirect = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/story" replace />;
  }

  return <Layout><Home /></Layout>;
};

// AboutRedirect component to redirect to story page when signed in
const AboutRedirect = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/story" replace />;
  }

  return <Layout><About /></Layout>;
};

// SignInRedirect to send users to story page after sign in
const SignInRedirect = () => {  
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
      <div className="w-full max-w-md mx-auto px-4">
        <SignIn routing="path" path="/sign-in" redirectUrl="/story" />
      </div>
    </div>
  );
};

// AnimatedRoutes component to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/about" element={<AboutRedirect />} />
        <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
        <Route path="/shared-song" element={<SharedSong />} />
        <Route path="/shared-song/:songId" element={<SharedSong />} />
        <Route path="/payment-loading" element={<Layout><PaymentLoading /></Layout>} />
        
        {/* Sign in/up pages with centered content */}
        <Route path="/sign-in/*" element={<SignInRedirect />} />
        <Route path="/sign-up/*" element={
          <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
            <div className="w-full max-w-md mx-auto px-4">
              <SignUp routing="path" path="/sign-up" redirectUrl="/story" />
            </div>
          </div>
        } />

        {/* Footer pages */}
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
        <Route path="/faqs" element={<Layout><FAQs /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Layout><Dashboard /></Layout>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/songs"
          element={
            <>
              <SignedIn>
                <Layout><MySongs /></Layout>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/song/:songId"
          element={
            <>
              <SignedIn>
                <Layout><LyricsPage /></Layout>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/story"
          element={
            <>
              <SignedIn>
                <Layout><StoryInput /></Layout>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/generator"
          element={
            <>
              <SignedIn>
                <Layout><SongGenerator /></Layout>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        
        {/* Catch all */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CreditsProvider>
            <ScrollToTop />
            <AnimatedRoutes />
          </CreditsProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
