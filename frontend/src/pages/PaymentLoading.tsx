
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCredits } from '@/contexts/CreditsContext';
import { toast } from '@/hooks/use-toast';

const PaymentLoading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addCredits } = useCredits();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const planCredits = parseInt(searchParams.get('credits') || '0');
    const planName = searchParams.get('plan') || 'Plan';
    
    // Simulate payment processing
    const timer = setTimeout(() => {
      if (planCredits > 0) {
        // Add credits to user account
        addCredits(planCredits);
        
        // Show success toast
        toast({
          title: "Payment Successful!",
          description: `${planCredits} credits have been added to your account.`,
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Show error for invalid credits
        toast({
          title: "Payment Failed",
          description: "An error occurred during payment processing.",
          variant: "destructive"
        });
        navigate('/pricing');
      }
    }, 3000); // 3 second simulation
    
    return () => clearTimeout(timer);
  }, [location, addCredits, navigate]);
  
  return (
    <div className="pt-20 pb-10 min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="w-24 h-24 rounded-full bg-gradient-to-r from-love-300 to-purple-400 mx-auto mb-8 flex items-center justify-center"
        >
          <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-love-300 to-purple-400 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center">
                <motion.div 
                  className="w-8 h-8 text-love-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <h1 className="text-2xl font-bold mb-2">Processing Payment</h1>
        <p className="text-muted-foreground">Please wait while we process your payment...</p>
      </div>
    </div>
  );
};

export default PaymentLoading;
