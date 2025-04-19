import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useClerk, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Check, Heart, Star, Music } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { addCredits as addCreditsApi } from "@/services/userService";
import { useCredits } from "@/contexts/CreditsContext";

const Pricing = () => {
  const { openSignUp } = useClerk();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const { setCredits } = useCredits();

  const plans = [
    {
      name: "Starter",
      price: "₹49",
      description: "Perfect for a first-time gift to express your feelings to someone special.",
      highlight: false,
      buttonText: "Choose Starter",
      creditsDisplay: "1 Credit",
      versions: "2 Versions",
      credits: 1,
      amount: 4900, // Amount in paise
    },
    {
      name: "First Crush",
      price: "₹99",
      description: "Celebrate your relationship with multiple songs for different occasions.",
      highlight: true,
      buttonText: "Choose First Crush",
      creditsDisplay: "3 Credits",
      versions: "6 Versions",
      credits: 3,
      amount: 9900, // Amount in paise
    },
    {
      name: "Hopeless Romantic",
      price: "₹149",
      description: "The ultimate expression of love with a collection of songs to cherish forever.",
      highlight: false,
      buttonText: "Choose Romantic",
      creditsDisplay: "5 Credits",
      versions: "10 Versions",
      credits: 5,
      amount: 14900, // Amount in paise
    }
  ];

  const handlePurchase = async (plan: typeof plans[0]) => {
    setIsProcessing(true);
    
    toast({
      title: "Processing your purchase",
      description: "Please wait while we process your payment...",
    });
    
    try {
      const result = await addCreditsApi(plan.name, plan.credits, plan.amount);
      
      if (result) {
        if (result.newCreditBalance !== undefined) {
          setCredits(result.newCreditBalance);
        }
        
        toast({
          title: "Purchase successful!",
          description: `You've added ${plan.credits} credits to your account.`,
        });
        
        navigate("/payment-loading", { 
          state: { 
            success: true,
            plan: plan.name,
            credits: plan.credits
          } 
        });
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment failed",
        description: "Please try again later or contact support.",
        variant: "destructive"
      });
      
      navigate("/payment-loading", { 
        state: { 
          success: false,
          plan: plan.name
        } 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const commonFeatures = [
    "Personalized AI-generated love songs",
    "Multiple unique song versions",
    "Advanced editing options",
    "Share via link and social media",
    "MP3 download",
    "Priority support",
    "Unlimited revisions"
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Simple and Transparent Pricing</h1>
          <p className="text-lg text-foreground/70 mb-2">
            Choose the plan that's right for you and start creating beautiful, personalized love songs.
          </p>
          <p className="text-md text-love-500 font-medium">
            <Music className="inline h-4 w-4 mr-1" /> Each credit gives you 2 unique versions of every song you create!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl overflow-hidden border ${
                plan.highlight
                  ? "border-love-500 relative shadow-lg"
                  : "border-love-200 dark:border-love-800/50"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-love-500 text-white px-3 py-1 rounded-bl-lg font-medium text-sm">
                  Popular
                </div>
              )}
              <div className={`p-6 ${plan.highlight ? "bg-love-50 dark:bg-love-900/20" : ""}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-foreground/70 ml-1">one-time</span>
                </div>
                <p className="text-foreground/80 mb-4">{plan.description}</p>
                <div className="flex flex-col gap-2">
                  <div className="text-sm inline-flex items-center rounded-full bg-love-100 dark:bg-love-900/30 px-3 py-1 font-medium text-love-700 dark:text-love-300">
                    <Heart className="h-3 w-3 mr-1" /> {plan.creditsDisplay}
                  </div>
                  <div className="text-sm inline-flex items-center rounded-full bg-love-100/70 dark:bg-love-900/20 px-3 py-1 font-medium text-love-700 dark:text-love-300">
                    <Music className="h-3 w-3 mr-1" /> {plan.versions}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-love-100 dark:border-love-800/50 bg-card">
                <SignedOut>
                  <Button
                    className={`w-full ${
                      plan.highlight ? "love-button" : "border-love-300 hover:border-love-500 hover:text-love-500"
                    }`}
                    variant={plan.highlight ? "default" : "outline"}
                    onClick={() => openSignUp()}
                  >
                    {plan.buttonText}
                  </Button>
                </SignedOut>
                <SignedIn>
                  <Button
                    className={`w-full ${
                      plan.highlight ? "love-button" : "border-love-300 hover:border-love-500 hover:text-love-500"
                    }`}
                    variant={plan.highlight ? "default" : "outline"}
                    onClick={() => handlePurchase(plan)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : plan.buttonText}
                  </Button>
                </SignedIn>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6">All Plans Include</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {commonFeatures.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-5 w-5 text-love-500 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-love-100 dark:border-love-800/50">
              <h3 className="font-semibold mb-2">How do credits work?</h3>
              <p className="text-foreground/80">
                Each credit allows you to generate one complete love song with two unique versions. Once you've used your credits, you can purchase a new plan to get more credits.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-love-100 dark:border-love-800/50">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-foreground/80">
                We accept all major credit cards, PayPal, and select regional payment methods. All transactions are secure and encrypted.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-love-100 dark:border-love-800/50">
              <h3 className="font-semibold mb-2">Can I upgrade my plan later?</h3>
              <p className="text-foreground/80">
                Yes! You can upgrade your plan at any time. When you upgrade, you'll receive the additional credits from your new plan.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-love-100 dark:border-love-800/50">
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-foreground/80">
                If you're not satisfied with your song, please contact our support team within 14 days of purchase. We'll work with you to revise your song or provide a refund if necessary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
