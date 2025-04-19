
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Heart, Home } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-love-900/5 pt-16">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 mb-6 mx-auto relative"
        >
          <div className="absolute inset-0 bg-love-100 dark:bg-love-900/20 rounded-full animate-ping opacity-75"></div>
          <div className="relative flex items-center justify-center w-full h-full bg-love-50 dark:bg-love-900/30 rounded-full">
            <Heart className="h-12 w-12 text-love-500" />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-6xl font-bold mb-4 bg-gradient-to-r from-love-500 to-purple-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.h1>
        
        <motion.p 
          className="text-2xl text-foreground mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Oops! We couldn't find this page
        </motion.p>
        
        <motion.p 
          className="text-foreground/70 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          It seems the love song you're looking for doesn't exist. But don't worry, there are plenty more melodies waiting to be created.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button className="love-button" asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Return to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
